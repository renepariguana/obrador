import { supabase } from '../lib/supabase'

// El cliente califica al profesional que hizo el trabajo.
// UNIQUE(pedido_id, autor_id) evita calificar dos veces el mismo pedido.
export async function calificar(
  pedidoId: string,
  destinatarioId: string,
  estrellas: number,
  comentario?: string
): Promise<{ error?: string }> {
  const { data: auth } = await supabase.auth.getUser()
  if (!auth.user) return { error: 'Iniciá sesión para calificar' }
  const { error } = await supabase.from('reviews').insert({
    autor_id: auth.user.id,
    destinatario_id: destinatarioId,
    pedido_id: pedidoId,
    estrellas,
    comentario: comentario?.trim() || null,
  })
  if (error) {
    if (error.code === '23505') return { error: 'Ya calificaste este trabajo' }
    return { error: error.message }
  }
  return {}
}

// ¿El usuario logueado ya dejó una reseña para este pedido?
export async function yaCalifique(pedidoId: string): Promise<boolean> {
  const { data: auth } = await supabase.auth.getUser()
  if (!auth.user) return false
  const { data } = await supabase
    .from('reviews')
    .select('id')
    .eq('pedido_id', pedidoId)
    .eq('autor_id', auth.user.id)
    .maybeSingle()
  return !!data
}
