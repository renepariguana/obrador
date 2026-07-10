import React, { createContext, useContext, useState } from 'react'

// Zona seleccionada, compartida por toda la app (header, listas por ubicación).
type ZonaCtx = { zona: string; setZona: (z: string) => void }

const ZonaContext = createContext<ZonaCtx>({ zona: 'San Miguel de Tucumán', setZona: () => {} })

export function ZonaProvider({ children }: { children: React.ReactNode }) {
  const [zona, setZona] = useState('San Miguel de Tucumán')
  return <ZonaContext.Provider value={{ zona, setZona }}>{children}</ZonaContext.Provider>
}

export const useZona = () => useContext(ZonaContext)
