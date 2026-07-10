import { supabase } from '../lib/supabase'

// Material tal como está en Supabase (cargado por el scraper Easy/EMI).
export type Material = {
  id: string
  provincia: string
  fuente: 'easy' | 'emi'
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

// Categorías disponibles en una provincia (para los chips).
export async function getCategorias(provincia: string): Promise<string[]> {
  const { data, error } = await supabase
    .from('materiales')
    .select('categoria')
    .eq('provincia', provincia)
    .not('categoria', 'is', null)
    .limit(3000)
  if (error || !data) return []
  const set = new Set<string>()
  data.forEach((r: { categoria: string | null }) => r.categoria && set.add(r.categoria))
  return Array.from(set).sort((a, b) => a.localeCompare(b, 'es'))
}

// Materiales filtrados por categoría y/o búsqueda, ordenados por nombre.
export async function getMateriales(
  provincia: string,
  categoria: string | null,
  busqueda: string,
): Promise<Material[]> {
  let q = supabase.from('materiales').select('*').eq('provincia', provincia)
  if (categoria) q = q.eq('categoria', categoria)
  if (busqueda.trim()) q = q.ilike('nombre', `%${busqueda.trim()}%`)
  const { data, error } = await q.order('nombre').limit(80)
  if (error || !data) return []
  return data as Material[]
}
