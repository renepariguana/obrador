import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: perfil } = await supabase
    .from('users')
    .select('nombre, rol')
    .eq('auth_id', user.id)
    .single()

  if (!perfil) redirect('/login')

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">
        Hola, {perfil.nombre} 👋
      </h1>
      <p className="text-gray-500 mb-8">
        Cuenta: <span className="font-medium capitalize">{perfil.rol}</span>
      </p>

      {perfil.rol === 'cliente' && (
        <div className="grid gap-4 sm:grid-cols-2">
          <Link
            href="/trabajos/nuevo"
            className="block p-6 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
          >
            <h2 className="text-lg font-semibold mb-1">Publicar trabajo</h2>
            <p className="text-blue-100 text-sm">Describí lo que necesitás y recibí postulaciones.</p>
          </Link>
        </div>
      )}

      {perfil.rol === 'trabajador' && (
        <div className="grid gap-4 sm:grid-cols-2">
          <Link
            href="/trabajos"
            className="block p-6 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
          >
            <h2 className="text-lg font-semibold mb-1">Explorar trabajos</h2>
            <p className="text-blue-100 text-sm">Buscá trabajos disponibles cerca tuyo.</p>
          </Link>
        </div>
      )}

      {perfil.rol === 'proveedor' && (
        <div className="p-6 bg-gray-100 rounded-xl">
          <h2 className="text-lg font-semibold mb-1">Panel de proveedor</h2>
          <p className="text-gray-500 text-sm">Próximamente podrás gestionar tu catálogo de materiales.</p>
        </div>
      )}
    </div>
  )
}
