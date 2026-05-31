import Link from 'next/link'
import { RegisterForm } from '@/components/auth/RegisterForm'
import type { UserRole } from '@manos/shared'

interface Props {
  searchParams: Promise<{ rol?: string }>
}

export default async function RegistroPage({ searchParams }: Props) {
  const params = await searchParams
  const rol = (params.rol as UserRole) ?? 'cliente'

  return (
    <main className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Crear cuenta</h1>
          <p className="text-gray-500 mb-6">Completá tus datos para registrarte.</p>

          <RegisterForm rolInicial={rol} />

          <p className="mt-4 text-center text-sm text-gray-500">
            ¿Ya tenés cuenta?{' '}
            <Link href="/login" className="text-blue-600 hover:underline font-medium">
              Iniciá sesión
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}
