import { supabase } from '../lib/supabase'

export type Perfil = {
  id: string
  nombre: string
  telefono: string | null
  whatsapp: string | null
  zona: string | null
  avatar_url: string | null
  es_trabajador: boolean
}

// Perfil del usuario logueado (la fila la crea el trigger al registrarse).
export async function getPerfil(): Promise<Perfil | null> {
  const { data: auth } = await supabase.auth.getUser()
  if (!auth.user) return null
  const { data } = await supabase
    .from('profiles')
    .select('id,nombre,telefono,whatsapp,zona,avatar_url,es_trabajador')
    .eq('id', auth.user.id)
    .maybeSingle()
  return (data as Perfil) ?? null
}

export async function guardarPerfil(cambios: Partial<Perfil>): Promise<{ error?: string }> {
  const { data: auth } = await supabase.auth.getUser()
  if (!auth.user) return { error: 'No hay sesión' }
  const { error } = await supabase.from('profiles').update(cambios).eq('id', auth.user.id)
  return error ? { error: error.message } : {}
}

// ─── Perfil profesional (rol trabajador) ───
export type PerfilProfesional = { esTrabajador: boolean; descripcion: string; oficios: string[] }

// Oficios disponibles para elegir al ofrecer servicios.
export const OFICIOS = [
  'Plomero', 'Electricista', 'Pintor', 'Albañil', 'Carpintero', 'Gasista', 'Herrero',
  'Techista', 'Durlero', 'Zinguero', 'Cerrajero', 'Vidriero', 'Aire acondicionado', 'Jardinero / Paisajista', 'Fletero',
]

export async function getMiPerfilProfesional(): Promise<PerfilProfesional | null> {
  const { data: auth } = await supabase.auth.getUser()
  if (!auth.user) return null
  const { data } = await supabase
    .from('trabajadores')
    .select('descripcion, activo, trabajador_oficios(oficio)')
    .eq('profile_id', auth.user.id)
    .maybeSingle()
  if (!data) return { esTrabajador: false, descripcion: '', oficios: [] }
  const d = data as unknown as { descripcion: string | null; activo: boolean; trabajador_oficios: { oficio: string }[] }
  return { esTrabajador: !!d.activo, descripcion: d.descripcion || '', oficios: (d.trabajador_oficios || []).map((o) => o.oficio) }
}

export async function guardarPerfilProfesional(descripcion: string, oficios: string[], zona: string | null): Promise<{ error?: string }> {
  const { data: auth } = await supabase.auth.getUser()
  if (!auth.user) return { error: 'No hay sesión' }
  const uid = auth.user.id
  const { error: e1 } = await supabase.from('trabajadores').upsert({ profile_id: uid, descripcion, activo: true }, { onConflict: 'profile_id' })
  if (e1) return { error: e1.message }
  await supabase.from('profiles').update({ es_trabajador: true }).eq('id', uid)
  await supabase.from('trabajador_oficios').delete().eq('trabajador_id', uid) // reemplaza el set de oficios
  if (oficios.length) {
    const rows = oficios.map((o) => ({ trabajador_id: uid, oficio: o, zona }))
    const { error: e3 } = await supabase.from('trabajador_oficios').insert(rows)
    if (e3) return { error: e3.message }
  }
  return {}
}
