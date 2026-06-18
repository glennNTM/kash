import { eq } from 'drizzle-orm'
import { db } from '../db/index.js'
import { months, sections, goals } from '../db/schema/index.js'
import { NotFoundError } from './errors.js'

/**
 * Vérifie qu'un mois appartient bien à l'utilisateur connecté.
 * Renvoie 404 (et non 403) que le mois soit inexistant ou possédé par un autre,
 * pour ne pas divulguer l'existence des ressources d'autrui.
 */
export async function assertMonthOwnership(
  monthId: number,
  userId: string
): Promise<void> {
  const result = await db
    .select({ userId: months.userId })
    .from(months)
    .where(eq(months.id, monthId))
    .limit(1)

  const month = result[0]
  if (!month || month.userId !== userId) {
    throw new NotFoundError('Mois introuvable.')
  }
}

/**
 * Vérifie qu'une section appartient à l'utilisateur (via son mois).
 * Même politique que ci-dessus : 404 si inexistante ou possédée par un autre.
 */
export async function assertSectionOwnership(
  sectionId: number,
  userId: string
): Promise<void> {
  const result = await db
    .select({ userId: months.userId })
    .from(sections)
    .innerJoin(months, eq(sections.monthId, months.id))
    .where(eq(sections.id, sectionId))
    .limit(1)

  const row = result[0]
  if (!row || row.userId !== userId) {
    throw new NotFoundError('Section introuvable.')
  }
}

/**
 * Vérifie qu'un objectif appartient à l'utilisateur.
 * Même politique : 404 si inexistant ou possédé par un autre.
 */
export async function assertGoalOwnership(
  goalId: number,
  userId: string
): Promise<void> {
  const result = await db
    .select({ userId: goals.userId })
    .from(goals)
    .where(eq(goals.id, goalId))
    .limit(1)

  const row = result[0]
  if (!row || row.userId !== userId) {
    throw new NotFoundError('Objectif introuvable.')
  }
}
