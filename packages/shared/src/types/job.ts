export type JobStatus = 'abierto' | 'en_curso' | 'terminado' | 'cancelado'
export type ApplicationStatus = 'pendiente' | 'aceptado' | 'rechazado'

export interface JobPost {
  id: string
  cliente_id: string
  titulo: string
  descripcion: string
  category_id: string
  lat: number
  lng: number
  direccion: string
  estado: JobStatus
  worker_seleccionado_id: string | null
  created_at: string
  updated_at: string
}

export interface Application {
  id: string
  job_id: string
  worker_id: string
  mensaje: string | null
  estado: ApplicationStatus
  created_at: string
}

export interface CreateJobInput {
  titulo: string
  descripcion: string
  category_id: string
  lat: number
  lng: number
  direccion: string
}

export interface CreateApplicationInput {
  job_id: string
  mensaje?: string
}
