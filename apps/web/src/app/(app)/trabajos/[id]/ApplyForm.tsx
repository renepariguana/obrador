'use client'

import { useActionState } from 'react'
import { applyToJob } from '@/actions/jobs'

interface Props {
  jobId: string
}

export function ApplyForm({ jobId }: Props) {
  const [state, action, isPending] = useActionState(applyToJob, null)

  if (state?.success) {
    return <p className="text-green-600 font-medium">✓ ¡Te postulaste exitosamente!</p>
  }

  return (
    <form action={action} className="space-y-4">
      <input type="hidden" name="job_id" value={jobId} />

      <div>
        <label htmlFor="mensaje" className="block text-sm font-medium text-gray-700 mb-1">
          Mensaje al cliente <span className="text-gray-400">(opcional)</span>
        </label>
        <textarea
          id="mensaje"
          name="mensaje"
          rows={3}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          placeholder="Presentate y contá por qué sos la persona indicada para este trabajo..."
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
        {isPending ? 'Enviando...' : 'Postularme'}
      </button>
    </form>
  )
}
