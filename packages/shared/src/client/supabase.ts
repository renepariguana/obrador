import { createClient, type SupabaseClient, type SupabaseClientOptions } from '@supabase/supabase-js'

// `options` permite pasar config específica de plataforma (ej. en React Native el storage de la sesión).
export function createSupabaseClient(
  url: string,
  anonKey: string,
  options?: SupabaseClientOptions<'public'>,
): SupabaseClient {
  if (!url) throw new Error('SUPABASE_URL es requerida')
  if (!anonKey) throw new Error('SUPABASE_ANON_KEY es requerida')
  return createClient(url, anonKey, options)
}
