-- Taxonomía maestra controlada desde el Google Sheet (pestaña "Taxonomía").
-- 3 niveles de clasificación: RUBRO → CATEGORÍA → SUBCATEGORÍA (esta última opcional).
-- El tamaño/presentación NO va acá: se deriva del nombre del producto.
-- Se sincroniza con scraper/sync-taxonomia.js. La app la lee para armar los chips.
create table if not exists public.taxonomia (
  id           bigint generated always as identity primary key,
  rubro        text    not null,            -- nivel 1 (ej: Pinturas)
  categoria    text    not null,            -- nivel 2 (ej: Látex)
  subcategoria text    not null default '', -- nivel 3, opcional (ej: Interior)
  keyword      text    not null,            -- término(s) a matchear en el nombre; varios separados por coma
  unidad_base  text    not null default 'u',-- L, Kg, m², m³, u
  orden        int     not null default 0,
  activo       boolean not null default true,
  actualizado  timestamptz not null default now(),
  unique (rubro, categoria, subcategoria)
);

alter table public.taxonomia enable row level security;

-- Lectura pública (la app usa la anon key). Escritura solo con service_role (el sync).
drop policy if exists "taxonomia lectura publica" on public.taxonomia;
create policy "taxonomia lectura publica" on public.taxonomia for select using (true);

create index if not exists taxonomia_rubro_idx on public.taxonomia (rubro, orden);
