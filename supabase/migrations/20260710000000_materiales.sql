-- ============================================================
-- MATERIALES: precios scrapeados (Easy, EMI) por provincia
-- Fuente de datos del "Cotizar". Se cargan desde los scrapers
-- (service_role); lectura pública para la app.
-- ============================================================

CREATE TYPE material_fuente AS ENUM ('easy', 'emi');

CREATE TABLE materiales (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  provincia TEXT NOT NULL,
  fuente material_fuente NOT NULL,
  categoria TEXT,
  subcategoria TEXT,
  nombre TEXT NOT NULL,
  precio NUMERIC(12, 2) NOT NULL,
  unidad TEXT,
  url TEXT,
  actualizado TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  -- evita duplicados del mismo producto/fuente/provincia (para upsert)
  UNIQUE (fuente, provincia, url)
);

CREATE INDEX materiales_provincia_categoria_idx ON materiales (provincia, categoria);
CREATE INDEX materiales_busqueda_idx ON materiales USING GIN (to_tsvector('spanish', nombre));

-- RLS: lectura pública; la escritura la hace el scraper con service_role
-- (que ignora RLS), por eso no definimos policies de INSERT/UPDATE.
ALTER TABLE materiales ENABLE ROW LEVEL SECURITY;

CREATE POLICY "materiales_select_public"
  ON materiales FOR SELECT
  USING (true);
