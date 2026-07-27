import { createSupabaseClient } from '@manos/shared'
import AsyncStorage from '@react-native-async-storage/async-storage'

// SÓLO anon key en el cliente. La seguridad real está en las RLS de Supabase.
// Nunca poner service_role acá.
const url = process.env.EXPO_PUBLIC_SUPABASE_URL ?? ''
const anon = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ?? ''

// En React Native la sesión se persiste en AsyncStorage (SecureStore tiene límite de 2KB
// y el JWT puede superarlo). detectSessionInUrl=false porque no hay URL de navegador.
export const supabase = createSupabaseClient(url, anon, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
    flowType: 'pkce', // para el OAuth (Google) en móvil
  },
})
