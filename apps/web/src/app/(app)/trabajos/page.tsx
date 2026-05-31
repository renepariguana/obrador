import { getJobs } from '@/actions/jobs'
import { JobCard } from '@/components/jobs/JobCard'

export default async function TrabajosPage() {
  const jobs = await getJobs()

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Trabajos disponibles</h1>

      {jobs.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <p className="text-lg">No hay trabajos disponibles por ahora.</p>
          <p className="text-sm mt-1">Volvé a revisar más tarde.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      )}
    </div>
  )
}
