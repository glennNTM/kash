import { and, eq, ne, sum } from 'drizzle-orm'
import { db } from '../db/index.js'
import { sections, months } from '../db/schema/index.js'
import type { Section } from '../db/schema/index.js'
import { assertMonthOwnership } from '../lib/ownership.js'
import { BadRequestError, NotFoundError } from '../lib/errors.js'
import type { CreateSectionInput, UpdateSectionInput } from '../validators/sections.schema.js'

// Tolérance flottante pour la somme des pourcentages (évite de rejeter un 100% légitime).
const EPSILON = 1e-9

// Récupère les sections d'un mois appartenant à l'utilisateur, ordonnées.
export async function findByMonth(monthId: number, userId: string): Promise<Section[]> {
  await assertMonthOwnership(monthId, userId)
  return db.select().from(sections).where(eq(sections.monthId, monthId)).orderBy(sections.sortOrder)
}

// Récupère une section par son ID, en vérifiant l'appartenance via le mois.
export async function findById(id: number, userId: string): Promise<Section | null> {
  const result = await db
    .select({ section: sections })
    .from(sections)
    .innerJoin(months, eq(sections.monthId, months.id))
    .where(and(eq(sections.id, id), eq(months.userId, userId)))
    .limit(1)
  return result[0]?.section ?? null
}

// Crée une section. Refuse si la somme des pourcentages du mois dépasse 100%.
export async function create(input: CreateSectionInput, userId: string): Promise<Section> {
  await assertMonthOwnership(input.monthId, userId)

  return db.transaction(async (tx) => {
    const existing = await tx
      .select({ total: sum(sections.percentage) })
      .from(sections)
      .where(eq(sections.monthId, input.monthId))

    const currentTotal = Number(existing[0]?.total ?? 0)
    if (currentTotal + input.percentage > 1 + EPSILON) {
      throw new BadRequestError('La somme des pourcentages des sections dépasserait 100%.')
    }

    const inserted = await tx
      .insert(sections)
      .values({
        monthId: input.monthId,
        name: input.name,
        type: input.type,
        percentage: String(input.percentage),
        sortOrder: input.sortOrder ?? 0,
      })
      .returning()

    return inserted[0]!
  })
}

// Met à jour une section possédée par l'utilisateur. Revalide la somme des % si elle change.
export async function update(
  id: number,
  input: UpdateSectionInput,
  userId: string,
): Promise<Section> {
  return db.transaction(async (tx) => {
    const found = await tx
      .select({ section: sections })
      .from(sections)
      .innerJoin(months, eq(sections.monthId, months.id))
      .where(and(eq(sections.id, id), eq(months.userId, userId)))
      .limit(1)

    const current = found[0]?.section
    if (!current) throw new NotFoundError('Section introuvable.')

    if (input.percentage !== undefined) {
      // Somme des autres sections du mois (la section courante exclue).
      const others = await tx
        .select({ total: sum(sections.percentage) })
        .from(sections)
        .where(and(eq(sections.monthId, current.monthId), ne(sections.id, id)))

      const othersTotal = Number(others[0]?.total ?? 0)
      if (othersTotal + input.percentage > 1 + EPSILON) {
        throw new BadRequestError('La somme des pourcentages des sections dépasserait 100%.')
      }
    }

    const updated = await tx
      .update(sections)
      .set({
        ...(input.name !== undefined && { name: input.name }),
        ...(input.type !== undefined && { type: input.type }),
        ...(input.percentage !== undefined && { percentage: String(input.percentage) }),
        ...(input.sortOrder !== undefined && { sortOrder: input.sortOrder }),
      })
      .where(eq(sections.id, id))
      .returning()

    return updated[0]!
  })
}

// Supprime une section possédée par l'utilisateur.
export async function remove(id: number, userId: string): Promise<void> {
  const found = await db
    .select({ id: sections.id })
    .from(sections)
    .innerJoin(months, eq(sections.monthId, months.id))
    .where(and(eq(sections.id, id), eq(months.userId, userId)))
    .limit(1)

  if (!found[0]) throw new NotFoundError('Section introuvable.')

  await db.delete(sections).where(eq(sections.id, id))
}
