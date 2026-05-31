'use client'

import { useActionState } from 'react'
import { register } from '@/actions/auth'
import type { UserRole } from '@manos/shared'

const ROL_LABELS: Record<string, string> = {
  cliente: 'Cliente — necesito contratar profesionales',
  trabajador: 'Trabajador — ofrezco mis servicios',
  proveedor: 'Proveedor — vendo materiales',
}

interface Props {
  rolInicial?: UserRole
}

export function RegisterForm({ rolInicial }: Props) {
  const [state, action, isPending] = useActionState(register, null)

  return (
    <form action={action} className="space-y-4">
      <div>
        <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">
          Nombre completo
        </label>
        <input
          id="nombre"
          name="nombre"
          type="text"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Juan Pérez"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="juan@ejemplo.com"
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
          Contraseña
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          minLength={6}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Mínimo 6 caracteres"
        />
      </div>

      <div>
        <label htmlFor="rol" className="block text-sm font-medium text-gray-700 mb-1">
          Tipo de cuenta
        </label>
        <select
          id="rol"
          name="rol"
          defaultValue={rolInicial ?? 'cliente'}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        >
          {Object.entries(ROL_LABELS).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>

      {state?.error && (
        <p className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">{state.error}</p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {isPending ? 'Creando cuenta...' : 'Crear cuenta'}
      </button>
    </form>
  )
}
