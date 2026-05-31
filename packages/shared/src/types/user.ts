export type UserRole = 'cliente' | 'trabajador' | 'proveedor' | 'admin'

export interface User {
  id: string
  auth_id: string
  email: string
  nombre: string
  telefono: string | null
  rol: UserRole
  avatar_url: string | null
  created_at: string
  updated_at: string
}

export interface CreateUserInput {
  auth_id: string
  email: string
  nombre: string
  rol: UserRole
  telefono?: string
}
