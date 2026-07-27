import React, { createContext, useContext, useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

// Una dirección guardada del usuario (estilo PedidosYa). Se persiste en el teléfono.
export type Direccion = { id: string; label: string; detalle?: string; lat: number; lng: number }

type ZonaCtx = {
  zona: string // label de la dirección activa (compat con el código existente)
  setZona: (z: string) => void // compat (fallback sin dirección activa)
  direcciones: Direccion[]
  activa: Direccion | null
  elegir: (id: string) => void
  agregar: (d: Omit<Direccion, 'id'>) => Direccion
  eliminar: (id: string) => void
}

const DEFAULT_ZONA = 'San Miguel de Tucumán'
const KEY_LISTA = 'obrador.direcciones.v1'
const KEY_ACTIVA = 'obrador.direccion.activa.v1'

const ZonaContext = createContext<ZonaCtx>({
  zona: DEFAULT_ZONA,
  setZona: () => {},
  direcciones: [],
  activa: null,
  elegir: () => {},
  agregar: () => ({ id: '', label: DEFAULT_ZONA, lat: 0, lng: 0 }),
  eliminar: () => {},
})

export function ZonaProvider({ children }: { children: React.ReactNode }) {
  const [direcciones, setDirecciones] = useState<Direccion[]>([])
  const [activaId, setActivaId] = useState<string | null>(null)
  const [zonaManual, setZonaManual] = useState(DEFAULT_ZONA)

  // Cargar direcciones guardadas al iniciar.
  useEffect(() => {
    ;(async () => {
      try {
        const [raw, act] = await Promise.all([
          AsyncStorage.getItem(KEY_LISTA),
          AsyncStorage.getItem(KEY_ACTIVA),
        ])
        if (raw) setDirecciones(JSON.parse(raw))
        if (act) setActivaId(act)
      } catch {}
    })()
  }, [])

  const persistir = (ds: Direccion[]) =>
    AsyncStorage.setItem(KEY_LISTA, JSON.stringify(ds)).catch(() => {})
  const persistirActiva = (id: string | null) =>
    (id ? AsyncStorage.setItem(KEY_ACTIVA, id) : AsyncStorage.removeItem(KEY_ACTIVA)).catch(() => {})

  const agregar = (d: Omit<Direccion, 'id'>): Direccion => {
    const nueva: Direccion = { ...d, id: String(Date.now()) }
    const ds = [nueva, ...direcciones]
    setDirecciones(ds)
    persistir(ds)
    setActivaId(nueva.id)
    persistirActiva(nueva.id)
    return nueva
  }

  const elegir = (id: string) => {
    setActivaId(id)
    persistirActiva(id)
  }

  const eliminar = (id: string) => {
    const ds = direcciones.filter((x) => x.id !== id)
    setDirecciones(ds)
    persistir(ds)
    if (activaId === id) {
      setActivaId(null)
      persistirActiva(null)
    }
  }

  const activa = direcciones.find((d) => d.id === activaId) ?? null
  const zona = activa?.label ?? zonaManual

  return (
    <ZonaContext.Provider
      value={{ zona, setZona: setZonaManual, direcciones, activa, elegir, agregar, eliminar }}
    >
      {children}
    </ZonaContext.Provider>
  )
}

export const useZona = () => useContext(ZonaContext)
