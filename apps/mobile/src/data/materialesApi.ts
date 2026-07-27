import { supabase } from '../lib/supabase'

export type UnidadBase = 'L' | 'Kg' | 'm²' | 'm³' | 'm' | 'u' | 'gl'

// Material tal como está en Supabase (cargado por el scraper).
export type Material = {
  id: string
  provincia: string
  proveedor: string // nombre del proveedor (Easy, EMI, corralón…)
  categoria: string | null
  subcategoria: string | null
  nombre: string
  precio: number // precio del envase/presentación
  unidad: string | null
  url: string | null
  // Derivados (parseados del nombre para el comparador):
  cantidad: number // tamaño del envase (20, 4, 1…)
  unidadBase: UnidadBase // L, Kg, m², m³ o u
  precioBase: number // precio ÷ cantidad → así compara el comparador
  // De TU clasificación (Sheet Manos):
  subcatApp?: string | null
  marca?: string | null
  // Extra scrapeado (para el desplegable de detalle):
  descripcion?: string | null
  sku?: string | null
  imagen?: string | null
}

export function precioAr(n: number): string {
  return '$' + Math.round(n).toLocaleString('es-AR')
}

// Muestra categorías/rubros uniformes: primera letra mayúscula, resto minúscula
// (sin importar si están guardadas "CONSTRUCCIÓN" o "construccion").
export function sentenceCase(s: string): string {
  const t = (s || '').trim()
  return t ? t.charAt(0).toUpperCase() + t.slice(1).toLowerCase() : t
}

// Precio por unidad de medida, listo para mostrar: "$2.372/L"
export function precioBaseAr(m: Material): string {
  return precioAr(m.precioBase) + '/' + m.unidadBase
}

const pf = (s: string) => parseFloat(s.replace(',', '.')) || 1

// El AGENTE mira el nombre del producto y saca su unidad + cantidad (la presentación).
// Si no encuentra una medida clara → 'u' (por unidad).
export function parseUnidad(nombre: string): { cantidad: number; unidadBase: UnidadBase } {
  const t = nombre.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
  let m: RegExpMatchArray | null
  if ((m = t.match(/(\d+(?:[.,]\d+)?)\s*(?:litros?|lts?|l)(?![a-z0-9])/))) return { cantidad: pf(m[1]), unidadBase: 'L' }
  if ((m = t.match(/(\d+(?:[.,]\d+)?)\s*(?:ml|cc)(?![a-z0-9])/))) return { cantidad: pf(m[1]) / 1000, unidadBase: 'L' }
  if ((m = t.match(/(\d+(?:[.,]\d+)?)\s*(?:kg|kilos?)(?![a-z0-9])/))) return { cantidad: pf(m[1]), unidadBase: 'Kg' }
  if ((m = t.match(/(\d+(?:[.,]\d+)?)\s*(?:m3|m³)(?![a-z0-9])/))) return { cantidad: pf(m[1]), unidadBase: 'm³' }
  if ((m = t.match(/(\d+(?:[.,]\d+)?)\s*(?:m2|m²)(?![a-z0-9])/))) return { cantidad: pf(m[1]), unidadBase: 'm²' }
  // ¿tiene 3 medidas (secc. x secc. x largo, típico de maderas)? → no sirve para área/largo
  const tresPartes = /\d\s*x\s*\d+(?:[.,]\d+)?\s*x\s*\d/.test(t)
  if (!tresPartes) {
    // dimensiones "NxM Mts" → área m²
    if ((m = t.match(/(\d+(?:[.,]\d+)?)\s*x\s*(\d+(?:[.,]\d+)?)\s*(?:mts?|metros?)(?![a-z0-9])/)))
      return { cantidad: pf(m[1]) * pf(m[2]), unidadBase: 'm²' }
    // largo lineal "N Mts"
    if ((m = t.match(/(\d+(?:[.,]\d+)?)\s*(?:mts?|metros?)(?![a-z0-9])/))) return { cantidad: pf(m[1]), unidadBase: 'm' }
  }
  return { cantidad: 1, unidadBase: 'u' }
}

// Categorías NORMALIZADAS disponibles en una provincia (nuestra taxonomía común).
export async function getCategorias(provincia: string): Promise<string[]> {
  const { data, error } = await supabase
    .from('materiales')
    .select('categoria_norm')
    .eq('provincia', provincia)
    .not('categoria_norm', 'is', null)
    .limit(5000)
  if (error || !data) return []
  const set = new Set<string>()
  data.forEach((r: { categoria_norm: string | null }) => r.categoria_norm && set.add(r.categoria_norm))
  return Array.from(set).sort((a, b) => a.localeCompare(b, 'es'))
}

type Row = {
  id: string
  provincia: string
  categoria: string | null
  subcategoria: string | null
  nombre: string
  precio: number
  unidad: string | null
  url: string | null
  descripcion: string | null
  sku: string | null
  imagen: string | null
  proveedores: { nombre: string } | null
}

// Supabase corta en 1000 filas por request. Para escaneos completos (proveedores, taxonomía)
// paginamos con .range() hasta traer todo. `build` debe crear una query NUEVA en cada llamada.
type Rangeable<T> = { range: (from: number, to: number) => PromiseLike<{ data: T[] | null; error: unknown }> }
async function fetchAllRows<T>(build: () => Rangeable<T>): Promise<T[]> {
  const PAGE = 1000
  const out: T[] = []
  for (let from = 0; ; from += PAGE) {
    const { data, error } = await build().range(from, from + PAGE - 1)
    if (error || !data || data.length === 0) break
    out.push(...data)
    if (data.length < PAGE) break
  }
  return out
}

// Materiales filtrados por categoría normalizada y/o búsqueda.
export async function getMateriales(
  provincia: string,
  categoria: string | null,
  busqueda: string,
): Promise<Material[]> {
  let q = supabase
    .from('materiales')
    .select('id,provincia,categoria,subcategoria,nombre,precio,unidad,url,descripcion,sku,imagen,proveedores(nombre)')
    .eq('provincia', provincia)
  if (categoria) q = q.eq('categoria_norm', categoria)
  if (busqueda.trim()) q = q.ilike('nombre', `%${busqueda.trim()}%`)
  const { data, error } = await q.order('precio').limit(200)
  if (error || !data) return []
  const mats = (data as unknown as Row[]).map((r) => {
    const { cantidad, unidadBase } = parseUnidad(r.nombre)
    return {
      id: r.id,
      provincia: r.provincia,
      proveedor: r.proveedores?.nombre ?? '',
      categoria: r.categoria,
      subcategoria: r.subcategoria,
      nombre: r.nombre,
      precio: r.precio,
      unidad: r.unidad,
      url: r.url,
      cantidad,
      unidadBase,
      precioBase: r.precio / cantidad,
    }
  })
  // Comparador: más barato por unidad de medida primero.
  return mats.sort((a, b) => a.precioBase - b.precioBase)
}

function mapRow(r: Row): Material {
  const { cantidad, unidadBase } = parseUnidad(r.nombre)
  return {
    id: r.id,
    provincia: r.provincia,
    proveedor: r.proveedores?.nombre ?? '',
    categoria: r.categoria,
    subcategoria: r.subcategoria,
    nombre: r.nombre,
    precio: r.precio,
    unidad: r.unidad,
    url: r.url,
    cantidad,
    unidadBase,
    precioBase: r.precio / cantidad,
  }
}

const _norm = (x: string) => x.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
const _esc = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

// Match por PALABRA COMPLETA (sin tildes): "látex" matchea "Látex interior" pero NO "Anclatex".
export function matchKeyword(nombre: string, term: string): boolean {
  return new RegExp(`\\b${_esc(_norm(term))}\\b`, 'i').test(_norm(nombre))
}

// Clasificador por reglas: pertenece a la subcategoría si matchea alguna keyword Y ninguna exclusión.
export type SubDef = { terms: string[]; excluir: string[]; unidad: UnidadBase; cantidad: number }
export function matchSub(nombre: string, sub: SubDef): boolean {
  if (sub.excluir.some((e) => matchKeyword(nombre, e))) return false
  return sub.terms.some((t) => matchKeyword(nombre, t))
}

const QTY = /\d+(?:[.,]\d+)?\s*(?:litros?|lts?|l|kg|kilos?|ml|cc|m2|m3|mts?)\b/gi
// Clave de ítem sin la cantidad → agrupa el mismo ítem entre proveedores (Ferretería, por pieza).
function baseKey(nombre: string): string {
  return _norm(nombre).replace(QTY, ' ').replace(/[.,]/g, ' ').replace(/\s+/g, ' ').trim()
}
function sinCantidad(nombre: string): string {
  return nombre.replace(QTY, ' ').replace(/\s+,/g, ',').replace(/\s{2,}/g, ' ').trim()
}

// ---- La app lee TU clasificación (pestaña Materiales de Manos, sincronizada a Supabase) ----
const _pf = (s: string) => parseFloat(String(s).replace(',', '.')) || 0

// Extrae la cantidad en la unidad objetivo desde la descripción/nombre. null si no la encuentra.
export function extraerCantidad(texto: string, unidad: UnidadBase): number | null {
  const t = _norm(texto)
  const vals = (re: string) => {
    const o: number[] = []
    let x: RegExpExecArray | null
    const g = new RegExp(re, 'gi')
    while ((x = g.exec(t))) o.push(_pf(x[1]))
    return o.filter((n) => n > 0)
  }
  if (unidad === 'm') {
    const v = vals('(\\d[\\d.,]*)\\s*(?:mts?|metros?|m)(?![a-z0-9²³])')
    return v.length ? Math.max(...v) : null
  }
  if (unidad === 'm²') {
    let x: RegExpExecArray | null
    const g = /(\d[\d.,]*)\s*x\s*(\d[\d.,]*)\s*(?:mts?|metros?|m)(?![a-z0-9²³])/gi
    const a: number[] = []
    while ((x = g.exec(t))) a.push(_pf(x[1]) * _pf(x[2]))
    if (a.length) return Math.max(...a)
    const e = vals('(\\d[\\d.,]*)\\s*m[²2](?![0-9])')
    return e.length ? Math.max(...e) : null
  }
  if (unidad === 'm³') {
    const v = vals('(\\d[\\d.,]*)\\s*m[³3](?![0-9])')
    return v.length ? Math.max(...v) : null
  }
  if (unidad === 'Kg') {
    const v = vals('(\\d[\\d.,]*)\\s*(?:kg|kilos?)(?![a-z])')
    return v.length ? Math.max(...v) : null
  }
  if (unidad === 'L') {
    const v = vals('(\\d[\\d.,]*)\\s*(?:litros?|lts?|l)(?![a-z0-9])')
    return v.length ? Math.max(...v) : null
  }
  return null
}

export type CatApp = { nombre: string; subs: string[] }
// Taxonomía = categorías/subcategorías NATIVAS de cada página (columnas categoria/subcategoria de Supabase,
// que el scraper trae de 2 niveles de atrás para adelante). La app agrupa por las categorías reales del sitio.
type TaxRow = { categoria: string | null; subcategoria: string | null }
export async function getTaxonomiaApp(provincia: string): Promise<CatApp[]> {
  const data = await fetchAllRows<TaxRow>(() =>
    supabase.from('materiales').select('categoria,subcategoria,proveedores!inner(visible_app)').eq('provincia', provincia).eq('activo', true).eq('proveedores.visible_app', true).not('categoria', 'is', null) as unknown as Rangeable<TaxRow>,
  )
  const map = new Map<string, Set<string>>()
  data.forEach((r) => {
    if (!r.categoria) return
    if (!map.has(r.categoria)) map.set(r.categoria, new Set())
    if (r.subcategoria) map.get(r.categoria)!.add(r.subcategoria)
  })
  return [...map.entries()]
    .map(([nombre, subs]) => ({ nombre, subs: [...subs].sort((a, b) => a.localeCompare(b, 'es')) }))
    .sort((a, b) => a.nombre.localeCompare(b.nombre, 'es'))
}

// Productos de una categoría/subcategoría nativa, con $/unidad (la unidad se deriva del nombre).
export async function getMaterialesApp(
  provincia: string,
  categoria: string,
  subcategoria: string | null,
  busqueda: string,
): Promise<Material[]> {
  let q = supabase
    .from('materiales')
    .select('id,provincia,categoria,subcategoria,nombre,precio,unidad,url,descripcion,sku,imagen,proveedores!inner(nombre)')
    .eq('provincia', provincia)
    .eq('activo', true)
    .eq('proveedores.visible_app', true)
    .eq('categoria', categoria)
  if (subcategoria) q = q.eq('subcategoria', subcategoria)
  if (busqueda.trim()) q = q.ilike('nombre', `%${busqueda.trim()}%`)
  const { data, error } = await q.limit(300)
  if (error || !data) return []
  return (data as unknown as Row[])
    .map((r) => {
      const { cantidad, unidadBase } = parseUnidad(r.nombre)
      return {
        id: r.id,
        provincia: r.provincia,
        proveedor: r.proveedores?.nombre ?? '',
        categoria: r.categoria,
        subcategoria: r.subcategoria,
        nombre: r.nombre,
        precio: r.precio,
        unidad: r.unidad,
        url: r.url,
        cantidad,
        unidadBase,
        precioBase: r.precio / cantidad,
        subcatApp: r.subcategoria,
        marca: null,
        descripcion: r.descripcion ?? null,
        sku: r.sku ?? null,
        imagen: r.imagen ?? null,
      }
    })
    // Comparador: más barato por unidad primero; los SIN precio (0) van al final.
    .sort((a, b) => {
      if (a.precio > 0 !== b.precio > 0) return a.precio > 0 ? -1 : 1
      return a.precioBase - b.precioBase
    })
}

// ---- Catálogo de UN proveedor (para la ficha del mapa) ----

// Proveedores que scrapeamos: nombre normalizado (como aparece en el mapa) → slug de Supabase.
// Solo aplican en su provincia de scrapeo (Tucumán por ahora).
const SCRAPEADOS: Record<string, string> = { easy: 'easy', emi: 'emi', maderplak: 'maderplak' }
const _n = (s: string) => (s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').trim()

// Si este proveedor del mapa (nombre + provincia) lo scrapeamos, devuelve su slug; si no, null.
export function slugScrapeado(proveedor: string, provincia: string): string | null {
  if (_n(provincia) !== 'tucuman') return null
  return SCRAPEADOS[_n(proveedor)] ?? null
}

// Proveedores que tienen productos (para el filtro de la tab Materiales).
// Provincias que tienen productos activos (para el selector de provincia de la tab Materiales).
export async function getProvincias(): Promise<string[]> {
  const rows = await fetchAllRows<{ provincia: string | null }>(() =>
    supabase.from('materiales').select('provincia,proveedores!inner(visible_app)').eq('activo', true).eq('proveedores.visible_app', true) as unknown as Rangeable<{ provincia: string | null }>,
  )
  const set = new Set<string>()
  rows.forEach((r) => r.provincia && set.add(r.provincia))
  return [...set].sort((a, b) => a.localeCompare(b, 'es'))
}

export async function getProveedores(provincia: string): Promise<{ nombre: string; slug: string; logo: string | null }[]> {
  const rows = await fetchAllRows<{ proveedores: { nombre: string; slug: string; logo_url: string | null } | null }>(() =>
    supabase.from('materiales').select('proveedores!inner(nombre,slug,visible_app,logo_url)').eq('provincia', provincia).eq('activo', true).eq('proveedores.visible_app', true) as unknown as Rangeable<{ proveedores: { nombre: string; slug: string; logo_url: string | null } | null }>,
  )
  const map = new Map<string, { nombre: string; logo: string | null }>()
  rows.forEach((r) => {
    const p = r.proveedores
    if (p?.slug) map.set(p.slug, { nombre: p.nombre, logo: p.logo_url })
  })
  return [...map.entries()]
    .map(([slug, v]) => ({ slug, nombre: v.nombre, logo: v.logo }))
    .sort((a, b) => a.nombre.localeCompare(b.nombre, 'es'))
}

async function _proveedorId(slug: string): Promise<string | null> {
  const { data } = await supabase.from('proveedores').select('id').eq('slug', slug).single()
  return (data as { id: string } | null)?.id ?? null
}

// Taxonomía nativa (categoría/subcategoría) de un proveedor puntual.
export async function getTaxonomiaProveedor(provincia: string, slug: string): Promise<CatApp[]> {
  const id = await _proveedorId(slug)
  if (!id) return []
  const data = await fetchAllRows<TaxRow>(() =>
    supabase.from('materiales').select('categoria,subcategoria').eq('provincia', provincia).eq('proveedor_id', id).eq('activo', true).not('categoria', 'is', null) as unknown as Rangeable<TaxRow>,
  )
  const map = new Map<string, Set<string>>()
  data.forEach((r) => {
    if (!r.categoria) return
    if (!map.has(r.categoria)) map.set(r.categoria, new Set())
    if (r.subcategoria) map.get(r.categoria)!.add(r.subcategoria)
  })
  return [...map.entries()]
    .map(([nombre, subs]) => ({ nombre, subs: [...subs].sort((a, b) => a.localeCompare(b, 'es')) }))
    .sort((a, b) => a.nombre.localeCompare(b.nombre, 'es'))
}

// Productos de una categoría/subcategoría de UN proveedor.
export async function getMaterialesProveedor(
  provincia: string,
  slug: string,
  categoria: string,
  subcategoria: string | null,
  busqueda: string,
): Promise<Material[]> {
  const id = await _proveedorId(slug)
  if (!id) return []
  let q = supabase
    .from('materiales')
    .select('id,provincia,categoria,subcategoria,nombre,precio,unidad,url,descripcion,sku,imagen,proveedores(nombre)')
    .eq('provincia', provincia)
    .eq('proveedor_id', id)
    .eq('activo', true)
    .eq('categoria', categoria)
  if (subcategoria) q = q.eq('subcategoria', subcategoria)
  if (busqueda.trim()) q = q.ilike('nombre', `%${busqueda.trim()}%`)
  const { data, error } = await q.limit(300)
  if (error || !data) return []
  return (data as unknown as Row[])
    .map((r) => {
      const { cantidad, unidadBase } = parseUnidad(r.nombre)
      return {
        id: r.id,
        provincia: r.provincia,
        proveedor: r.proveedores?.nombre ?? '',
        categoria: r.categoria,
        subcategoria: r.subcategoria,
        nombre: r.nombre,
        precio: r.precio,
        unidad: r.unidad,
        url: r.url,
        cantidad,
        unidadBase,
        precioBase: r.precio / cantidad,
        subcatApp: r.subcategoria,
        marca: null,
        descripcion: r.descripcion ?? null,
        sku: r.sku ?? null,
        imagen: r.imagen ?? null,
      }
    })
    // Alfabético, pero los SIN precio (0) al final.
    .sort((a, b) => {
      if (a.precio > 0 !== b.precio > 0) return a.precio > 0 ? -1 : 1
      return a.nombre.localeCompare(b.nombre, 'es')
    })
}

// ---- Comparador: adapta el agrupado según la unidad ----
// Medido (L/Kg/m²): agrupa por (categoría · tamaño). Por pieza (u): agrupa por ítem.
// Dentro de cada grupo compara proveedores, el más barato primero.
export type GrupoComparativo = {
  key: string
  titulo: string
  cat: string // categoría (subcategoría en tu vocabulario) a la que pertenece el grupo
  medido: boolean // true = por unidad de medida ($/L); false = por pieza ($/u)
  opciones: Material[]
}

// Agrupa por SUBCATEGORÍA (no por tamaño). Dentro, lista los productos ordenados por precio/unidad.
export function agruparComparativo(mats: Material[], etiqueta: (m: Material) => string): GrupoComparativo[] {
  const map = new Map<string, GrupoComparativo>()
  for (const m of mats) {
    const lab = etiqueta(m)
    const k = lab || '(sin)'
    let g = map.get(k)
    if (!g) {
      g = { key: k, titulo: lab, cat: lab, medido: m.unidadBase !== 'u', opciones: [] }
      map.set(k, g)
    }
    g.opciones.push(m)
  }
  const grupos = Array.from(map.values())
  grupos.forEach((g) => g.opciones.sort((a, b) => a.precioBase - b.precioBase))
  return grupos
}

// Materiales que matchean alguna de las keywords (por nombre). Base del modelo por keyword.
export async function getMaterialesPorKeywords(
  provincia: string,
  subs: SubDef[],
  busqueda: string,
): Promise<Material[]> {
  const terms = subs.flatMap((s) => s.terms)
  if (terms.length === 0) return []
  let q = supabase
    .from('materiales')
    .select('id,provincia,categoria,subcategoria,nombre,precio,unidad,url,descripcion,sku,imagen,proveedores(nombre)')
    .eq('provincia', provincia)
    .or(terms.map((t) => `nombre.ilike.*${t}*`).join(','))
  if (busqueda.trim()) q = q.ilike('nombre', `%${busqueda.trim()}%`)
  const { data, error } = await q.limit(200)
  if (error || !data) return []
  return (data as unknown as Row[])
    // Clasificador por reglas: keyword (palabra completa) Y sin exclusiones.
    .filter((r) => subs.some((s) => matchSub(r.nombre, s)))
    .map((r) => {
      const p = parseUnidad(r.nombre)
      const sub = subs.find((s) => matchSub(r.nombre, s))
      let cantidad = p.cantidad
      let unidadBase = p.unidadBase
      // Si el producto no trae medida, uso la unidad + cantidad estándar de la subcategoría.
      if (unidadBase === 'u' && sub && sub.unidad !== 'u') {
        unidadBase = sub.unidad
        cantidad = sub.cantidad || 1
      }
      return {
        id: r.id,
        provincia: r.provincia,
        proveedor: r.proveedores?.nombre ?? '',
        categoria: r.categoria,
        subcategoria: r.subcategoria,
        nombre: r.nombre,
        precio: r.precio,
        unidad: r.unidad,
        url: r.url,
        cantidad,
        unidadBase,
        precioBase: r.precio / cantidad,
      }
    })
    .sort((a, b) => a.precioBase - b.precioBase)
}
