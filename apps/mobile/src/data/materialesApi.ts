import { supabase } from '../lib/supabase'

// Material tal como está en Supabase (cargado por el scraper).
export type Material = {
  id: string
  provincia: string
  proveedor: string // nombre del proveedor (Easy, EMI, corralón…)
  categoria: string | null
  subcategoria: string | null
  nombre: string
  precio: number
  unidad: string | null
  url: string | null
}

export function precioAr(n: number): string {
  return '$' + Math.round(n).toLocaleString('es-AR')
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
  proveedores: { nombre: string } | null
}

// Materiales filtrados por categoría normalizada y/o búsqueda.
export async function getMateriales(
  provincia: string,
  categoria: string | null,
  busqueda: string,
): Promise<Material[]> {
  let q = supabase
    .from('materiales')
    .select('id,provincia,categoria,subcategoria,nombre,precio,unidad,url,proveedores(nombre)')
    .eq('provincia', provincia)
  if (categoria) q = q.eq('categoria_norm', categoria)
  if (busqueda.trim()) q = q.ilike('nombre', `%${busqueda.trim()}%`)
  const { data, error } = await q.order('precio').limit(80)
  if (error || !data) return []
  return (data as unknown as Row[]).map((r) => ({
    id: r.id,
    provincia: r.provincia,
    proveedor: r.proveedores?.nombre ?? '',
    categoria: r.categoria,
    subcategoria: r.subcategoria,
    nombre: r.nombre,
    precio: r.precio,
    unidad: r.unidad,
    url: r.url,
  }))
}
