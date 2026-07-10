-- ============================================================
-- PROVEEDORES: directorio de proveedores de materiales
-- (Easy, EMI, corralones…). materiales.proveedor_id lo referencia,
-- reemplazando el enum fijo `fuente`.
-- ============================================================

CREATE TABLE proveedores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,          -- identificador estable para el scraper
  url TEXT,
  provincia TEXT,                     -- provincia principal; NULL si es nacional
  logo_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE proveedores ENABLE ROW LEVEL SECURITY;
CREATE POLICY "proveedores_select_public" ON proveedores FOR SELECT USING (true);

-- Semilla: los proveedores que ya scrapeamos
INSERT INTO proveedores (nombre, slug, url, provincia) VALUES
  ('Easy',    'easy', 'https://www.easy.com.ar',          NULL),
  ('EMI SRL', 'emi',  'https://www.tiendaemisrl.com.ar',  'Tucumán');

-- Referencia en materiales
ALTER TABLE materiales ADD COLUMN proveedor_id UUID REFERENCES proveedores(id);

-- Backfill: mapear el enum fuente → proveedor
UPDATE materiales m
  SET proveedor_id = p.id
  FROM proveedores p
  WHERE p.slug = m.fuente::text;

-- Ahora obligatorio; sacamos la columna/enum viejos
ALTER TABLE materiales ALTER COLUMN proveedor_id SET NOT NULL;
ALTER TABLE materiales DROP COLUMN fuente;   -- también elimina el UNIQUE(fuente,provincia,url)
DROP TYPE material_fuente;

-- Nuevo unique (para el upsert del scraper) e índice
ALTER TABLE materiales ADD CONSTRAINT materiales_uniq UNIQUE (proveedor_id, provincia, url);
CREATE INDEX materiales_proveedor_idx ON materiales (proveedor_id);

-- Categoría NORMALIZADA (nuestra taxonomía común, la asigna el scraper por reglas).
-- Se guarda además de la `categoria` original de cada proveedor.
ALTER TABLE materiales ADD COLUMN categoria_norm TEXT;
CREATE INDEX materiales_categoria_norm_idx ON materiales (provincia, categoria_norm);
