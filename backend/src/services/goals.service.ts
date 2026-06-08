import type { Goal, NewGoal } from '../db/schema/index.js'

export async function findAll(_userId: string): Promise<Goal[]> {
  return []
}

export async function findById(_id: number): Promise<Goal | null> {
  return null
}

export async function create(_data: Partial<NewGoal>): Promise<Goal | null> {
  return null
}

export async function update(_id: number, _data: Partial<NewGoal>): Promise<Goal | null> {
  return null
}

export async function remove(_id: number): Promise<void> {}
