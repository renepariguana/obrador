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
