import type { Month, NewMonth } from '../db/schema/index.js'

export async function findAll(_userId: string): Promise<Month[]> {
  return []
}

export async function findById(_id: number): Promise<Month | null> {
  return null
}

export async function create(_data: Partial<NewMonth>): Promise<Month | null> {
  return null
}

export async function update(_id: number, _data: Partial<NewMonth>): Promise<Month | null> {
  return null
}

export async function remove(_id: number): Promise<void> {}
