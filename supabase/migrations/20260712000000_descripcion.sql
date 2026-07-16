-- Descripción/ficha técnica de cada producto (specs: dimensiones, peso, contenido…).
-- La llena scraper/subir.js con lo que captura el scraper. El agente la lee para sacar la unidad.
alter table public.materiales
  add column if not exists descripcion text;
