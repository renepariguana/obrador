import Link from 'next/link'
import { LoginForm } from '@/components/auth/LoginForm'

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Iniciar sesión</h1>
          <p className="text-gray-500 mb-6">Bienvenido de vuelta.</p>

          <LoginForm />

          <p className="mt-4 text-center text-sm text-gray-500">
            ¿No tenés cuenta?{' '}
            <Link href="/registro" className="text-blue-600 hover:underline font-medium">
              Registrate
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}
