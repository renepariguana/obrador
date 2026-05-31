'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { adminClient } from '@/lib/supabase/admin'
import type { UserRole } from '@manos/shared'

const VALID_ROLES: UserRole[] = ['cliente', 'trabajador', 'proveedor']

export async function register(prevState: { error: string } | null, formData: FormData) {
  const email = (formData.get('email') as string) ?? ''
  const password = (formData.get('password') as string) ?? ''
  const nombre = (formData.get('nombre') as string) ?? ''
  const rol = (formData.get('rol') as string) ?? ''

  if (!email || !password || !nombre || !rol) {
    return { error: 'Todos los campos son requeridos.' }
  }

  if (password.length < 6) {
    return { error: 'La contraseña debe tener al menos 6 caracteres.' }
  }

  if (!VALID_ROLES.includes(rol as UserRole)) {
    return { error: 'Rol inválido.' }
  }

  const supabase = await createClient()

  const { data, error: signUpError } = await supabase.auth.signUp({ email, password })

  if (signUpError) {
    return { error: signUpError.message }
  }

  if (!data.user) {
    return { error: 'No se pudo crear el usuario.' }
  }

  const { error: insertError } = await adminClient.from('users').insert({
    auth_id: data.user.id,
    email,
    nombre,
    rol: rol as UserRole,
  })

  if (insertError) {
    // Compensating action: remove the auth user to avoid orphaned records
    await adminClient.auth.admin.deleteUser(data.user.id)
    return { error: insertError.message }
  }

  redirect('/dashboard')
}

export async function login(prevState: { error: string } | null, formData: FormData) {
  const email = (formData.get('email') as string) ?? ''
  const password = (formData.get('password') as string) ?? ''

  if (!email || !password) {
    return { error: 'Email y contraseña son requeridos.' }
  }

  const supabase = await createClient()

  const { error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    return { error: 'Credenciales inválidas.' }
  }

  redirect('/dashboard')
}

export async function logout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/login')
}
