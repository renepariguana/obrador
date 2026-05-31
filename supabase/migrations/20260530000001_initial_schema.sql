-- Extensión para UUIDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Enum para roles de usuario
CREATE TYPE user_role AS ENUM ('cliente', 'trabajador', 'proveedor', 'admin');

-- Enum para estados de verificación
CREATE TYPE verification_status AS ENUM ('pendiente', 'aprobado', 'rechazado');

-- Enum para estados de suscripción
CREATE TYPE subscription_status AS ENUM ('activo', 'inactivo', 'vencido');

-- Enum para estados de trabajo
CREATE TYPE job_status AS ENUM ('abierto', 'en_curso', 'terminado', 'cancelado');

-- Enum para estados de postulación
CREATE TYPE application_status AS ENUM ('pendiente', 'aceptado', 'rechazado');

-- Enum para planes de suscripción
CREATE TYPE subscription_plan AS ENUM ('basico', 'pro');

-- Enum para tipo de documento
CREATE TYPE document_type AS ENUM ('dni_frente', 'dni_dorso', 'cuit');

-- ─────────────────────────────────────────
-- Tabla principal de usuarios
-- ─────────────────────────────────────────
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  auth_id UUID UNIQUE NOT NULL,
  email TEXT NOT NULL UNIQUE,
  nombre TEXT NOT NULL,
  telefono TEXT,
  rol user_role NOT NULL DEFAULT 'cliente',
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─────────────────────────────────────────
-- Categorías de servicios
-- ─────────────────────────────────────────
CREATE TABLE service_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nombre TEXT NOT NULL UNIQUE,
  icono TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

INSERT INTO service_categories (nombre, icono) VALUES
  ('Plomería', 'Wrench'),
  ('Albañilería', 'Wall'),
  ('Electricidad', 'Lightning'),
  ('Pintura', 'PaintBrush'),
  ('Carpintería', 'Hammer'),
  ('Gas', 'Fire'),
  ('Techado', 'House'),
  ('Cerrajería', 'Key'),
  ('Jardinería', 'Plant'),
  ('Limpieza', 'Broom');

-- ─────────────────────────────────────────
-- Perfiles de trabajadores
-- ─────────────────────────────────────────
CREATE TABLE worker_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  descripcion TEXT,
  zona TEXT NOT NULL,
  lat DECIMAL(10, 8),
  lng DECIMAL(11, 8),
  category_ids UUID[] NOT NULL DEFAULT '{}',
  verificacion_estado verification_status NOT NULL DEFAULT 'pendiente',
  suscripcion_estado subscription_status NOT NULL DEFAULT 'inactivo',
  rating_promedio DECIMAL(3,2) NOT NULL DEFAULT 0,
  rating_count INTEGER NOT NULL DEFAULT 0,
  postulaciones_mes INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─────────────────────────────────────────
-- Perfiles de proveedores de materiales
-- ─────────────────────────────────────────
CREATE TABLE supplier_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  descripcion TEXT,
  zona TEXT NOT NULL,
  lat DECIMAL(10, 8),
  lng DECIMAL(11, 8),
  tipos_material TEXT[] NOT NULL DEFAULT '{}',
  verificacion_estado verification_status NOT NULL DEFAULT 'pendiente',
  suscripcion_estado subscription_status NOT NULL DEFAULT 'inactivo',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─────────────────────────────────────────
-- Publicaciones de trabajos
-- ─────────────────────────────────────────
CREATE TABLE job_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  cliente_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  titulo TEXT NOT NULL,
  descripcion TEXT NOT NULL,
  category_id UUID NOT NULL REFERENCES service_categories(id),
  lat DECIMAL(10, 8) NOT NULL,
  lng DECIMAL(11, 8) NOT NULL,
  direccion TEXT NOT NULL,
  estado job_status NOT NULL DEFAULT 'abierto',
  worker_seleccionado_id UUID REFERENCES users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─────────────────────────────────────────
-- Postulaciones a trabajos
-- ─────────────────────────────────────────
CREATE TABLE applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  job_id UUID NOT NULL REFERENCES job_posts(id) ON DELETE CASCADE,
  worker_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  mensaje TEXT,
  estado application_status NOT NULL DEFAULT 'pendiente',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(job_id, worker_id)
);

-- ─────────────────────────────────────────
-- Documentos de verificación
-- ─────────────────────────────────────────
CREATE TABLE documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  tipo document_type NOT NULL,
  archivo_url TEXT NOT NULL,
  estado verification_status NOT NULL DEFAULT 'pendiente',
  rechazo_motivo TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, tipo)
);

-- ─────────────────────────────────────────
-- Calificaciones
-- ─────────────────────────────────────────
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  job_id UUID NOT NULL UNIQUE REFERENCES job_posts(id) ON DELETE CASCADE,
  cliente_id UUID NOT NULL REFERENCES users(id),
  worker_id UUID NOT NULL REFERENCES users(id),
  puntuacion INTEGER NOT NULL CHECK (puntuacion BETWEEN 1 AND 5),
  comentario TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─────────────────────────────────────────
-- Suscripciones
-- ─────────────────────────────────────────
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  worker_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  plan subscription_plan NOT NULL DEFAULT 'basico',
  estado subscription_status NOT NULL DEFAULT 'inactivo',
  vence_en TIMESTAMPTZ,
  mp_subscription_id TEXT UNIQUE,
  mp_payer_id TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─────────────────────────────────────────
-- Trigger: actualizar updated_at automáticamente
-- ─────────────────────────────────────────
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER worker_profiles_updated_at BEFORE UPDATE ON worker_profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER supplier_profiles_updated_at BEFORE UPDATE ON supplier_profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER job_posts_updated_at BEFORE UPDATE ON job_posts FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER documents_updated_at BEFORE UPDATE ON documents FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER subscriptions_updated_at BEFORE UPDATE ON subscriptions FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ─────────────────────────────────────────
-- Trigger: recalcular rating_promedio al agregar review
-- ─────────────────────────────────────────
CREATE OR REPLACE FUNCTION update_worker_rating()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE worker_profiles
  SET
    rating_promedio = (
      SELECT ROUND(AVG(puntuacion)::numeric, 2)
      FROM reviews
      WHERE worker_id = NEW.worker_id
    ),
    rating_count = (
      SELECT COUNT(*)
      FROM reviews
      WHERE worker_id = NEW.worker_id
    )
  WHERE user_id = NEW.worker_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER reviews_update_rating
AFTER INSERT ON reviews
FOR EACH ROW EXECUTE FUNCTION update_worker_rating();

-- ─────────────────────────────────────────
-- Trigger: rechazar otras postulaciones al aceptar una
-- ─────────────────────────────────────────
CREATE OR REPLACE FUNCTION reject_other_applications()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.estado = 'aceptado' AND OLD.estado != 'aceptado' THEN
    UPDATE applications
    SET estado = 'rechazado'
    WHERE job_id = NEW.job_id
      AND id != NEW.id
      AND estado = 'pendiente';

    UPDATE job_posts
    SET estado = 'en_curso',
        worker_seleccionado_id = NEW.worker_id
    WHERE id = NEW.job_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER applications_accept
AFTER UPDATE ON applications
FOR EACH ROW EXECUTE FUNCTION reject_other_applications();
