import Link from 'next/link'
import { formatDate } from '@/lib/utils'
import type { JobPost, ServiceCategory } from '@manos/shared'

interface Props {
  job: JobPost & { service_categories: ServiceCategory }
}

export function JobCard({ job }: Props) {
  return (
    <Link
      href={`/trabajos/${job.id}`}
      className="block bg-white rounded-xl border border-gray-200 p-5 hover:border-blue-300 hover:shadow-sm transition-all"
    >
      <div className="flex items-start justify-between gap-4 mb-3">
        <h3 className="font-semibold text-gray-900 text-base leading-snug">{job.titulo}</h3>
        <span className="text-xs font-medium bg-blue-50 text-blue-700 px-2 py-1 rounded-full whitespace-nowrap">
          {job.service_categories.nombre}
        </span>
      </div>
      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{job.descripcion}</p>
      <div className="flex items-center gap-4 text-xs text-gray-400">
        <span>{job.direccion}</span>
        <span>{formatDate(job.created_at)}</span>
      </div>
    </Link>
  )
}
