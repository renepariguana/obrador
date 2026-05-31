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
