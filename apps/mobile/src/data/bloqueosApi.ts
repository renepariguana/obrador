import { supabase } from '../lib/supabase'

export type Bloqueado = { id: string; nombre: string }

export async function bloquear(bloqueadoId: string): Promise<{ error?: string }> {
  const { data: auth } = await supabase.auth.getUser()
  if (!auth.user) return { error: 'Iniciá sesión para bloquear' }
  const { error } = await supabase
    .from('bloqueos')
    .insert({ bloqueador_id: auth.user.id, bloqueado_id: bloqueadoId })
  if (error && error.code !== '23505') return { error: error.message } // 23505 = ya estaba bloqueado
  return {}
}

export async function desbloquear(bloqueadoId: string): Promise<{ error?: string }> {
  const { data: auth } = await supabase.auth.getUser()
  if (!auth.user) return { error: 'No hay sesión' }
  const { error } = await supabase
    .from('bloqueos')
    .delete()
    .eq('bloqueador_id', auth.user.id)
    .eq('bloqueado_id', bloqueadoId)
  return error ? { error: error.message } : {}
}

// Ids de usuarios que bloqueé (para filtrar sus pedidos/perfil).
export async function idsBloqueados(): Promise<string[]> {
  const { data: auth } = await supabase.auth.getUser()
  if (!auth.user) return []
  const { data } = await supabase.from('bloqueos').select('bloqueado_id').eq('bloqueador_id', auth.user.id)
  return ((data as { bloqueado_id: string }[]) || []).map((b) => b.bloqueado_id)
}

export async function listarBloqueados(): Promise<Bloqueado[]> {
  const { data: auth } = await supabase.auth.getUser()
  if (!auth.user) return []
  const { data } = await supabase
    .from('bloqueos')
    .select('bloqueado_id, perfil:profiles!bloqueado_id(nombre)')
    .eq('bloqueador_id', auth.user.id)
    .order('creado_at', { ascending: false })
  return (
    (data as unknown as Array<{ bloqueado_id: string; perfil: { nombre: string | null } | null }>) || []
  ).map((b) => ({ id: b.bloqueado_id, nombre: b.perfil?.nombre || 'Usuario' }))
}
