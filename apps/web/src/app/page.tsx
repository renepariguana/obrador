import Link from 'next/link'

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <div className="text-center max-w-2xl">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Manos a la Obra
        </h1>
        <p className="text-xl text-gray-600 mb-12">
          Encontrá el profesional que necesitás. Trabajadores verificados, cerca tuyo.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Link
            href="/registro?rol=cliente"
            className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors text-lg"
          >
            Necesito un profesional
          </Link>
          <Link
            href="/registro?rol=trabajador"
            className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl border-2 border-blue-600 hover:bg-blue-50 transition-colors text-lg"
          >
            Ofrezco mis servicios
          </Link>
        </div>

        <p className="text-gray-500">
          ¿Ya tenés cuenta?{' '}
          <Link href="/login" className="text-blue-600 hover:underline font-medium">
            Iniciá sesión
          </Link>
        </p>
      </div>
    </main>
  )
}
