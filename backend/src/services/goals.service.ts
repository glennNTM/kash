import { and, desc, eq } from 'drizzle-orm'
import { db } from '../db/index.js'
import { goals } from '../db/schema/index.js'
import type { Goal } from '../db/schema/index.js'
import { NotFoundError } from '../lib/errors.js'
import type { CreateGoalInput, UpdateGoalInput } from '../validators/goals.schema.js'

// Récupère les objectifs de l'utilisateur, les plus récents d'abord.
export async function findAll(userId: string): Promise<Goal[]> {
  return db.select().from(goals).where(eq(goals.userId, userId)).orderBy(desc(goals.createdAt))
}

// Récupère un objectif de l'utilisateur par son ID.
export async function findById(id: number, userId: string): Promise<Goal | null> {
  const result = await db
    .select()
    .from(goals)
    .where(and(eq(goals.id, id), eq(goals.userId, userId)))
    .limit(1)
  return result[0] ?? null
}

// Crée un objectif pour l'utilisateur.
export async function create(input: CreateGoalInput, userId: string): Promise<Goal> {
  const inserted = await db
    .insert(goals)
    .values({
      userId,
      name: input.name,
      targetAmount: String(input.targetAmount),
      ...(input.deadline !== undefined && { deadline: input.deadline }),
      ...(input.isCompleted !== undefined && { isCompleted: input.isCompleted }),
      ...(input.sortOrder !== undefined && { sortOrder: input.sortOrder }),
    })
    .returning()
  return inserted[0]!
}

// Met à jour un objectif possédé par l'utilisateur.
export async function update(id: number, input: UpdateGoalInput, userId: string): Promise<Goal> {
  const updated = await db
    .update(goals)
    .set({
      ...(input.name !== undefined && { name: input.name }),
      ...(input.targetAmount !== undefined && { targetAmount: String(input.targetAmount) }),
      ...(input.deadline !== undefined && { deadline: input.deadline }),
      ...(input.isCompleted !== undefined && { isCompleted: input.isCompleted }),
      ...(input.sortOrder !== undefined && { sortOrder: input.sortOrder }),
    })
    .where(and(eq(goals.id, id), eq(goals.userId, userId)))
    .returning()

  const row = updated[0]
  if (!row) throw new NotFoundError('Objectif introuvable.')
  return row
}

// Supprime un objectif possédé par l'utilisateur (cascade sur ses contributions).
export async function remove(id: number, userId: string): Promise<void> {
  const deleted = await db
    .delete(goals)
    .where(and(eq(goals.id, id), eq(goals.userId, userId)))
    .returning({ id: goals.id })

  if (!deleted[0]) throw new NotFoundError('Objectif introuvable.')
}
