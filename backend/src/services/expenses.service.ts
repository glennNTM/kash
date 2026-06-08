import type { Expense, NewExpense } from '../db/schema/index.js'

export async function findBySection(_sectionId: number): Promise<Expense[]> {
  return []
}

export async function findById(_id: number): Promise<Expense | null> {
  return null
}

export async function create(_data: Partial<NewExpense>): Promise<Expense | null> {
  return null
}

export async function update(_id: number, _data: Partial<NewExpense>): Promise<Expense | null> {
  return null
}

export async function remove(_id: number): Promise<void> {}
