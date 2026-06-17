import { and, eq } from 'drizzle-orm'
import { db } from '../db/index.js'
import { incomes, months } from '../db/schema/index.js'
import type { Income } from '../db/schema/index.js'
import { assertMonthOwnership } from '../lib/ownership.js'
import { NotFoundError } from '../lib/errors.js'
import type {
  CreateIncomeInput,
  UpdateIncomeInput,
} from '../validators/incomes.schema.js'

// Récupère les revenus d'un mois appartenant à l'utilisateur.
export async function findByMonth(
  monthId: number,
  userId: string
): Promise<Income[]> {
  await assertMonthOwnership(monthId, userId)
  return db.select().from(incomes).where(eq(incomes.monthId, monthId))
}

// Récupère un revenu par son ID, en vérifiant l'appartenance via le mois.
export async function findById(
  id: number,
  userId: string
): Promise<Income | null> {
  const result = await db
    .select({ income: incomes })
    .from(incomes)
    .innerJoin(months, eq(incomes.monthId, months.id))
    .where(and(eq(incomes.id, id), eq(months.userId, userId)))
    .limit(1)
  return result[0]?.income ?? null
}

// Crée un revenu rattaché à un mois possédé par l'utilisateur.
export async function create(
  input: CreateIncomeInput,
  userId: string
): Promise<Income> {
  await assertMonthOwnership(input.monthId, userId)

  const inserted = await db
    .insert(incomes)
    .values({
      monthId: input.monthId,
      name: input.name,
      amount: String(input.amount),
      ...(input.isFavorite !== undefined && { isFavorite: input.isFavorite }),
    })
    .returning()
  return inserted[0]!
}

// Met à jour un revenu possédé par l'utilisateur.
export async function update(
  id: number,
  input: UpdateIncomeInput,
  userId: string
): Promise<Income> {
  const found = await db
    .select({ id: incomes.id })
    .from(incomes)
    .innerJoin(months, eq(incomes.monthId, months.id))
    .where(and(eq(incomes.id, id), eq(months.userId, userId)))
    .limit(1)

  if (!found[0]) throw new NotFoundError('Revenu introuvable.')

  const updated = await db
    .update(incomes)
    .set({
      ...(input.name !== undefined && { name: input.name }),
      ...(input.amount !== undefined && { amount: String(input.amount) }),
      ...(input.isFavorite !== undefined && { isFavorite: input.isFavorite }),
    })
    .where(eq(incomes.id, id))
    .returning()
  return updated[0]!
}

// Supprime un revenu possédé par l'utilisateur.
export async function remove(id: number, userId: string): Promise<void> {
  const found = await db
    .select({ id: incomes.id })
    .from(incomes)
    .innerJoin(months, eq(incomes.monthId, months.id))
    .where(and(eq(incomes.id, id), eq(months.userId, userId)))
    .limit(1)

  if (!found[0]) throw new NotFoundError('Revenu introuvable.')

  await db.delete(incomes).where(eq(incomes.id, id))
}
