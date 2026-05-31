'use client'

import { useActionState } from 'react'
import { createJob } from '@/actions/jobs'
import type { ServiceCategory } from '@manos/shared'

interface Props {
  categories: ServiceCategory[]
}

export function CreateJobForm({ categories }: Props) {
  const [state, action, isPending] = useActionState(createJob, null)

  return (
    <form action={action} className="space-y-5">
      <div>
        <label htmlFor="titulo" className="block text-sm font-medium text-gray-700 mb-1">
          Título del trabajo
        </label>
        <input
          id="titulo"
          name="titulo"
          type="text"
          required
          maxLength={100}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Ej: Reparación de caño roto en baño"
        />
      </div>

      <div>
        <label htmlFor="category_id" className="block text-sm font-medium text-gray-700 mb-1">
          Categoría
        </label>
        <select
          id="category_id"
          name="category_id"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        >
          <option value="">Seleccioná una categoría</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.nombre}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700 mb-1">
          Descripción
        </label>
        <textarea
          id="descripcion"
          name="descripcion"
          required
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          placeholder="Describí el problema o la tarea con el mayor detalle posible..."
        />
      </div>

      <div>
        <label htmlFor="direccion" className="block text-sm font-medium text-gray-700 mb-1">
          Dirección
        </label>
        <input
          id="direccion"
          name="direccion"
          type="text"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Ej: San Martín 500, San Miguel de Tucumán"
        />
      </div>

      {state?.error && (
        <p className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">{state.error}</p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {isPending ? 'Publicando...' : 'Publicar trabajo'}
      </button>
    </form>
  )
}
