import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { getCategories } from '@/actions/jobs'
import { CreateJobForm } from '@/components/jobs/CreateJobForm'

export default async function NuevoTrabajoPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: perfil } = await supabase
    .from('users')
    .select('rol')
    .eq('auth_id', user.id)
    .single()

  if (perfil?.rol !== 'cliente') redirect('/dashboard')

  const categories = await getCategories()

  return (
    <div className="max-w-xl">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Publicar trabajo</h1>
      <p className="text-gray-500 mb-8">
        Describí lo que necesitás. Los trabajadores verificados podrán postularse.
      </p>
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <CreateJobForm categories={categories} />
      </div>
    </div>
  )
}
