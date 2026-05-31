# Manos a la obra — Plan 1: Backend & Infraestructura

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Configurar el monorepo, la base de datos Supabase con todas las tablas, políticas RLS, buckets de storage, y el paquete compartido de tipos TypeScript que usarán la web y la app mobile.

**Architecture:** Monorepo con pnpm workspaces. Supabase como backend completo (PostgreSQL + Auth + Storage). Un paquete `packages/shared` exporta tipos TypeScript y el cliente Supabase usado por ambas apps. Las migraciones SQL están versionadas en `supabase/migrations/`.

**Tech Stack:** pnpm workspaces, Supabase CLI, PostgreSQL (via Supabase), TypeScript, Vitest para tests de integración contra Supabase local.

---

## Estructura de archivos

```
manos-a-la-obra/
├── package.json                          ← raíz del monorepo (pnpm workspaces)
├── pnpm-workspace.yaml
├── tsconfig.base.json                    ← config TypeScript base compartida
├── packages/
│   └── shared/
│       ├── package.json
│       ├── tsconfig.json
│       └── src/
│           ├── index.ts                  ← re-exporta todo
│           ├── types/
│           │   ├── user.ts
│           │   ├── worker.ts
│           │   ├── job.ts
│           │   └── subscription.ts
│           ├── client/
│           │   └── supabase.ts           ← factory del cliente Supabase
│           └── __tests__/
│               ├── types.test.ts
│               └── supabase.test.ts
└── supabase/
    ├── config.toml
    └── migrations/
        ├── 20260530000001_initial_schema.sql
        ├── 20260530000002_rls_policies.sql
        └── 20260530000003_storage_buckets.sql
```

---

## Task 1: Inicializar el monorepo con pnpm workspaces

**Files:**
- Create: `package.json`
- Create: `pnpm-workspace.yaml`
- Create: `tsconfig.base.json`
- Create: `.gitignore`

- [ ] **Step 1: Verificar que pnpm está instalado**

```bash
pnpm --version
```
Esperado: `8.x.x` o superior. Si no está: `npm install -g pnpm`

- [ ] **Step 2: Crear el directorio raíz del proyecto**

```bash
mkdir "manos-a-la-obra"
cd "manos-a-la-obra"
git init
```

- [ ] **Step 3: Crear package.json raíz**

Crear el archivo `package.json`:

```json
{
  "name": "manos-a-la-obra",
  "private": true,
  "scripts": {
    "dev:web": "pnpm --filter web dev",
    "dev:mobile": "pnpm --filter mobile start",
    "build:web": "pnpm --filter web build",
    "test": "pnpm --filter shared test",
    "db:start": "supabase start",
    "db:stop": "supabase stop",
    "db:reset": "supabase db reset",
    "db:push": "supabase db push"
  },
  "devDependencies": {
    "typescript": "^5.4.0"
  }
}
```

- [ ] **Step 4: Crear pnpm-workspace.yaml**

```yaml
packages:
  - 'apps/*'
  - 'packages/*'
```

- [ ] **Step 5: Crear tsconfig.base.json**

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "resolveJsonModule": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true
  }
}
```

- [ ] **Step 6: Crear .gitignore**

```
node_modules/
.env
.env.local
dist/
.next/
.expo/
supabase/.temp/
```

- [ ] **Step 7: Crear directorios base**

```bash
mkdir -p apps/web apps/mobile packages/shared supabase/migrations
```

- [ ] **Step 8: Commit inicial**

```bash
git add .
git commit -m "chore: initialize monorepo with pnpm workspaces"
```

---

## Task 2: Instalar y configurar Supabase CLI

**Files:**
- Create: `supabase/config.toml`

- [ ] **Step 1: Instalar Supabase CLI**

```bash
brew install supabase/tap/supabase
```
Verificar: `supabase --version` → esperado: `1.x.x` o superior

- [ ] **Step 2: Inicializar Supabase en el proyecto**

Desde la raíz del monorepo:

```bash
supabase init
```

Esto genera `supabase/config.toml`. Verificar que el archivo existe:

```bash
ls supabase/
```
Esperado: `config.toml` y carpeta `migrations/`

- [ ] **Step 3: Levantar Supabase local**

```bash
supabase start
```

Este comando descarga Docker images y levanta PostgreSQL local. Puede tardar 2-3 minutos la primera vez. Al finalizar muestra:

```
API URL: http://127.0.0.1:54321
DB URL: postgresql://postgres:postgres@127.0.0.1:54322/postgres
Studio URL: http://127.0.0.1:54323
anon key: eyJ...
service_role key: eyJ...
```

**Guardar estos valores** — se necesitan en el paso siguiente.

- [ ] **Step 4: Crear archivo .env.local en la raíz**

```bash
# .env.local (NO commitear — ya está en .gitignore)
SUPABASE_URL=http://127.0.0.1:54321
SUPABASE_ANON_KEY=<anon key del paso anterior>
SUPABASE_SERVICE_ROLE_KEY=<service_role key del paso anterior>
```

- [ ] **Step 5: Commit**

```bash
git add supabase/config.toml
git commit -m "chore: add supabase project config"
```

---

## Task 3: Migración 1 — Schema inicial (todas las tablas)

**Files:**
- Create: `supabase/migrations/20260530000001_initial_schema.sql`

- [ ] **Step 1: Crear el archivo de migración**

Crear `supabase/migrations/20260530000001_initial_schema.sql`:

```sql
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
  auth_id UUID UNIQUE NOT NULL, -- referencia al auth.users de Supabase
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
  icono TEXT NOT NULL, -- nombre del ícono (Phosphor Icons)
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Categorías iniciales
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
```

- [ ] **Step 2: Aplicar la migración**

```bash
supabase db reset
```

Esperado: migración aplicada sin errores. Verificar en Supabase Studio (`http://127.0.0.1:54323`) que las tablas existen.

- [ ] **Step 3: Commit**

```bash
git add supabase/migrations/20260530000001_initial_schema.sql
git commit -m "feat(db): add initial schema with all tables and triggers"
```

---

## Task 4: Migración 2 — Políticas RLS (Row Level Security)

**Files:**
- Create: `supabase/migrations/20260530000002_rls_policies.sql`

- [ ] **Step 1: Crear el archivo de migración RLS**

Crear `supabase/migrations/20260530000002_rls_policies.sql`:

```sql
-- Habilitar RLS en todas las tablas
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE worker_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE supplier_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_categories ENABLE ROW LEVEL SECURITY;

-- ─────────────────────────────────────────
-- Helper: obtener user_id del usuario autenticado
-- ─────────────────────────────────────────
CREATE OR REPLACE FUNCTION get_my_user_id()
RETURNS UUID AS $$
  SELECT id FROM users WHERE auth_id = auth.uid()
$$ LANGUAGE SQL SECURITY DEFINER STABLE;

CREATE OR REPLACE FUNCTION get_my_role()
RETURNS user_role AS $$
  SELECT rol FROM users WHERE auth_id = auth.uid()
$$ LANGUAGE SQL SECURITY DEFINER STABLE;

-- ─────────────────────────────────────────
-- service_categories: lectura pública
-- ─────────────────────────────────────────
CREATE POLICY "categorias_lectura_publica" ON service_categories
  FOR SELECT USING (true);

-- ─────────────────────────────────────────
-- users
-- ─────────────────────────────────────────
CREATE POLICY "users_ver_propio" ON users
  FOR SELECT USING (auth_id = auth.uid());

CREATE POLICY "users_actualizar_propio" ON users
  FOR UPDATE USING (auth_id = auth.uid());

CREATE POLICY "users_insertar_propio" ON users
  FOR INSERT WITH CHECK (auth_id = auth.uid());

-- Admin puede ver todos
CREATE POLICY "users_admin_ver_todos" ON users
  FOR SELECT USING (get_my_role() = 'admin');

-- ─────────────────────────────────────────
-- worker_profiles: lectura pública si verificado y activo
-- ─────────────────────────────────────────
CREATE POLICY "workers_lectura_publica" ON worker_profiles
  FOR SELECT USING (
    verificacion_estado = 'aprobado'
    AND suscripcion_estado = 'activo'
  );

CREATE POLICY "workers_ver_propio" ON worker_profiles
  FOR SELECT USING (user_id = get_my_user_id());

CREATE POLICY "workers_modificar_propio" ON worker_profiles
  FOR ALL USING (user_id = get_my_user_id());

CREATE POLICY "workers_admin" ON worker_profiles
  FOR ALL USING (get_my_role() = 'admin');

-- ─────────────────────────────────────────
-- supplier_profiles: igual que worker_profiles
-- ─────────────────────────────────────────
CREATE POLICY "suppliers_lectura_publica" ON supplier_profiles
  FOR SELECT USING (
    verificacion_estado = 'aprobado'
    AND suscripcion_estado = 'activo'
  );

CREATE POLICY "suppliers_ver_propio" ON supplier_profiles
  FOR SELECT USING (user_id = get_my_user_id());

CREATE POLICY "suppliers_modificar_propio" ON supplier_profiles
  FOR ALL USING (user_id = get_my_user_id());

CREATE POLICY "suppliers_admin" ON supplier_profiles
  FOR ALL USING (get_my_role() = 'admin');

-- ─────────────────────────────────────────
-- job_posts: abiertos son públicos
-- ─────────────────────────────────────────
CREATE POLICY "jobs_lectura_publica_abiertos" ON job_posts
  FOR SELECT USING (estado = 'abierto');

CREATE POLICY "jobs_cliente_ver_propios" ON job_posts
  FOR SELECT USING (cliente_id = get_my_user_id());

CREATE POLICY "jobs_cliente_crear" ON job_posts
  FOR INSERT WITH CHECK (cliente_id = get_my_user_id());

CREATE POLICY "jobs_cliente_actualizar_propio" ON job_posts
  FOR UPDATE USING (cliente_id = get_my_user_id());

-- ─────────────────────────────────────────
-- applications
-- ─────────────────────────────────────────
CREATE POLICY "applications_worker_ver_propias" ON applications
  FOR SELECT USING (worker_id = get_my_user_id());

CREATE POLICY "applications_cliente_ver_de_sus_jobs" ON applications
  FOR SELECT USING (
    job_id IN (
      SELECT id FROM job_posts WHERE cliente_id = get_my_user_id()
    )
  );

CREATE POLICY "applications_worker_crear" ON applications
  FOR INSERT WITH CHECK (worker_id = get_my_user_id());

CREATE POLICY "applications_cliente_actualizar" ON applications
  FOR UPDATE USING (
    job_id IN (
      SELECT id FROM job_posts WHERE cliente_id = get_my_user_id()
    )
  );

-- ─────────────────────────────────────────
-- documents: solo el dueño y admins
-- ─────────────────────────────────────────
CREATE POLICY "documents_ver_propio" ON documents
  FOR SELECT USING (user_id = get_my_user_id());

CREATE POLICY "documents_crear_propio" ON documents
  FOR INSERT WITH CHECK (user_id = get_my_user_id());

CREATE POLICY "documents_admin" ON documents
  FOR ALL USING (get_my_role() = 'admin');

-- ─────────────────────────────────────────
-- reviews: públicas
-- ─────────────────────────────────────────
CREATE POLICY "reviews_lectura_publica" ON reviews
  FOR SELECT USING (true);

CREATE POLICY "reviews_cliente_crear" ON reviews
  FOR INSERT WITH CHECK (cliente_id = get_my_user_id());

-- ─────────────────────────────────────────
-- subscriptions: solo el dueño y admins
-- ─────────────────────────────────────────
CREATE POLICY "subscriptions_ver_propia" ON subscriptions
  FOR SELECT USING (worker_id = get_my_user_id());

CREATE POLICY "subscriptions_admin" ON subscriptions
  FOR ALL USING (get_my_role() = 'admin');
```

- [ ] **Step 2: Aplicar**

```bash
supabase db reset
```

Esperado: sin errores. En Supabase Studio → Authentication → Policies, verificar que las políticas aparecen en cada tabla.

- [ ] **Step 3: Commit**

```bash
git add supabase/migrations/20260530000002_rls_policies.sql
git commit -m "feat(db): add RLS policies for all tables"
```

---

## Task 5: Migración 3 — Storage buckets

**Files:**
- Create: `supabase/migrations/20260530000003_storage_buckets.sql`

- [ ] **Step 1: Crear migración de storage**

Crear `supabase/migrations/20260530000003_storage_buckets.sql`:

```sql
-- Bucket para documentos de verificación (privado)
INSERT INTO storage.buckets (id, name, public)
VALUES ('documents', 'documents', false);

-- Bucket para fotos de perfil (público)
INSERT INTO storage.buckets (id, name, public)
VALUES ('avatars', 'avatars', true);

-- ─────────────────────────────────────────
-- Políticas de storage: documents (privado)
-- ─────────────────────────────────────────
CREATE POLICY "documents_upload_propio" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'documents'
    AND (storage.foldername(name))[1] = (
      SELECT id::text FROM public.users WHERE auth_id = auth.uid()
    )
  );

CREATE POLICY "documents_read_propio" ON storage.objects
  FOR SELECT USING (
    bucket_id = 'documents'
    AND (storage.foldername(name))[1] = (
      SELECT id::text FROM public.users WHERE auth_id = auth.uid()
    )
  );

CREATE POLICY "documents_admin_read" ON storage.objects
  FOR SELECT USING (
    bucket_id = 'documents'
    AND (
      SELECT rol FROM public.users WHERE auth_id = auth.uid()
    ) = 'admin'
  );

-- ─────────────────────────────────────────
-- Políticas de storage: avatars (público)
-- ─────────────────────────────────────────
CREATE POLICY "avatars_lectura_publica" ON storage.objects
  FOR SELECT USING (bucket_id = 'avatars');

CREATE POLICY "avatars_upload_propio" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'avatars'
    AND (storage.foldername(name))[1] = (
      SELECT id::text FROM public.users WHERE auth_id = auth.uid()
    )
  );
```

- [ ] **Step 2: Aplicar**

```bash
supabase db reset
```

Esperado: sin errores. En Supabase Studio → Storage, verificar que los buckets `documents` y `avatars` existen.

- [ ] **Step 3: Commit**

```bash
git add supabase/migrations/20260530000003_storage_buckets.sql
git commit -m "feat(db): add storage buckets for documents and avatars"
```

---

## Task 6: Paquete compartido — tipos TypeScript

**Files:**
- Create: `packages/shared/package.json`
- Create: `packages/shared/tsconfig.json`
- Create: `packages/shared/src/types/user.ts`
- Create: `packages/shared/src/types/worker.ts`
- Create: `packages/shared/src/types/job.ts`
- Create: `packages/shared/src/types/subscription.ts`
- Create: `packages/shared/src/types/index.ts`
- Create: `packages/shared/src/index.ts`

- [ ] **Step 1: Crear package.json del paquete shared**

Crear `packages/shared/package.json`:

```json
{
  "name": "@manos/shared",
  "version": "0.0.1",
  "private": true,
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.js",
      "types": "./dist/index.d.ts"
    }
  },
  "scripts": {
    "build": "tsc",
    "test": "vitest run",
    "test:watch": "vitest"
  },
  "devDependencies": {
    "typescript": "^5.4.0",
    "vitest": "^1.6.0",
    "@supabase/supabase-js": "^2.43.0"
  },
  "peerDependencies": {
    "@supabase/supabase-js": "^2.43.0"
  }
}
```

- [ ] **Step 2: Crear tsconfig.json del paquete**

Crear `packages/shared/tsconfig.json`:

```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist"]
}
```

- [ ] **Step 3: Crear tipos de usuario**

Crear `packages/shared/src/types/user.ts`:

```typescript
export type UserRole = 'cliente' | 'trabajador' | 'proveedor' | 'admin'

export interface User {
  id: string
  auth_id: string
  email: string
  nombre: string
  telefono: string | null
  rol: UserRole
  avatar_url: string | null
  created_at: string
  updated_at: string
}

export interface CreateUserInput {
  auth_id: string
  email: string
  nombre: string
  rol: UserRole
  telefono?: string
}
```

- [ ] **Step 4: Crear tipos de trabajador**

Crear `packages/shared/src/types/worker.ts`:

```typescript
export type VerificationStatus = 'pendiente' | 'aprobado' | 'rechazado'
export type SubscriptionStatus = 'activo' | 'inactivo' | 'vencido'
export type DocumentType = 'dni_frente' | 'dni_dorso' | 'cuit'

export interface WorkerProfile {
  id: string
  user_id: string
  descripcion: string | null
  zona: string
  lat: number | null
  lng: number | null
  category_ids: string[]
  verificacion_estado: VerificationStatus
  suscripcion_estado: SubscriptionStatus
  rating_promedio: number
  rating_count: number
  postulaciones_mes: number
  created_at: string
  updated_at: string
}

export interface SupplierProfile {
  id: string
  user_id: string
  descripcion: string | null
  zona: string
  lat: number | null
  lng: number | null
  tipos_material: string[]
  verificacion_estado: VerificationStatus
  suscripcion_estado: SubscriptionStatus
  created_at: string
  updated_at: string
}

export interface Document {
  id: string
  user_id: string
  tipo: DocumentType
  archivo_url: string
  estado: VerificationStatus
  rechazo_motivo: string | null
  created_at: string
  updated_at: string
}

export interface ServiceCategory {
  id: string
  nombre: string
  icono: string
  created_at: string
}

export interface Review {
  id: string
  job_id: string
  cliente_id: string
  worker_id: string
  puntuacion: number
  comentario: string | null
  created_at: string
}

export function isWorkerActive(profile: WorkerProfile): boolean {
  return (
    profile.verificacion_estado === 'aprobado' &&
    profile.suscripcion_estado === 'activo'
  )
}
```

- [ ] **Step 5: Crear tipos de trabajo**

Crear `packages/shared/src/types/job.ts`:

```typescript
export type JobStatus = 'abierto' | 'en_curso' | 'terminado' | 'cancelado'
export type ApplicationStatus = 'pendiente' | 'aceptado' | 'rechazado'

export interface JobPost {
  id: string
  cliente_id: string
  titulo: string
  descripcion: string
  category_id: string
  lat: number
  lng: number
  direccion: string
  estado: JobStatus
  worker_seleccionado_id: string | null
  created_at: string
  updated_at: string
}

export interface Application {
  id: string
  job_id: string
  worker_id: string
  mensaje: string | null
  estado: ApplicationStatus
  created_at: string
}

export interface CreateJobInput {
  titulo: string
  descripcion: string
  category_id: string
  lat: number
  lng: number
  direccion: string
}

export interface CreateApplicationInput {
  job_id: string
  mensaje?: string
}
```

- [ ] **Step 6: Crear tipos de suscripción**

Crear `packages/shared/src/types/subscription.ts`:

```typescript
import type { SubscriptionStatus } from './worker'

export type SubscriptionPlan = 'basico' | 'pro'

export interface Subscription {
  id: string
  worker_id: string
  plan: SubscriptionPlan
  estado: SubscriptionStatus
  vence_en: string | null
  mp_subscription_id: string | null
  mp_payer_id: string | null
  created_at: string
  updated_at: string
}

export const PLAN_LIMITS: Record<SubscriptionPlan, { postulaciones_mes: number | null }> = {
  basico: { postulaciones_mes: 5 },
  pro: { postulaciones_mes: null }, // ilimitado
}
```

- [ ] **Step 7: Crear barrel de tipos**

Crear `packages/shared/src/types/index.ts`:

```typescript
export * from './user'
export * from './worker'
export * from './job'
export * from './subscription'
```

- [ ] **Step 8: Crear index principal del paquete**

Crear `packages/shared/src/index.ts`:

```typescript
export * from './types'
export * from './client/supabase'
```

- [ ] **Step 9: Instalar dependencias**

```bash
cd packages/shared
pnpm install
```

- [ ] **Step 10: Compilar para verificar que no hay errores de tipos**

```bash
pnpm build
```
Esperado: sin errores. Genera carpeta `dist/`.

- [ ] **Step 11: Commit**

```bash
git add packages/shared/
git commit -m "feat(shared): add TypeScript types for all domain entities"
```

---

## Task 7: Paquete compartido — cliente Supabase y tests

**Files:**
- Create: `packages/shared/src/client/supabase.ts`
- Create: `packages/shared/src/__tests__/types.test.ts`
- Create: `packages/shared/src/__tests__/supabase.test.ts`

- [ ] **Step 1: Escribir el test del cliente Supabase (primero)**

Crear `packages/shared/src/__tests__/supabase.test.ts`:

```typescript
import { describe, it, expect } from 'vitest'
import { createSupabaseClient } from '../client/supabase'

describe('createSupabaseClient', () => {
  it('crea un cliente con URL y key válidos', () => {
    const client = createSupabaseClient(
      'http://127.0.0.1:54321',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.test'
    )
    expect(client).toBeDefined()
    expect(typeof client.from).toBe('function')
    expect(typeof client.auth.signIn).toBe('undefined') // v2 usa signInWithPassword
    expect(typeof client.auth.signInWithPassword).toBe('function')
  })

  it('lanza error si falta URL', () => {
    expect(() => createSupabaseClient('', 'key')).toThrow('SUPABASE_URL es requerida')
  })

  it('lanza error si falta key', () => {
    expect(() => createSupabaseClient('http://localhost', '')).toThrow('SUPABASE_ANON_KEY es requerida')
  })
})
```

- [ ] **Step 2: Correr el test — debe fallar**

```bash
pnpm test
```
Esperado: FAIL — `createSupabaseClient` no existe todavía.

- [ ] **Step 3: Implementar el cliente**

Crear `packages/shared/src/client/supabase.ts`:

```typescript
import { createClient, type SupabaseClient } from '@supabase/supabase-js'

export function createSupabaseClient(url: string, anonKey: string): SupabaseClient {
  if (!url) throw new Error('SUPABASE_URL es requerida')
  if (!anonKey) throw new Error('SUPABASE_ANON_KEY es requerida')
  return createClient(url, anonKey)
}
```

- [ ] **Step 4: Correr el test — debe pasar**

```bash
pnpm test
```
Esperado: PASS (3 tests)

- [ ] **Step 5: Escribir tests de tipos**

Crear `packages/shared/src/__tests__/types.test.ts`:

```typescript
import { describe, it, expect } from 'vitest'
import { isWorkerActive, PLAN_LIMITS } from '../types'
import type { WorkerProfile } from '../types'

const baseWorker: WorkerProfile = {
  id: '1',
  user_id: '2',
  descripcion: null,
  zona: 'Tucumán',
  lat: null,
  lng: null,
  category_ids: [],
  verificacion_estado: 'aprobado',
  suscripcion_estado: 'activo',
  rating_promedio: 4.5,
  rating_count: 10,
  postulaciones_mes: 2,
  created_at: '2026-01-01',
  updated_at: '2026-01-01',
}

describe('isWorkerActive', () => {
  it('retorna true si verificado y suscripción activa', () => {
    expect(isWorkerActive(baseWorker)).toBe(true)
  })

  it('retorna false si verificación pendiente', () => {
    expect(isWorkerActive({ ...baseWorker, verificacion_estado: 'pendiente' })).toBe(false)
  })

  it('retorna false si suscripción inactiva', () => {
    expect(isWorkerActive({ ...baseWorker, suscripcion_estado: 'inactivo' })).toBe(false)
  })

  it('retorna false si rechazado aunque suscripción activa', () => {
    expect(isWorkerActive({ ...baseWorker, verificacion_estado: 'rechazado' })).toBe(false)
  })
})

describe('PLAN_LIMITS', () => {
  it('plan basico tiene límite de 5 postulaciones', () => {
    expect(PLAN_LIMITS.basico.postulaciones_mes).toBe(5)
  })

  it('plan pro no tiene límite (null)', () => {
    expect(PLAN_LIMITS.pro.postulaciones_mes).toBeNull()
  })
})
```

- [ ] **Step 6: Correr todos los tests**

```bash
pnpm test
```
Esperado: PASS (7 tests en total)

- [ ] **Step 7: Compilar el paquete completo**

```bash
pnpm build
```
Esperado: sin errores.

- [ ] **Step 8: Commit**

```bash
git add packages/shared/src/
git commit -m "feat(shared): add Supabase client factory with tests"
```

---

## Task 8: Verificación final del Plan 1

- [ ] **Step 1: Levantar Supabase local y verificar schema completo**

```bash
supabase start
supabase db reset
```

Abrir Supabase Studio en `http://127.0.0.1:54323` y verificar:
- [ ] Existen las 9 tablas: `users`, `worker_profiles`, `supplier_profiles`, `service_categories`, `job_posts`, `applications`, `documents`, `reviews`, `subscriptions`
- [ ] La tabla `service_categories` tiene 10 categorías insertadas
- [ ] Los 3 triggers existen: `reviews_update_rating`, `applications_accept`, y los de `updated_at`
- [ ] Los 2 buckets de storage existen: `documents` (privado) y `avatars` (público)

- [ ] **Step 2: Correr todos los tests del monorepo**

```bash
pnpm test
```
Esperado: PASS (7 tests)

- [ ] **Step 3: Tag del Plan 1 completado**

```bash
git tag plan-1-backend-completo
```

---

## Resumen del Plan 1

Al completar este plan tendrás:
- Monorepo funcional con pnpm workspaces
- Base de datos PostgreSQL local con todas las tablas, enums, triggers y RLS
- Storage configurado para documentos de verificación y avatars
- Paquete `@manos/shared` con tipos TypeScript completos y cliente Supabase testeado
- 7 tests pasando

**Siguiente:** Plan 2 — Web App (Next.js)
