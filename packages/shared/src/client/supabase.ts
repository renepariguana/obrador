import { createClient, type SupabaseClient } from '@supabase/supabase-js'

export function createSupabaseClient(url: string, anonKey: string): SupabaseClient {
  if (!url) throw new Error('SUPABASE_URL es requerida')
  if (!anonKey) throw new Error('SUPABASE_ANON_KEY es requerida')
  return createClient(url, anonKey)
}
