import { eq, and, desc } from 'drizzle-orm'
import { db } from '../db/index.js'
import { months } from '../db/schema/index.js'
import type { Month, NewMonth } from '../db/schema/index.js'

// Logique pour récupèrer tous les mois de l'utilisateur connecté
export async function findAll(userId: string): Promise<Month[]> {
  return db
    .select()
    .from(months)
    .where(eq(months.userId, userId))
    .orderBy(desc(months.year), desc(months.month))
}

// Logique pour récupèrer un mois spécifique par son ID
export async function findById(id: number, userId: string): Promise<Month | null> {
  const result = await db
    .select()
    .from(months)
    .where(and(eq(months.id, id), eq(months.userId, userId)))
    .limit(1)
  return result[0] ?? null
}

export async function create(_data: Partial<NewMonth>): Promise<Month | null> {
  return null
}

export async function update(_id: number, _data: Partial<NewMonth>): Promise<Month | null> {
  return null
}

export async function remove(_id: number): Promise<void> {}
