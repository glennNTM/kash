import type { Income, NewIncome } from '../db/schema/index.js'

export async function findByMonth(_monthId: number): Promise<Income[]> {
  return []
}

export async function findById(_id: number): Promise<Income | null> {
  return null
}

export async function create(_data: Partial<NewIncome>): Promise<Income | null> {
  return null
}

export async function update(_id: number, _data: Partial<NewIncome>): Promise<Income | null> {
  return null
}

export async function remove(_id: number): Promise<void> {}
