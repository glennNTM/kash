import { and, eq } from 'drizzle-orm'
import { db } from '../db/index.js'
import { goalContributions, goals } from '../db/schema/index.js'
import type { GoalContribution } from '../db/schema/index.js'
import { assertGoalOwnership, assertMonthOwnership } from '../lib/ownership.js'
import { NotFoundError } from '../lib/errors.js'
import type {
  CreateGoalContributionInput,
  UpdateGoalContributionInput,
} from '../validators/goal-contributions.schema.js'

// Récupère les contributions d'un objectif appartenant à l'utilisateur.
export async function findByGoal(
  goalId: number,
  userId: string
): Promise<GoalContribution[]> {
  await assertGoalOwnership(goalId, userId)
  return db
    .select()
    .from(goalContributions)
    .where(eq(goalContributions.goalId, goalId))
}

// Récupère une contribution par son ID, en vérifiant l'appartenance via l'objectif.
export async function findById(
  id: number,
  userId: string
): Promise<GoalContribution | null> {
  const result = await db
    .select({ contribution: goalContributions })
    .from(goalContributions)
    .innerJoin(goals, eq(goalContributions.goalId, goals.id))
    .where(and(eq(goalContributions.id, id), eq(goals.userId, userId)))
    .limit(1)
  return result[0]?.contribution ?? null
}

// Crée une contribution. L'objectif ET le mois doivent appartenir à l'utilisateur.
// La contrainte unique (goalId, monthId) → 409 via l'error handler.
export async function create(
  input: CreateGoalContributionInput,
  userId: string
): Promise<GoalContribution> {
  await assertGoalOwnership(input.goalId, userId)
  await assertMonthOwnership(input.monthId, userId)

  const inserted = await db
    .insert(goalContributions)
    .values({
      goalId: input.goalId,
      monthId: input.monthId,
      name: input.name,
      amount: String(input.amount),
    })
    .returning()
  return inserted[0]!
}

// Met à jour une contribution possédée par l'utilisateur (nom / montant).
export async function update(
  id: number,
  input: UpdateGoalContributionInput,
  userId: string
): Promise<GoalContribution> {
  const found = await db
    .select({ id: goalContributions.id })
    .from(goalContributions)
    .innerJoin(goals, eq(goalContributions.goalId, goals.id))
    .where(and(eq(goalContributions.id, id), eq(goals.userId, userId)))
    .limit(1)

  if (!found[0]) throw new NotFoundError('Contribution introuvable.')

  const updated = await db
    .update(goalContributions)
    .set({
      ...(input.name !== undefined && { name: input.name }),
      ...(input.amount !== undefined && { amount: String(input.amount) }),
    })
    .where(eq(goalContributions.id, id))
    .returning()
  return updated[0]!
}

// Supprime une contribution possédée par l'utilisateur.
export async function remove(id: number, userId: string): Promise<void> {
  const found = await db
    .select({ id: goalContributions.id })
    .from(goalContributions)
    .innerJoin(goals, eq(goalContributions.goalId, goals.id))
    .where(and(eq(goalContributions.id, id), eq(goals.userId, userId)))
    .limit(1)

  if (!found[0]) throw new NotFoundError('Contribution introuvable.')

  await db.delete(goalContributions).where(eq(goalContributions.id, id))
}
