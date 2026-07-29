// Presupuestos guardados en el teléfono (AsyncStorage). El detalle de cada línea
// (ítem + análisis) se guarda tal cual lo arma PresupuestadorScreen.
import AsyncStorage from '@react-native-async-storage/async-storage'

const KEY = 'presup.guardados.v1'

export type PresupuestoGuardado<L = any> = {
  id: string
  nombre: string
  superficie: string
  fecha: string // ISO
  total: number
  lineas: L[]
}

export async function listarPresupuestos(): Promise<PresupuestoGuardado[]> {
  try {
    const raw = await AsyncStorage.getItem(KEY)
    const arr: PresupuestoGuardado[] = raw ? JSON.parse(raw) : []
    return arr.sort((a, b) => (a.fecha < b.fecha ? 1 : -1))
  } catch {
    return []
  }
}

// Inserta o actualiza (por id) y devuelve la lista resultante.
export async function guardarPresupuesto(p: PresupuestoGuardado): Promise<PresupuestoGuardado[]> {
  const lista = await listarPresupuestos()
  const i = lista.findIndex((x) => x.id === p.id)
  if (i >= 0) lista[i] = p
  else lista.unshift(p)
  await AsyncStorage.setItem(KEY, JSON.stringify(lista))
  return lista
}

export async function borrarPresupuesto(id: string): Promise<PresupuestoGuardado[]> {
  const lista = (await listarPresupuestos()).filter((x) => x.id !== id)
  await AsyncStorage.setItem(KEY, JSON.stringify(lista))
  return lista
}
