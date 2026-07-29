// Presupuestador — consume el Apps Script de LOG arquitectura (endpoints públicos, sin login)
// y aplica la cascada de precios. Ver memoria [[project-obrador-presupuestador-port]].
import AsyncStorage from '@react-native-async-storage/async-storage'

const CACHE_ITEMS = 'presup.items.v1'
const CACHE_CASCADA = 'presup.cascada.v1'

const SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbwyP241qqjfn_qWhIlFskrETqyK-BRBV_8QqEZaZMqdBd2zo_lrFdq82VuG5_1LhQ8L/exec'

export type RubroAP = { codigo: string; nombre: string }
export type ItemAP = { codigo: string; nombre: string; unidad: string; precio: number; rubroId: string }
export type CompAP = { nombre: string; unidad: string; cantidad: number; precio: number }
export type AnalisisAP = { materiales: CompAP[]; manoobra: CompAP[]; equipos: CompAP[] }
export type ManoObra = { nombre: string; unidad: string; precio: number }

export type Cascada = {
  gastosGenerales: number
  beneficios: number
  costoFinanciero: number
  iva: number
  ingresosBrutos: number
  impMunicipales: number
  impDebitoCredito: number
}

// Cascada base por defecto (por si el endpoint no responde): coincide con los % típicos de LOG.
export const CASCADA_DEFAULT: Cascada = {
  gastosGenerales: 0.15,
  beneficios: 0.1,
  costoFinanciero: 0.0235,
  iva: 0.21,
  ingresosBrutos: 0,
  impMunicipales: 0,
  impDebitoCredito: 0,
}

async function apGet(action: string, extra = ''): Promise<any> {
  const res = await fetch(`${SCRIPT_URL}?action=${action}${extra}`)
  return res.json()
}

// Rubros e ítems del análisis de precios (base LOG). Devuelve vacío si falla.
export async function getItemsAP(): Promise<{ rubros: RubroAP[]; items: ItemAP[] }> {
  try {
    const j = await apGet('items')
    const data = { rubros: j.rubros || [], items: j.items || [] }
    if (data.items.length) AsyncStorage.setItem(CACHE_ITEMS, JSON.stringify(data)).catch(() => {})
    return data
  } catch {
    return { rubros: [], items: [] }
  }
}

// Cache local (para mostrar al toque mientras se refresca de la red).
export async function getItemsCache(): Promise<{ rubros: RubroAP[]; items: ItemAP[] } | null> {
  try {
    const raw = await AsyncStorage.getItem(CACHE_ITEMS)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

// Porcentajes de la cascada (gastos generales, beneficios, etc.).
export async function getCascada(): Promise<Cascada> {
  try {
    const j = await apGet('cascada')
    const data = { ...CASCADA_DEFAULT, ...j }
    AsyncStorage.setItem(CACHE_CASCADA, JSON.stringify(data)).catch(() => {})
    return data
  } catch {
    return CASCADA_DEFAULT
  }
}

export async function getCascadaCache(): Promise<Cascada | null> {
  try {
    const raw = await AsyncStorage.getItem(CACHE_CASCADA)
    return raw ? { ...CASCADA_DEFAULT, ...JSON.parse(raw) } : null
  } catch {
    return null
  }
}

// Mano de obra: categorías UOCRA con su precio unitario ($/Hs) según la zona (Tucumán = 'A').
export async function getManoObra(zona = 'A'): Promise<ManoObra[]> {
  const key = 'presup.mo.' + zona + '.v1'
  try {
    const j = await apGet('manoobra', `&zona=${zona}`)
    const cats: ManoObra[] = j.categorias || []
    if (cats.length) AsyncStorage.setItem(key, JSON.stringify(cats)).catch(() => {})
    return cats
  } catch {
    return []
  }
}

export async function getManoObraCache(zona = 'A'): Promise<ManoObra[] | null> {
  try {
    const raw = await AsyncStorage.getItem('presup.mo.' + zona + '.v1')
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

// Análisis de precios de un ítem: desglose de materiales, mano de obra y equipos.
// Se cachea por código (es lento) y se refresca en segundo plano.
export async function getAnalisisItem(codigo: string, nombre: string): Promise<AnalisisAP | null> {
  const key = 'presup.analisis.' + codigo
  try {
    const j = await apGet('analisisitem', `&codigo=${encodeURIComponent(codigo)}&nombre=${encodeURIComponent(nombre)}`)
    if (j && (j.materiales || j.manoobra || j.equipos)) {
      const data: AnalisisAP = { materiales: j.materiales || [], manoobra: j.manoobra || [], equipos: j.equipos || [] }
      AsyncStorage.setItem(key, JSON.stringify(data)).catch(() => {})
      return data
    }
    return null
  } catch {
    try {
      const raw = await AsyncStorage.getItem(key)
      return raw ? JSON.parse(raw) : null
    } catch {
      return null
    }
  }
}

export async function getAnalisisCache(codigo: string): Promise<AnalisisAP | null> {
  try {
    const raw = await AsyncStorage.getItem('presup.analisis.' + codigo)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

// Transforma el costo base de un ítem en precio final aplicando la cascada.
//   sub1 = base * (1 + gastosGenerales)
//   sub2 = sub1 * (1 + beneficios + costoFinanciero)
//   final = sub2 * (1 + iva + ingresosBrutos + impMunicipales + impDebitoCredito)
export function calcCascada(base: number, c: Cascada): number {
  const sub1 = base * (1 + c.gastosGenerales)
  const sub2 = sub1 * (1 + c.beneficios + c.costoFinanciero)
  return sub2 * (1 + c.iva + c.ingresosBrutos + c.impMunicipales + c.impDebitoCredito)
}

// Formato $ argentino.
export function pesos(n: number): string {
  return '$' + Math.round(n).toLocaleString('es-AR')
}
