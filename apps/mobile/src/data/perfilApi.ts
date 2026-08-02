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
// El teléfono/WhatsApp viven en profiles_privados (no en la lectura pública de profiles).
export async function getPerfil(): Promise<Perfil | null> {
  const { data: auth } = await supabase.auth.getUser()
  if (!auth.user) return null
  const { data } = await supabase
    .from('profiles')
    .select('id,nombre,zona,avatar_url,es_trabajador')
    .eq('id', auth.user.id)
    .maybeSingle()
  if (!data) return null
  const { data: priv } = await supabase
    .from('profiles_privados')
    .select('telefono,whatsapp')
    .eq('profile_id', auth.user.id)
    .maybeSingle()
  return {
    ...(data as Omit<Perfil, 'telefono' | 'whatsapp'>),
    telefono: (priv as { telefono: string | null } | null)?.telefono ?? null,
    whatsapp: (priv as { whatsapp: string | null } | null)?.whatsapp ?? null,
  }
}

export async function guardarPerfil(cambios: Partial<Perfil>): Promise<{ error?: string }> {
  const { data: auth } = await supabase.auth.getUser()
  if (!auth.user) return { error: 'No hay sesión' }
  const uid = auth.user.id
  // Datos públicos → profiles
  const pub: Record<string, unknown> = {}
  if (cambios.nombre !== undefined) pub.nombre = cambios.nombre
  if (cambios.zona !== undefined) pub.zona = cambios.zona
  if (cambios.avatar_url !== undefined) pub.avatar_url = cambios.avatar_url
  if (Object.keys(pub).length) {
    const { error } = await supabase.from('profiles').update(pub).eq('id', uid)
    if (error) return { error: error.message }
  }
  // Datos de contacto → profiles_privados (privado)
  if (cambios.telefono !== undefined || cambios.whatsapp !== undefined) {
    const priv: Record<string, unknown> = { profile_id: uid }
    if (cambios.telefono !== undefined) priv.telefono = cambios.telefono
    if (cambios.whatsapp !== undefined) priv.whatsapp = cambios.whatsapp
    const { error } = await supabase.from('profiles_privados').upsert(priv, { onConflict: 'profile_id' })
    if (error) return { error: error.message }
  }
  return {}
}

// Teléfono/WhatsApp de otro usuario — solo lo devuelve si hay login + relación
// (profesional del directorio, o pedido en común). Ver función SQL contacto_de().
export async function contactoDe(id: string): Promise<{ telefono: string | null; whatsapp: string | null }> {
  const { data } = await supabase.rpc('contacto_de', { otro: id })
  const row = (Array.isArray(data) ? data[0] : data) as { telefono?: string | null; whatsapp?: string | null } | null
  return { telefono: row?.telefono ?? null, whatsapp: row?.whatsapp ?? null }
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
