import type { Month } from '../types/budget'
import { apiRequest } from '../lib/api-client'
import { mapMonth, type MonthDTO } from './mappers'

/**
 * Liste tous les mois de l'utilisateur connecté (sans détails imbriqués lourds).
 * Sert de source de vérité « l'utilisateur a-t-il déjà un budget ? » : au moins
 * un mois ⇒ l'onboarding a déjà été fait (le seul moyen de créer le 1er mois).
 * Lève une ApiError en cas d'échec (gérée par React Query).
 */
export async function getMonths(): Promise<Month[]> {
  const dtos = await apiRequest<MonthDTO[]>('/api/months')
  return dtos.map(mapMonth)
}
