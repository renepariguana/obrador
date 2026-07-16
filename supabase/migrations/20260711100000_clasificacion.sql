-- Clasificación del agente: en qué categoría/subcategoría (de tu Sheet) cae cada material.
-- La llena scraper/clasificar.js (agente Claude). La app lee esto, no adivina por keyword.
alter table public.materiales
  add column if not exists cat_app        text,        -- categoría asignada por el agente
  add column if not exists subcat_app     text,        -- subcategoría asignada por el agente
  add column if not exists clasificado_at timestamptz; -- cuándo se clasificó

create index if not exists materiales_cat_app_idx
  on public.materiales (provincia, cat_app, subcat_app);
