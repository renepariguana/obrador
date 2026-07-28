-- Etapa 2: fotos en el pedido ("Agregar detalle")
-- Correr en Supabase (SQL editor) una sola vez.

-- 1) Columna de fotos en pedidos: array de URLs públicas.
alter table public.pedidos
  add column if not exists fotos text[] not null default '{}';

-- 2) Bucket público para las fotos de pedidos.
insert into storage.buckets (id, name, public)
values ('pedidos', 'pedidos', true)
on conflict (id) do nothing;

-- 3) Políticas de storage sobre el bucket 'pedidos'.
-- Lectura pública (los profesionales ven las fotos del trabajo).
drop policy if exists "pedidos_fotos_lectura_publica" on storage.objects;
create policy "pedidos_fotos_lectura_publica" on storage.objects
  for select using (bucket_id = 'pedidos');

-- Subida: solo usuarios autenticados, y cada uno en su propia carpeta (uid/...).
drop policy if exists "pedidos_fotos_upload_propio" on storage.objects;
create policy "pedidos_fotos_upload_propio" on storage.objects
  for insert to authenticated with check (
    bucket_id = 'pedidos'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

-- Borrado: cada uno sus propias fotos.
drop policy if exists "pedidos_fotos_borrado_propio" on storage.objects;
create policy "pedidos_fotos_borrado_propio" on storage.objects
  for delete to authenticated using (
    bucket_id = 'pedidos'
    and (storage.foldername(name))[1] = auth.uid()::text
  );
