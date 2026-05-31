import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { LogoutButton } from './LogoutButton'

export async function Navbar() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return null

  const { data: perfil } = await supabase
    .from('users')
    .select('nombre, rol')
    .eq('auth_id', user.id)
    .single()

  const rol = perfil?.rol ?? 'cliente'

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <Link href="/dashboard" className="text-lg font-bold text-blue-600">
          Manos a la Obra
        </Link>

        <div className="flex items-center gap-6">
          {rol === 'trabajador' && (
            <Link href="/trabajos" className="text-sm text-gray-600 hover:text-gray-900 font-medium">
              Trabajos disponibles
            </Link>
          )}
          {rol === 'cliente' && (
            <Link href="/trabajos/nuevo" className="text-sm text-gray-600 hover:text-gray-900 font-medium">
              Publicar trabajo
            </Link>
          )}
          <span className="text-sm text-gray-400">{perfil?.nombre}</span>
          <LogoutButton />
        </div>
      </div>
    </nav>
  )
}
