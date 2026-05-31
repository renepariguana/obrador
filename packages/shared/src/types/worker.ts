export type VerificationStatus = 'pendiente' | 'aprobado' | 'rechazado'
export type SubscriptionStatus = 'activo' | 'inactivo' | 'vencido'
export type DocumentType = 'dni_frente' | 'dni_dorso' | 'cuit'

export interface WorkerProfile {
  id: string
  user_id: string
  descripcion: string | null
  zona: string
  lat: number | null
  lng: number | null
  category_ids: string[]
  verificacion_estado: VerificationStatus
  suscripcion_estado: SubscriptionStatus
  rating_promedio: number
  rating_count: number
  postulaciones_mes: number
  created_at: string
  updated_at: string
}

export interface SupplierProfile {
  id: string
  user_id: string
  descripcion: string | null
  zona: string
  lat: number | null
  lng: number | null
  tipos_material: string[]
  verificacion_estado: VerificationStatus
  suscripcion_estado: SubscriptionStatus
  created_at: string
  updated_at: string
}

export interface Document {
  id: string
  user_id: string
  tipo: DocumentType
  archivo_url: string
  estado: VerificationStatus
  rechazo_motivo: string | null
  created_at: string
  updated_at: string
}

export interface ServiceCategory {
  id: string
  nombre: string
  icono: string
  created_at: string
}

export interface Review {
  id: string
  job_id: string
  cliente_id: string
  worker_id: string
  puntuacion: number
  comentario: string | null
  created_at: string
}

export function isWorkerActive(profile: WorkerProfile): boolean {
  return (
    profile.verificacion_estado === 'aprobado' &&
    profile.suscripcion_estado === 'activo'
  )
}
