import { eq, and, desc } from 'drizzle-orm'
import { db } from '../db/index.js'
import { months } from '../db/schema/index.js'
import type { Month } from '../db/schema/index.js'
import { NotFoundError } from '../lib/errors.js'
import type { CreateMonthInput, UpdateMonthInput } from '../validators/months.schema.js'

// Récupère tous les mois de l'utilisateur connecté, du plus récent au plus ancien.
export async function findAll(userId: string): Promise<Month[]> {
  return db.select().from(months).where(eq(months.userId, userId)).orderBy(desc(months.year), desc(months.month))
}

// Récupère un mois de l'utilisateur par son ID.
export async function findById(id: number, userId: string): Promise<Month | null> {
  const result = await db
    .select()
    .from(months)
    .where(and(eq(months.id, id), eq(months.userId, userId)))
    .limit(1)
  return result[0] ?? null
}

// Crée un mois pour l'utilisateur. La contrainte unique (userId, month, year) → 409 via l'error handler.
export async function create(input: CreateMonthInput, userId: string): Promise<Month> {
  const inserted = await db
    .insert(months)
    .values({
      userId,
      name: input.name,
      month: input.month,
      year: input.year,
      ...(input.totalIncome !== undefined && { totalIncome: String(input.totalIncome) }),
    })
    .returning()
  return inserted[0]!
}

// Met à jour un mois possédé par l'utilisateur.
export async function update(id: number, input: UpdateMonthInput, userId: string): Promise<Month> {
  const updated = await db
    .update(months)
    .set({
      ...(input.name !== undefined && { name: input.name }),
      ...(input.month !== undefined && { month: input.month }),
      ...(input.year !== undefined && { year: input.year }),
      ...(input.totalIncome !== undefined && { totalIncome: String(input.totalIncome) }),
    })
    .where(and(eq(months.id, id), eq(months.userId, userId)))
    .returning()

  const row = updated[0]
  if (!row) throw new NotFoundError('Mois introuvable.')
  return row
}

// Supprime un mois possédé par l'utilisateur (cascade sur sections/incomes/contributions).
export async function remove(id: number, userId: string): Promise<void> {
  const deleted = await db
    .delete(months)
    .where(and(eq(months.id, id), eq(months.userId, userId)))
    .returning({ id: months.id })

  if (!deleted[0]) throw new NotFoundError('Mois introuvable.')
}
