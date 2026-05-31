import { createClient } from '@/lib/supabase/server'
import { getJob } from '@/actions/jobs'
import { notFound, redirect } from 'next/navigation'
import { formatDate } from '@/lib/utils'
import { ApplyForm } from './ApplyForm'

interface Props {
  params: Promise<{ id: string }>
}

export default async function DetalleTrabajoPage({ params }: Props) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: perfil } = await supabase
    .from('users')
    .select('id, rol')
    .eq('auth_id', user.id)
    .single()

  const job = await getJob(id)
  if (!job) notFound()

  const esTrabajador = perfil?.rol === 'trabajador'

  // Verificar si ya se postuló
  let yaPostulado = false
  if (esTrabajador && perfil) {
    const { data: app } = await supabase
      .from('applications')
      .select('id')
      .eq('job_id', id)
      .eq('worker_id', perfil.id)
      .maybeSingle()
    yaPostulado = !!app
  }

  return (
    <div className="max-w-2xl">
      <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
        <div className="flex items-start justify-between gap-4 mb-4">
          <h1 className="text-xl font-bold text-gray-900">{job.titulo}</h1>
          <span className="text-xs font-medium bg-blue-50 text-blue-700 px-2 py-1 rounded-full whitespace-nowrap">
            {job.service_categories.nombre}
          </span>
        </div>

        <p className="text-gray-700 mb-4 leading-relaxed">{job.descripcion}</p>

        <div className="flex flex-col gap-1 text-sm text-gray-500">
          <span>📍 {job.direccion}</span>
          <span>📅 Publicado el {formatDate(job.created_at)}</span>
        </div>
      </div>

      {esTrabajador && (
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <h2 className="font-semibold text-gray-900 mb-4">Postularse a este trabajo</h2>
          {yaPostulado ? (
            <p className="text-green-600 font-medium">✓ Ya te postulaste a este trabajo.</p>
          ) : (
            <ApplyForm jobId={id} />
          )}
        </div>
      )}
    </div>
  )
}
