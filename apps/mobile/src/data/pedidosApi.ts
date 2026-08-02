import { supabase } from '../lib/supabase'
import { idsBloqueados } from './bloqueosApi'

export type EstadoPedido = 'abierto' | 'asignado' | 'completado' | 'cancelado'

export type Pedido = {
  id: string
  cliente_id: string
  oficio: string
  descripcion: string
  zona: string | null
  lat: number | null
  lng: number | null
  estado: EstadoPedido
  asignado_a: string | null
  creado_at: string
  fotos: string[]
}

// Cliente publica un pedido nuevo (estado 'abierto').
export async function publicarPedido(p: {
  oficio: string
  descripcion: string
  zona: string | null
  lat?: number | null
  lng?: number | null
  fotos?: string[]
}): Promise<{ error?: string; id?: string }> {
  const { data: auth } = await supabase.auth.getUser()
  if (!auth.user) return { error: 'Iniciá sesión para publicar' }
  // Privacidad: guardamos la ubicación ya aproximada (~100 m), nunca la exacta.
  // Nadie —ni con la anon key— puede leer la dirección real del cliente.
  let lat: number | null = null
  let lng: number | null = null
  if (p.lat != null && p.lng != null) [lat, lng] = aproximar(p.lat, p.lng)
  const { data, error } = await supabase
    .from('pedidos')
    .insert({
      cliente_id: auth.user.id,
      oficio: p.oficio,
      descripcion: p.descripcion,
      zona: p.zona,
      lat,
      lng,
      fotos: p.fotos ?? [],
      estado: 'abierto',
    })
    .select('id')
    .single()
  if (error) return { error: error.message }
  return { id: (data as { id: string }).id }
}

// Sube una imagen local (uri de expo-image-picker) al bucket 'pedidos'. Devuelve la URL pública.
export async function subirFotoPedido(uri: string): Promise<string | null> {
  const { data: auth } = await supabase.auth.getUser()
  if (!auth.user) return null
  try {
    const ext = (uri.split('.').pop() || 'jpg').toLowerCase().split('?')[0]
    const contentType = ext === 'png' ? 'image/png' : ext === 'webp' ? 'image/webp' : 'image/jpeg'
    const path = `${auth.user.id}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`
    const resp = await fetch(uri)
    const arrayBuffer = await resp.arrayBuffer()
    const { error } = await supabase.storage.from('pedidos').upload(path, arrayBuffer, { contentType })
    if (error) return null
    return supabase.storage.from('pedidos').getPublicUrl(path).data.publicUrl
  } catch {
    return null
  }
}

// Pedidos que publicó el usuario logueado.
export async function misPedidos(): Promise<Pedido[]> {
  const { data: auth } = await supabase.auth.getUser()
  if (!auth.user) return []
  const { data } = await supabase
    .from('pedidos')
    .select('*')
    .eq('cliente_id', auth.user.id)
    .order('creado_at', { ascending: false })
  return (data as Pedido[]) || []
}

// ─── Bolsa de trabajo (vista del trabajador) ───

// Vista lista para el mapa/carrusel de Trabajos.
export type PedidoVista = {
  id: string
  clienteId: string
  lat: number
  lng: number
  oficio: string
  desc: string
  cliente: string
  zona: string
  tag: string
  quote: string
  hace: string
  min: number
  urgente: boolean
  yaPostulado: boolean
  fotos: string[]
}

// Centroide aproximado de cada zona (mientras no haya geolocalización real → Tarea 7).
const CENTRO: Record<string, [number, number]> = {
  'San Miguel de Tucumán': [-26.8241, -65.2226],
  'Barrio Norte': [-26.83, -65.205],
  'Yerba Buena': [-26.813, -65.3168],
}
const CENTRO_DEFAULT: [number, number] = [-26.8241, -65.2226]

// Desplazamiento chico y determinístico por id, para que dos pedidos de la misma zona no se pisen.
function jitter(id: string): [number, number] {
  let h = 0
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) | 0
  const a = (Math.abs(h) % 1000) / 1000 - 0.5
  const b = (Math.abs(h >> 10) % 1000) / 1000 - 0.5
  return [a * 0.012, b * 0.012]
}

// PRIVACIDAD: al profesional no se le revela la ubicación exacta del pedido ajeno.
// Redondeamos las coordenadas a una grilla de ~100m (nivel manzana): se ve la cuadra
// aproximada, no la casa. La dirección exacta se comparte recién cuando se comunican.
const GRILLA = 0.001 // ≈ 100 m (una manzana)
function aproximar(lat: number, lng: number): [number, number] {
  return [Math.round(lat / GRILLA) * GRILLA, Math.round(lng / GRILLA) * GRILLA]
}

function haceDesde(iso: string): string {
  const min = Math.max(0, Math.floor((Date.now() - new Date(iso).getTime()) / 60000))
  if (min < 1) return 'recién'
  if (min < 60) return `hace ${min} min`
  const h = Math.floor(min / 60)
  if (h < 24) return `hace ${h} h`
  const d = Math.floor(h / 24)
  return `hace ${d} d`
}

// Pedidos abiertos (opcionalmente filtrados por oficios), listos para el mapa. Excluye los propios.
export async function pedidosAbiertos(oficios?: string[]): Promise<PedidoVista[]> {
  const { data: auth } = await supabase.auth.getUser()
  const uid = auth.user?.id
  const bloqueados = new Set(await idsBloqueados())
  let q = supabase
    .from('pedidos')
    .select('*, cliente:profiles!cliente_id(nombre), postulaciones(trabajador_id)')
    .eq('estado', 'abierto')
    .order('creado_at', { ascending: false })
  if (oficios && oficios.length) q = q.in('oficio', oficios)
  const { data, error } = await q
  if (error || !data) return []
  return (data as unknown as Array<
    Pedido & { cliente: { nombre: string } | null; postulaciones: { trabajador_id: string }[] }
  >)
    .filter((p) => p.cliente_id !== uid && !bloqueados.has(p.cliente_id))
    .map((p) => {
      const [blat, blng] = CENTRO[p.zona || ''] || CENTRO_DEFAULT
      const [dlat, dlng] = jitter(p.id)
      // Coords exactas → aproximadas (privacidad); sin coords → centroide de zona + jitter.
      const [lat, lng] =
        p.lat != null && p.lng != null ? aproximar(p.lat, p.lng) : [blat + dlat, blng + dlng]
      const primera = (p.descripcion || '').split('\n')[0].trim()
      return {
        id: p.id,
        clienteId: p.cliente_id,
        lat,
        lng,
        oficio: p.oficio,
        desc: primera.length > 50 ? primera.slice(0, 48) + '…' : primera,
        cliente: (p.cliente?.nombre || 'Cliente').split(' ')[0],
        zona: p.zona || 'Sin zona',
        tag: p.oficio,
        quote: primera,
        hace: haceDesde(p.creado_at),
        min: 11,
        urgente: (p.descripcion || '').includes('⚡ Urgente'),
        yaPostulado: (p.postulaciones || []).some((x) => x.trabajador_id === uid),
        fotos: (p as unknown as { fotos?: string[] }).fotos ?? [],
      }
    })
}

export type MiPostulacion = {
  pedidoId: string
  clienteId: string
  cliente: string
  oficio: string
  zona: string | null
  estadoPedido: EstadoPedido
  estadoPostulacion: EstadoPostulacion
  creado_at: string
}

// Los pedidos a los que me postulé (con el estado de mi postulación). Los rechazados cuyo pedido ya no es
// visible por RLS se omiten; se ven los pendientes (abierto) y los que gané (asignado a mí).
export async function misPostulaciones(): Promise<MiPostulacion[]> {
  const { data: auth } = await supabase.auth.getUser()
  if (!auth.user) return []
  const { data } = await supabase
    .from('postulaciones')
    .select('estado, creado_at, pedido:pedidos!pedido_id(id, oficio, zona, estado, cliente_id, cliente:profiles!cliente_id(nombre))')
    .eq('trabajador_id', auth.user.id)
    .order('creado_at', { ascending: false })
  return (
    (data as unknown as Array<{
      estado: EstadoPostulacion
      creado_at: string
      pedido: {
        id: string
        oficio: string
        zona: string | null
        estado: EstadoPedido
        cliente_id: string
        cliente: { nombre: string } | null
      } | null
    }>) || []
  )
    .filter((r) => r.pedido)
    .map((r) => ({
      pedidoId: r.pedido!.id,
      clienteId: r.pedido!.cliente_id,
      cliente: r.pedido!.cliente?.nombre || 'Cliente',
      oficio: r.pedido!.oficio,
      zona: r.pedido!.zona,
      estadoPedido: r.pedido!.estado,
      estadoPostulacion: r.estado,
      creado_at: r.creado_at,
    }))
}

// El trabajador se postula a un pedido. UNIQUE(pedido_id, trabajador_id) evita duplicados.
export async function postularse(pedidoId: string, mensaje?: string): Promise<{ error?: string }> {
  const { data: auth } = await supabase.auth.getUser()
  if (!auth.user) return { error: 'Iniciá sesión para postularte' }
  const { error } = await supabase.from('postulaciones').insert({
    pedido_id: pedidoId,
    trabajador_id: auth.user.id,
    mensaje: mensaje || null,
  })
  if (error) {
    if (error.code === '23505') return { error: 'Ya te postulaste a este pedido' }
    return { error: error.message }
  }
  return {}
}

// ─── Gestión del pedido (vista del cliente dueño) ───

export type EstadoPostulacion = 'postulado' | 'elegido' | 'rechazado'

export type Postulacion = {
  id: string
  trabajador_id: string
  nombre: string
  telefono: string | null
  whatsapp: string | null
  mensaje: string | null
  estado: EstadoPostulacion
  creado_at: string
}

// Postulaciones de un pedido (solo las ve el dueño del pedido, por RLS).
export async function postulacionesDe(pedidoId: string): Promise<Postulacion[]> {
  const { data } = await supabase
    .from('postulaciones')
    .select('id, trabajador_id, mensaje, estado, creado_at, trabajador:profiles!trabajador_id(nombre,telefono,whatsapp)')
    .eq('pedido_id', pedidoId)
    .order('creado_at', { ascending: true })
  return (
    (data as unknown as Array<{
      id: string
      trabajador_id: string
      mensaje: string | null
      estado: EstadoPostulacion
      creado_at: string
      trabajador: { nombre: string | null; telefono: string | null; whatsapp: string | null } | null
    }>) || []
  ).map((p) => ({
    id: p.id,
    trabajador_id: p.trabajador_id,
    nombre: p.trabajador?.nombre || 'Profesional',
    telefono: p.trabajador?.telefono || null,
    whatsapp: p.trabajador?.whatsapp || null,
    mensaje: p.mensaje,
    estado: p.estado,
    creado_at: p.creado_at,
  }))
}

// El cliente elige un postulante: pedido → 'asignado', esa postulación → 'elegido', las demás → 'rechazado'.
export async function elegir(pedidoId: string, postulacionId: string, trabajadorId: string): Promise<{ error?: string }> {
  const { error: e1 } = await supabase
    .from('pedidos')
    .update({ estado: 'asignado', asignado_a: trabajadorId })
    .eq('id', pedidoId)
  if (e1) return { error: e1.message }
  const { error: e2 } = await supabase.from('postulaciones').update({ estado: 'elegido' }).eq('id', postulacionId)
  if (e2) return { error: e2.message }
  await supabase.from('postulaciones').update({ estado: 'rechazado' }).eq('pedido_id', pedidoId).neq('id', postulacionId)
  return {}
}

// El cliente marca el pedido como terminado.
export async function completarPedido(pedidoId: string): Promise<{ error?: string }> {
  const { error } = await supabase.from('pedidos').update({ estado: 'completado' }).eq('id', pedidoId)
  return error ? { error: error.message } : {}
}
