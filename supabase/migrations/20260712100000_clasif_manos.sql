-- Clasificación que controlás desde la pestaña "Materiales" del Sheet Manos a la Obra.
-- La sincroniza scraper/sync-materiales.js. La app lee esto (cat_app, subcat_app, unidad_app, marca_app).
alter table public.materiales
  add column if not exists unidad_app text,
  add column if not exists marca_app  text;
