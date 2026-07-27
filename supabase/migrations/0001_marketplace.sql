-- Obrador Etapa 1 — Esquema del marketplace de oficios + RLS.
-- Correr UNA VEZ en Supabase → SQL Editor (proyecto qwxaildshbusqqiugnjf).
-- Idioma de datos: español. profiles.id = auth.users.id.
-- Etapa 1 usa profiles / trabajadores / trabajador_oficios; el resto queda creado para las etapas siguientes.

-- ─────────────────────────────────────────────────────────────
-- 1) TABLAS
-- ─────────────────────────────────────────────────────────────

create table if not exists public.profiles (
  id          uuid primary key references auth.users (id) on delete cascade,
  nombre      text not null default '',
  avatar_url  text,
  telefono    text,
  whatsapp    text,
  zona        text,
  lat         double precision,
  lng         double precision,
  es_trabajador boolean not null default false,
  creado_at   timestamptz not null default now()
);

create table if not exists public.trabajadores (
  profile_id  uuid primary key references public.profiles (id) on delete cascade,
  descripcion text,
  verificado  boolean not null default false,
  puntos      integer not null default 0,
  activo      boolean not null default true,
  creado_at   timestamptz not null default now()
);

create table if not exists public.trabajador_oficios (
  id            uuid primary key default gen_random_uuid(),
  trabajador_id uuid not null references public.trabajadores (profile_id) on delete cascade,
  oficio        text not null,
  zona          text,
  radio_km      integer default 10
);
create index if not exists idx_ofi_trab on public.trabajador_oficios (trabajador_id);
create index if not exists idx_ofi_oficio on public.trabajador_oficios (oficio);

create table if not exists public.pedidos (
  id          uuid primary key default gen_random_uuid(),
  cliente_id  uuid not null references public.profiles (id) on delete cascade,
  oficio      text not null,
  descripcion text not null,
  zona        text,
  lat         double precision,
  lng         double precision,
  estado      text not null default 'abierto'
              check (estado in ('abierto','asignado','completado','cancelado')),
  asignado_a  uuid references public.profiles (id) on delete set null,
  creado_at   timestamptz not null default now()
);
create index if not exists idx_ped_estado on public.pedidos (estado);
create index if not exists idx_ped_oficio on public.pedidos (oficio);
create index if not exists idx_ped_cliente on public.pedidos (cliente_id);

create table if not exists public.postulaciones (
  id            uuid primary key default gen_random_uuid(),
  pedido_id     uuid not null references public.pedidos (id) on delete cascade,
  trabajador_id uuid not null references public.profiles (id) on delete cascade,
  mensaje       text,
  estado        text not null default 'postulado'
                check (estado in ('postulado','elegido','rechazado')),
  creado_at     timestamptz not null default now(),
  unique (pedido_id, trabajador_id)
);
create index if not exists idx_post_pedido on public.postulaciones (pedido_id);
create index if not exists idx_post_trab on public.postulaciones (trabajador_id);

create table if not exists public.reviews (
  id             uuid primary key default gen_random_uuid(),
  autor_id       uuid not null references public.profiles (id) on delete cascade,
  destinatario_id uuid not null references public.profiles (id) on delete cascade,
  pedido_id      uuid references public.pedidos (id) on delete set null,
  estrellas      integer not null check (estrellas between 1 and 5),
  comentario     text,
  creado_at      timestamptz not null default now(),
  unique (pedido_id, autor_id)
);
create index if not exists idx_rev_dest on public.reviews (destinatario_id);

create table if not exists public.reportes (
  id          uuid primary key default gen_random_uuid(),
  reporter_id uuid not null references public.profiles (id) on delete cascade,
  tipo        text not null check (tipo in ('usuario','pedido','review')),
  target_id   uuid not null,
  motivo      text,
  creado_at   timestamptz not null default now()
);

create table if not exists public.bloqueos (
  id            uuid primary key default gen_random_uuid(),
  bloqueador_id uuid not null references public.profiles (id) on delete cascade,
  bloqueado_id  uuid not null references public.profiles (id) on delete cascade,
  creado_at     timestamptz not null default now(),
  unique (bloqueador_id, bloqueado_id)
);

-- ─────────────────────────────────────────────────────────────
-- 2) Trigger: crear profile al registrarse
-- ─────────────────────────────────────────────────────────────
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, nombre, avatar_url)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'name', new.raw_user_meta_data->>'full_name', ''),
    new.raw_user_meta_data->>'avatar_url'
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ─────────────────────────────────────────────────────────────
-- 3) RLS
-- ─────────────────────────────────────────────────────────────
alter table public.profiles           enable row level security;
alter table public.trabajadores        enable row level security;
alter table public.trabajador_oficios  enable row level security;
alter table public.pedidos             enable row level security;
alter table public.postulaciones       enable row level security;
alter table public.reviews             enable row level security;
alter table public.reportes            enable row level security;
alter table public.bloqueos            enable row level security;

-- profiles: lectura pública (directorio); escritura solo del dueño
create policy profiles_select on public.profiles for select using (true);
create policy profiles_upsert on public.profiles for insert with check (auth.uid() = id);
create policy profiles_update on public.profiles for update using (auth.uid() = id) with check (auth.uid() = id);

-- trabajadores: lectura pública; escritura del dueño
create policy trab_select on public.trabajadores for select using (true);
create policy trab_ins on public.trabajadores for insert with check (auth.uid() = profile_id);
create policy trab_upd on public.trabajadores for update using (auth.uid() = profile_id) with check (auth.uid() = profile_id);
create policy trab_del on public.trabajadores for delete using (auth.uid() = profile_id);

-- trabajador_oficios: lectura pública; escritura del dueño del perfil
create policy ofi_select on public.trabajador_oficios for select using (true);
create policy ofi_ins on public.trabajador_oficios for insert with check (auth.uid() = trabajador_id);
create policy ofi_upd on public.trabajador_oficios for update using (auth.uid() = trabajador_id);
create policy ofi_del on public.trabajador_oficios for delete using (auth.uid() = trabajador_id);

-- pedidos: ve el abierto quien esté logueado, y el propio cliente / asignado; escribe el cliente
create policy ped_select on public.pedidos for select
  using (estado = 'abierto' or cliente_id = auth.uid() or asignado_a = auth.uid());
create policy ped_ins on public.pedidos for insert with check (auth.uid() = cliente_id);
create policy ped_upd on public.pedidos for update using (auth.uid() = cliente_id) with check (auth.uid() = cliente_id);

-- postulaciones: la ve el trabajador que la hizo y el cliente del pedido; la crea el trabajador
create policy post_select on public.postulaciones for select
  using (trabajador_id = auth.uid()
         or exists (select 1 from public.pedidos p where p.id = pedido_id and p.cliente_id = auth.uid()));
create policy post_ins on public.postulaciones for insert with check (auth.uid() = trabajador_id);
create policy post_upd on public.postulaciones for update
  using (trabajador_id = auth.uid()
         or exists (select 1 from public.pedidos p where p.id = pedido_id and p.cliente_id = auth.uid()));

-- reviews: lectura pública; escribe el autor
create policy rev_select on public.reviews for select using (true);
create policy rev_ins on public.reviews for insert with check (auth.uid() = autor_id);

-- reportes: cada uno crea los suyos y ve los suyos
create policy rep_ins on public.reportes for insert with check (auth.uid() = reporter_id);
create policy rep_select on public.reportes for select using (auth.uid() = reporter_id);

-- bloqueos: cada uno maneja los suyos
create policy blo_all on public.bloqueos for all
  using (auth.uid() = bloqueador_id) with check (auth.uid() = bloqueador_id);
