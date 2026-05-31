import type { SubscriptionStatus } from './worker'

export type SubscriptionPlan = 'basico' | 'pro'

export interface Subscription {
  id: string
  worker_id: string
  plan: SubscriptionPlan
  estado: SubscriptionStatus
  vence_en: string | null
  mp_subscription_id: string | null
  mp_payer_id: string | null
  created_at: string
  updated_at: string
}

export const PLAN_LIMITS: Record<SubscriptionPlan, { postulaciones_mes: number | null }> = {
  basico: { postulaciones_mes: 5 },
  pro: { postulaciones_mes: null },
}
