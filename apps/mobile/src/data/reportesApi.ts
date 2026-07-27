import { supabase } from '../lib/supabase'

export type TipoReporte = 'usuario' | 'pedido' | 'review'

// Registra un reporte (moderación). Lo revisa el equipo en Supabase.
export async function reportar(
  tipo: TipoReporte,
  targetId: string,
  motivo: string
): Promise<{ error?: string }> {
  const { data: auth } = await supabase.auth.getUser()
  if (!auth.user) return { error: 'Iniciá sesión para reportar' }
  const { error } = await supabase.from('reportes').insert({
    reporter_id: auth.user.id,
    tipo,
    target_id: targetId,
    motivo,
  })
  return error ? { error: error.message } : {}
}
