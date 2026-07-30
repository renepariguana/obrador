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

// Reputación de un usuario (cliente o profesional): promedio de estrellas recibidas + cantidad.
export async function ratingDe(userId: string): Promise<{ rating: number; reviews: number }> {
  const { data } = await supabase.from('reviews').select('estrellas').eq('destinatario_id', userId)
  if (!data || !data.length) return { rating: 0, reviews: 0 }
  return { rating: data.reduce((a, r) => a + (r.estrellas || 0), 0) / data.length, reviews: data.length }
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
