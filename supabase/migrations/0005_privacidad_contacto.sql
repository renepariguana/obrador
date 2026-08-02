-- 0005_privacidad_contacto.sql
-- PRIVACIDAD (nivel máximo):
--  1) telefono/whatsapp salen de `profiles` (lectura pública) → tabla privada + función controlada.
--  2) el directorio/perfiles/pedidos exigen estar logueado (se corta el scraping con la anon key).
--  3) las columnas lat/lng de profiles (muertas) se eliminan.

-- ── 1) Datos de contacto privados ─────────────────────────────
create table if not exists public.profiles_privados (
  profile_id uuid primary key references public.profiles (id) on delete cascade,
  telefono   text,
  whatsapp   text
);
alter table public.profiles_privados enable row level security;
-- Cada uno solo ve/edita SU propio contacto. Los demás lo obtienen por la función contacto_de().
create policy pp_select on public.profiles_privados for select using (profile_id = auth.uid());
create policy pp_insert on public.profiles_privados for insert with check (profile_id = auth.uid());
create policy pp_update on public.profiles_privados for update using (profile_id = auth.uid()) with check (profile_id = auth.uid());

-- Migrar lo que ya estaba en profiles.
insert into public.profiles_privados (profile_id, telefono, whatsapp)
select id, telefono, whatsapp from public.profiles
on conflict (profile_id) do nothing;

-- ── 2) Función contacto_de(): devuelve el teléfono solo con login + relación ──
--  - Profesional del directorio: contactable por cualquier usuario logueado (es su publicidad).
--  - Cliente: solo por un profesional con relación de pedido (postulado/asignado en ambos sentidos).
create or replace function public.contacto_de(otro uuid)
returns table (telefono text, whatsapp text)
language plpgsql
security definer
set search_path = public
as $$
begin
  if auth.uid() is null then
    return;
  end if;
  if exists (select 1 from profiles pr where pr.id = otro and pr.es_trabajador)
     or exists (
       select 1
       from pedidos p
       join postulaciones po on po.pedido_id = p.id
       where (p.cliente_id = otro     and po.trabajador_id = auth.uid())
          or (p.cliente_id = auth.uid() and po.trabajador_id = otro)
     )
  then
    return query
      select pp.telefono, pp.whatsapp
      from profiles_privados pp
      where pp.profile_id = otro;
  end if;
end;
$$;
grant execute on function public.contacto_de(uuid) to authenticated;

-- ── 3) Sacar de profiles las columnas sensibles (ya migradas / muertas) ──
alter table public.profiles drop column if exists telefono;
alter table public.profiles drop column if exists whatsapp;
alter table public.profiles drop column if exists lat;
alter table public.profiles drop column if exists lng;

-- ── 4) Exigir login para leer el directorio (antes era público con la anon key) ──
drop policy if exists profiles_select on public.profiles;
create policy profiles_select on public.profiles for select using (auth.uid() is not null);

drop policy if exists trab_select on public.trabajadores;
create policy trab_select on public.trabajadores for select using (auth.uid() is not null);

drop policy if exists ofi_select on public.trabajador_oficios;
create policy ofi_select on public.trabajador_oficios for select using (auth.uid() is not null);

drop policy if exists rev_select on public.reviews;
create policy rev_select on public.reviews for select using (auth.uid() is not null);

drop policy if exists ped_select on public.pedidos;
create policy ped_select on public.pedidos for select
  using (auth.uid() is not null and (estado = 'abierto' or cliente_id = auth.uid() or asignado_a = auth.uid()));
