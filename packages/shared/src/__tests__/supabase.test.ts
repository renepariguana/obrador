import { describe, it, expect } from 'vitest'
import { createSupabaseClient } from '../client/supabase'

describe('createSupabaseClient', () => {
  it('crea un cliente con URL y key válidos', () => {
    const client = createSupabaseClient(
      'http://127.0.0.1:54321',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.test'
    )
    expect(client).toBeDefined()
    expect(typeof client.from).toBe('function')
    expect(typeof client.auth.signInWithPassword).toBe('function')
  })

  it('lanza error si falta URL', () => {
    expect(() => createSupabaseClient('', 'key')).toThrow('SUPABASE_URL es requerida')
  })

  it('lanza error si falta key', () => {
    expect(() => createSupabaseClient('http://localhost', '')).toThrow('SUPABASE_ANON_KEY es requerida')
  })
})
