'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import type { JobPost, ServiceCategory, Application } from '@manos/shared'

export async function getJobs(): Promise<(JobPost & { service_categories: ServiceCategory })[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('job_posts')
    .select('*, service_categories(id, nombre, icono)')
    .eq('estado', 'abierto')
    .order('created_at', { ascending: false })

  if (error) return []
  return (data ?? []) as unknown as (JobPost & { service_categories: ServiceCategory })[]
}

export async function getJob(id: string): Promise<(JobPost & { service_categories: ServiceCategory }) | null> {
  const supabase = await createClient()

  const { data } = await supabase
    .from('job_posts')
    .select('*, service_categories(id, nombre, icono)')
    .eq('id', id)
    .single()

  return data ? (data as unknown as JobPost & { service_categories: ServiceCategory }) : null
}

export async function getCategories(): Promise<ServiceCategory[]> {
  const supabase = await createClient()
  const { data } = await supabase.from('service_categories').select('*').order('nombre')
  return (data ?? []) as unknown as ServiceCategory[]
}

export async function createJob(prevState: { error: string } | null, formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return { error: 'No autenticado.' }

  const { data: perfil } = await supabase
    .from('users')
    .select('id, rol')
    .eq('auth_id', user.id)
    .single()

  if (!perfil || perfil.rol !== 'cliente') {
    return { error: 'Solo los clientes pueden publicar trabajos.' }
  }

  const titulo = formData.get('titulo') as string
  const descripcion = formData.get('descripcion') as string
  const category_id = formData.get('category_id') as string
  const direccion = formData.get('direccion') as string

  if (!titulo || !descripcion || !category_id || !direccion) {
    return { error: 'Todos los campos son requeridos.' }
  }

  const { data: job, error } = await supabase
    .from('job_posts')
    .insert({
      cliente_id: perfil.id,
      titulo,
      descripcion,
      category_id,
      direccion,
      lat: -26.8083,
      lng: -65.2176,
    })
    .select('id')
    .single()

  if (error) return { error: error.message }

  redirect(`/trabajos/${job.id}`)
}

export async function applyToJob(prevState: { error: string; success: boolean } | null, formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return { error: 'No autenticado.', success: false }

  const { data: perfil } = await supabase
    .from('users')
    .select('id, rol')
    .eq('auth_id', user.id)
    .single()

  if (!perfil || perfil.rol !== 'trabajador') {
    return { error: 'Solo los trabajadores pueden postularse.', success: false }
  }

  const job_id = formData.get('job_id') as string
  const mensaje = formData.get('mensaje') as string

  const { error } = await supabase.from('applications').insert({
    job_id,
    worker_id: perfil.id,
    mensaje: mensaje || null,
  })

  if (error) {
    if (error.code === '23505') return { error: 'Ya te postulaste a este trabajo.', success: false }
    return { error: error.message, success: false }
  }

  return { error: '', success: true }
}

export async function getMyApplications(): Promise<Application[]> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return []

  const { data: perfil } = await supabase
    .from('users')
    .select('id')
    .eq('auth_id', user.id)
    .single()

  if (!perfil) return []

  const { data } = await supabase
    .from('applications')
    .select('*')
    .eq('worker_id', perfil.id)
    .order('created_at', { ascending: false })

  return (data ?? []) as unknown as Application[]
}
