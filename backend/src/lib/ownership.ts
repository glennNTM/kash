import { eq } from 'drizzle-orm'
import { db } from '../db/index.js'
import { months } from '../db/schema/index.js'
import { NotFoundError } from './errors.js'

/**
 * Vérifie qu'un mois appartient bien à l'utilisateur connecté.
 * Renvoie 404 (et non 403) que le mois soit inexistant ou possédé par un autre,
 * pour ne pas divulguer l'existence des ressources d'autrui.
 */
export async function assertMonthOwnership(monthId: number, userId: string): Promise<void> {
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
