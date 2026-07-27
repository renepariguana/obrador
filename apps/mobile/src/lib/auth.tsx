import React, { createContext, useContext, useEffect, useState } from 'react'
import { Linking } from 'react-native'
import * as WebBrowser from 'expo-web-browser'
import { makeRedirectUri } from 'expo-auth-session'
import type { User } from '@supabase/supabase-js'
import { supabase } from './supabase'

// Saca el ?code=... de un deep link (parseo manual: la URL con scheme custom no siempre entra en `new URL`).
const codeDe = (url: string) => /[?&]code=([^&]+)/.exec(url)?.[1] ?? null

WebBrowser.maybeCompleteAuthSession()

// Flujo de arranque: ubicación (primera pantalla) → login (opcional) → app.
type Paso = 'ubicacion' | 'login' | 'app'

type Resultado = { error?: string }

type AuthCtx = {
  paso: Paso
  usuario: User | null
  logueado: boolean
  cargando: boolean
  irLogin: () => void
  volverUbicacion: () => void
  entrarInvitado: () => void
  ingresarGoogle: () => Promise<Resultado>
  ingresarApple: () => Promise<Resultado>
  enviarMagicLink: (email: string) => Promise<Resultado>
  ingresarEmail: (email: string, password: string) => Promise<Resultado>
  crearCuentaEmail: (email: string, password: string) => Promise<Resultado>
  cerrarSesion: () => Promise<void>
  borrarCuenta: () => Promise<Resultado>
}

const noop = () => {}
const noopAsync = async (): Promise<Resultado> => ({})
const AuthContext = createContext<AuthCtx>({
  paso: 'ubicacion',
  usuario: null,
  logueado: false,
  cargando: true,
  irLogin: noop,
  volverUbicacion: noop,
  entrarInvitado: noop,
  ingresarGoogle: noopAsync,
  ingresarApple: noopAsync,
  enviarMagicLink: noopAsync,
  ingresarEmail: noopAsync,
  crearCuentaEmail: noopAsync,
  cerrarSesion: async () => {},
  borrarCuenta: noopAsync,
})

const redirectTo = makeRedirectUri({ scheme: 'obrador', path: 'auth' })

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [paso, setPaso] = useState<Paso>('ubicacion')
  const [usuario, setUsuario] = useState<User | null>(null)
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    // Sesión persistida al abrir la app.
    supabase.auth.getSession().then(({ data }) => {
      setUsuario(data.session?.user ?? null)
      if (data.session) setPaso('app')
      setCargando(false)
    })
    const { data: sub } = supabase.auth.onAuthStateChange((_evt, session) => {
      setUsuario(session?.user ?? null)
      if (session) setPaso('app')
    })
    // Deep link del email (link mágico): obrador://auth?code=... → canjear por sesión.
    const manejarLink = async (url: string | null) => {
      const code = url ? codeDe(url) : null
      if (code) await supabase.auth.exchangeCodeForSession(code).catch(() => {})
    }
    Linking.getInitialURL().then(manejarLink)
    const linkSub = Linking.addEventListener('url', ({ url }) => manejarLink(url))
    return () => {
      sub.subscription.unsubscribe()
      linkSub.remove()
    }
  }, [])

  // OAuth (Google/Apple vía web): abre el navegador y canjea el código por sesión (PKCE).
  async function ingresarOAuth(provider: 'google' | 'apple'): Promise<Resultado> {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: { redirectTo, skipBrowserRedirect: true },
      })
      if (error || !data?.url) return { error: error?.message ?? 'No se pudo iniciar el login' }
      const res = await WebBrowser.openAuthSessionAsync(data.url, redirectTo)
      if (res.type !== 'success') return { error: 'Login cancelado' }
      const code = new URL(res.url).searchParams.get('code')
      if (!code) return { error: 'No se recibió el código de autorización' }
      const { error: e2 } = await supabase.auth.exchangeCodeForSession(code)
      return e2 ? { error: e2.message } : {}
    } catch (e) {
      return { error: e instanceof Error ? e.message : 'Error de login' }
    }
  }

  const value: AuthCtx = {
    paso,
    usuario,
    logueado: !!usuario,
    cargando,
    irLogin: () => setPaso('login'),
    volverUbicacion: () => setPaso('ubicacion'),
    entrarInvitado: () => setPaso('app'),
    ingresarGoogle: () => ingresarOAuth('google'),
    ingresarApple: () => ingresarOAuth('apple'), // se activa con el dev build + cuenta Apple Developer
    enviarMagicLink: async (email) => {
      const { error } = await supabase.auth.signInWithOtp({
        email: email.trim(),
        options: { emailRedirectTo: redirectTo, shouldCreateUser: true },
      })
      return error ? { error: error.message } : {}
    },
    ingresarEmail: async (email, password) => {
      const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password })
      return error ? { error: error.message } : {}
    },
    crearCuentaEmail: async (email, password) => {
      const { error } = await supabase.auth.signUp({ email: email.trim(), password })
      return error ? { error: error.message } : {}
    },
    cerrarSesion: async () => {
      await supabase.auth.signOut()
      setPaso('ubicacion')
    },
    borrarCuenta: async () => {
      try {
        const { error } = await supabase.functions.invoke('delete-account')
        if (error) return { error: error.message }
        await supabase.auth.signOut()
        setPaso('ubicacion')
        return {}
      } catch (e) {
        return { error: e instanceof Error ? e.message : 'No se pudo eliminar la cuenta' }
      }
    },
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
