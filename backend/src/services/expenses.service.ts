import { and, eq } from 'drizzle-orm'
import { db } from '../db/index.js'
import { expenses, sections, months } from '../db/schema/index.js'
import type { Expense } from '../db/schema/index.js'
import { assertSectionOwnership } from '../lib/ownership.js'
import { NotFoundError } from '../lib/errors.js'
import type { CreateExpenseInput, UpdateExpenseInput } from '../validators/expenses.schema.js'

// Récupère les dépenses d'une section appartenant à l'utilisateur, ordonnées.
export async function findBySection(sectionId: number, userId: string): Promise<Expense[]> {
  await assertSectionOwnership(sectionId, userId)
  return db.select().from(expenses).where(eq(expenses.sectionId, sectionId)).orderBy(expenses.sortOrder)
}

// Récupère une dépense par son ID, en vérifiant l'appartenance via section → mois.
export async function findById(id: number, userId: string): Promise<Expense | null> {
  const result = await db
    .select({ expense: expenses })
    .from(expenses)
    .innerJoin(sections, eq(expenses.sectionId, sections.id))
    .innerJoin(months, eq(sections.monthId, months.id))
    .where(and(eq(expenses.id, id), eq(months.userId, userId)))
    .limit(1)
  return result[0]?.expense ?? null
}

// Crée une dépense dans une section possédée par l'utilisateur.
// paidAt est posé automatiquement quand le statut est 'paid'.
export async function create(input: CreateExpenseInput, userId: string): Promise<Expense> {
  await assertSectionOwnership(input.sectionId, userId)

  const status = input.status ?? 'planned'

  const inserted = await db
    .insert(expenses)
    .values({
      sectionId: input.sectionId,
      name: input.name,
      amountPlanned: String(input.amountPlanned),
      status,
      ...(input.category !== undefined && { category: input.category }),
      ...(input.amountReal !== undefined && { amountReal: String(input.amountReal) }),
      ...(status === 'paid' && { paidAt: new Date() }),
      ...(input.isRecurring !== undefined && { isRecurring: input.isRecurring }),
      ...(input.sortOrder !== undefined && { sortOrder: input.sortOrder }),
    })
    .returning()
  return inserted[0]!
}

// Met à jour une dépense possédée par l'utilisateur.
// Un changement de statut synchronise paidAt (now si 'paid', null si 'planned').
export async function update(
  id: number,
  input: UpdateExpenseInput,
  userId: string,
): Promise<Expense> {
  const found = await db
    .select({ id: expenses.id })
    .from(expenses)
    .innerJoin(sections, eq(expenses.sectionId, sections.id))
    .innerJoin(months, eq(sections.monthId, months.id))
    .where(and(eq(expenses.id, id), eq(months.userId, userId)))
    .limit(1)

  if (!found[0]) throw new NotFoundError('Dépense introuvable.')

  const updated = await db
    .update(expenses)
    .set({
      ...(input.name !== undefined && { name: input.name }),
      ...(input.category !== undefined && { category: input.category }),
      ...(input.amountPlanned !== undefined && { amountPlanned: String(input.amountPlanned) }),
      ...(input.amountReal !== undefined && { amountReal: String(input.amountReal) }),
      ...(input.isRecurring !== undefined && { isRecurring: input.isRecurring }),
      ...(input.sortOrder !== undefined && { sortOrder: input.sortOrder }),
      ...(input.status !== undefined && {
        status: input.status,
        paidAt: input.status === 'paid' ? new Date() : null,
      }),
    })
    .where(eq(expenses.id, id))
    .returning()
  return updated[0]!
}

// Supprime une dépense possédée par l'utilisateur.
export async function remove(id: number, userId: string): Promise<void> {
  const found = await db
    .select({ id: expenses.id })
    .from(expenses)
    .innerJoin(sections, eq(expenses.sectionId, sections.id))
    .innerJoin(months, eq(sections.monthId, months.id))
    .where(and(eq(expenses.id, id), eq(months.userId, userId)))
    .limit(1)

  if (!found[0]) throw new NotFoundError('Dépense introuvable.')

  await db.delete(expenses).where(eq(expenses.id, id))
}
