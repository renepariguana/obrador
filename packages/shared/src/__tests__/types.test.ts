import { describe, it, expect } from 'vitest'
import { isWorkerActive, PLAN_LIMITS } from '../types'
import type { WorkerProfile } from '../types'

const baseWorker: WorkerProfile = {
  id: '1',
  user_id: '2',
  descripcion: null,
  zona: 'Tucumán',
  lat: null,
  lng: null,
  category_ids: [],
  verificacion_estado: 'aprobado',
  suscripcion_estado: 'activo',
  rating_promedio: 4.5,
  rating_count: 10,
  postulaciones_mes: 2,
  created_at: '2026-01-01',
  updated_at: '2026-01-01',
}

describe('isWorkerActive', () => {
  it('retorna true si verificado y suscripción activa', () => {
    expect(isWorkerActive(baseWorker)).toBe(true)
  })

  it('retorna false si verificación pendiente', () => {
    expect(isWorkerActive({ ...baseWorker, verificacion_estado: 'pendiente' })).toBe(false)
  })

  it('retorna false si suscripción inactiva', () => {
    expect(isWorkerActive({ ...baseWorker, suscripcion_estado: 'inactivo' })).toBe(false)
  })

  it('retorna false si rechazado aunque suscripción activa', () => {
    expect(isWorkerActive({ ...baseWorker, verificacion_estado: 'rechazado' })).toBe(false)
  })
})

describe('PLAN_LIMITS', () => {
  it('plan basico tiene límite de 5 postulaciones', () => {
    expect(PLAN_LIMITS.basico.postulaciones_mes).toBe(5)
  })

  it('plan pro no tiene límite (null)', () => {
    expect(PLAN_LIMITS.pro.postulaciones_mes).toBeNull()
  })
})
