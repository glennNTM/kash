import type { Month, SectionType, ExpenseStatus } from '../types/budget'
import { apiRequest, ApiError } from '../lib/api-client'
import { humanizeError } from '../lib/errors'
import { mapMonth, type MonthDTO } from './mappers'

type Result<T> = { data: T } | { error: string }

/**
 * Payload de l'onboarding — miroir exact du schéma backend (`onboarding.schema.ts`).
 * Un seul POST atomique crée mois + revenu + sections + 1re dépense.
 * `percentage` est une fraction (0.5 = 50 %), pas un pourcentage entier.
 */
export interface OnboardingPayload {
  month: number
  year: number
  income: { name: string; amount: number }
  allocation: { name: string; type: SectionType; percentage: number }[]
  firstExpense: {
    sectionIndex: number
    name: string
    category?: string
    amountPlanned: number
    status?: ExpenseStatus
  }
}

/**
 * Crée le budget initial via l'endpoint atomique `POST /api/onboarding`.
 * Ne jamais passer par les routes unitaires (/api/months, /api/sections…) :
 * casserait l'atomicité de la transaction backend.
 */
export async function submitOnboarding(payload: OnboardingPayload): Promise<Result<Month>> {
  try {
    const dto = await apiRequest<MonthDTO>('/api/onboarding', { method: 'POST', body: payload })
    return { data: mapMonth(dto) }
  } catch (err) {
    return { error: err instanceof ApiError ? err.message : humanizeError(err) }
  }
}
