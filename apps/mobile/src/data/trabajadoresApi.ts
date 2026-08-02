import { supabase } from '../lib/supabase'
import { idsBloqueados } from './bloqueosApi'

// Trabajador tal como lo consumen las pantallas del directorio (compatible con el mock viejo).
export type Trabajador = {
  id: string // profile_id
  nombre: string
  oficio: string
  rating: number
  puntos: number
  reviews: number
  verificado: boolean
  zona: string | null
  dist: string
  descripcion?: string | null
  telefono?: string | null
  whatsapp?: string | null
}

export type Review = { id: string; estrellas: number; comentario: string | null; creado_at: string; autorNombre: string }

type OficioRow = {
  oficio: string
  zona: string | null
  trabajadores: {
    profile_id: string
    verificado: boolean
    puntos: number
    activo: boolean
    descripcion: string | null
    profiles: { nombre: string; zona: string | null } | null
  } | null
}

// Completa rating + cantidad de reseñas para cada trabajador (promedio de estrellas recibidas).
async function completarRatings(ws: Trabajador[]): Promise<void> {
  await Promise.all(
    ws.map(async (w) => {
      const { data } = await supabase.from('reviews').select('estrellas').eq('destinatario_id', w.id)
      if (data && data.length) {
        w.reviews = data.length
        w.rating = data.reduce((a, r) => a + (r.estrellas || 0), 0) / data.length
      }
    }),
  )
}

// Trabajadores activos que ofrecen un oficio, ordenados por puntos (luego rating).
export async function listarTrabajadores(oficio: string): Promise<Trabajador[]> {
  const { data, error } = await supabase
    .from('trabajador_oficios')
    .select(
      'oficio, zona, trabajadores!inner(profile_id, verificado, puntos, activo, descripcion, profiles!inner(nombre, zona))',
    )
    .ilike('oficio', oficio)
    .limit(200)
  if (error || !data) return []
  const bloqueados = new Set(await idsBloqueados())
  const out: Trabajador[] = []
  const seen = new Set<string>()
  for (const r of data as unknown as OficioRow[]) {
    const tr = r.trabajadores
    if (!tr || !tr.activo || seen.has(tr.profile_id) || bloqueados.has(tr.profile_id)) continue
    seen.add(tr.profile_id)
    out.push({
      id: tr.profile_id,
      nombre: tr.profiles?.nombre || 'Profesional',
      oficio: r.oficio,
      rating: 0,
      puntos: tr.puntos || 0,
      reviews: 0,
      verificado: !!tr.verificado,
      zona: r.zona || tr.profiles?.zona || null,
      dist: '',
    })
  }
  await completarRatings(out)
  return out.sort((a, b) => b.puntos - a.puntos || b.rating - a.rating)
}

// Profesionales destacados (cualquier oficio), para la home. Ordenados por puntos/rating.
export async function listarDestacados(limite = 8): Promise<Trabajador[]> {
  const { data, error } = await supabase
    .from('trabajador_oficios')
    .select(
      'oficio, zona, trabajadores!inner(profile_id, verificado, puntos, activo, descripcion, profiles!inner(nombre, zona))',
    )
    .limit(200)
  if (error || !data) return []
  const bloqueados = new Set(await idsBloqueados())
  const out: Trabajador[] = []
  const seen = new Set<string>()
  for (const r of data as unknown as OficioRow[]) {
    const tr = r.trabajadores
    if (!tr || !tr.activo || seen.has(tr.profile_id) || bloqueados.has(tr.profile_id)) continue
    seen.add(tr.profile_id)
    out.push({
      id: tr.profile_id,
      nombre: tr.profiles?.nombre || 'Profesional',
      oficio: r.oficio,
      rating: 0,
      puntos: tr.puntos || 0,
      reviews: 0,
      verificado: !!tr.verificado,
      zona: r.zona || tr.profiles?.zona || null,
      dist: '',
    })
  }
  await completarRatings(out)
  return out.sort((a, b) => b.puntos - a.puntos || b.rating - a.rating).slice(0, limite)
}

// Perfil completo de un trabajador + sus reseñas.
export async function getTrabajador(id: string): Promise<{ trabajador: Trabajador; reviews: Review[] } | null> {
  const { data } = await supabase
    .from('trabajadores')
    .select('profile_id, verificado, puntos, descripcion, profiles!inner(nombre, zona), trabajador_oficios(oficio)')
    .eq('profile_id', id)
    .maybeSingle()
  if (!data) return null
  const d = data as unknown as {
    profile_id: string
    verificado: boolean
    puntos: number
    descripcion: string | null
    profiles: { nombre: string; zona: string | null } | null
    trabajador_oficios: { oficio: string }[]
  }
  const { data: rev } = await supabase
    .from('reviews')
    .select('id, estrellas, comentario, creado_at, autor:profiles!autor_id(nombre)')
    .eq('destinatario_id', id)
    .order('creado_at', { ascending: false })
    .limit(30)
  const reviews: Review[] = (rev || []).map((r: Record<string, unknown>) => ({
    id: r.id as string,
    estrellas: r.estrellas as number,
    comentario: (r.comentario as string) ?? null,
    creado_at: r.creado_at as string,
    autorNombre: ((r.autor as { nombre?: string })?.nombre) || 'Cliente',
  }))
  const rating = reviews.length ? reviews.reduce((a, r) => a + r.estrellas, 0) / reviews.length : 0
  return {
    trabajador: {
      id: d.profile_id,
      nombre: d.profiles?.nombre || 'Profesional',
      oficio: (d.trabajador_oficios || []).map((o) => o.oficio).join(' · '),
      rating,
      puntos: d.puntos || 0,
      reviews: reviews.length,
      verificado: !!d.verificado,
      zona: d.profiles?.zona || null,
      dist: '',
      descripcion: d.descripcion,
    },
    reviews,
  }
}
