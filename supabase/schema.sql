-- ESQUEMA COMPLETO de Supabase (Manos a la Obra) — estado final, en un solo bloque.
-- Idempotente: se puede correr las veces que quieras sin errores.
-- Reemplaza a todas las migraciones sueltas.

-- ========== PROVEEDORES ==========
create table if not exists public.proveedores (
  id         uuid primary key default gen_random_uuid(),
  nombre     text not null,
  slug       text not null unique,
  url        text,
  provincia  text,
  logo_url   text,
  created_at timestamptz not null default now()
);
alter table public.proveedores enable row level security;
drop policy if exists "proveedores_select_public" on public.proveedores;
create policy "proveedores_select_public" on public.proveedores for select using (true);

insert into public.proveedores (nombre, slug, url, provincia) values
  ('Easy',    'easy', 'https://www.easy.com.ar',         null),
  ('EMI SRL', 'emi',  'https://www.tiendaemisrl.com.ar', 'Tucumán')
on conflict (slug) do nothing;

-- ========== MATERIALES ==========
create table if not exists public.materiales (
  id           uuid primary key default gen_random_uuid(),
  provincia    text not null,
  proveedor_id uuid not null references public.proveedores(id),
  nombre       text not null,
  precio       numeric(12,2) not null,
  url          text,
  actualizado  timestamptz not null default now(),
  unique (proveedor_id, provincia, url)
);

-- Columnas (idempotentes: agrega solo las que falten)
alter table public.materiales
  add column if not exists categoria      text,  -- categoría cruda del proveedor
  add column if not exists subcategoria   text,  -- primera palabra (agrupa)
  add column if not exists categoria_norm text,  -- taxonomía vieja (CANON)
  add column if not exists unidad         text,
  add column if not exists descripcion    text,  -- ficha/specs scrapeada
  add column if not exists sku            text,  -- código de producto de la página (altas/bajas)
  add column if not exists activo         boolean not null default true, -- sigue en la página
  add column if not exists baja_at        timestamptz,                    -- cuándo dejó de aparecer
  add column if not exists cat_app        text,  -- TU categoría (Sheet Manos)
  add column if not exists subcat_app     text,  -- TU subcategoría
  add column if not exists unidad_app     text,  -- TU unidad
  add column if not exists marca_app      text,  -- marca
  add column if not exists clasificado_at timestamptz;

alter table public.materiales enable row level security;
drop policy if exists "materiales_select_public" on public.materiales;
create policy "materiales_select_public" on public.materiales for select using (true);

-- Índices
create index if not exists materiales_provincia_categoria_idx on public.materiales (provincia, categoria);
create index if not exists materiales_categoria_norm_idx      on public.materiales (provincia, categoria_norm);
create index if not exists materiales_proveedor_idx           on public.materiales (proveedor_id);
create index if not exists materiales_cat_app_idx             on public.materiales (provincia, cat_app, subcat_app);
create index if not exists materiales_busqueda_idx            on public.materiales using gin (to_tsvector('spanish', nombre));
