import { createSupabaseClient } from '@manos/shared'

// SÓLO anon key en el cliente. La seguridad real está en las RLS de Supabase.
// Nunca poner service_role acá.
const url = process.env.EXPO_PUBLIC_SUPABASE_URL ?? ''
const anon = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ?? ''

export const supabase = createSupabaseClient(url, anon)
