import React, { createContext, useContext, useState } from 'react'

// Flujo de arranque: ubicación (primera pantalla) → login (opcional) → app.
// Por ahora es simulado (mock): al conectar Supabase Auth, ingresar() se reemplaza
// por las llamadas reales, manteniendo la API.
type Paso = 'ubicacion' | 'login' | 'app'

type AuthCtx = {
  paso: Paso
  logueado: boolean
  irLogin: () => void
  volverUbicacion: () => void
  entrarInvitado: () => void
  ingresar: () => void
  cerrarSesion: () => void
}

const noop = () => {}
const AuthContext = createContext<AuthCtx>({
  paso: 'ubicacion',
  logueado: false,
  irLogin: noop,
  volverUbicacion: noop,
  entrarInvitado: noop,
  ingresar: noop,
  cerrarSesion: noop,
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [paso, setPaso] = useState<Paso>('ubicacion')
  const [logueado, setLogueado] = useState(false)
  return (
    <AuthContext.Provider
      value={{
        paso,
        logueado,
        irLogin: () => setPaso('login'),
        volverUbicacion: () => setPaso('ubicacion'),
        entrarInvitado: () => setPaso('app'),
        ingresar: () => {
          setLogueado(true)
          setPaso('app')
        },
        cerrarSesion: () => {
          setLogueado(false)
          setPaso('ubicacion')
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
