import type { Section, NewSection } from '../db/schema/index.js'

export async function findByMonth(_monthId: number): Promise<Section[]> {
  return []
}

export async function findById(_id: number): Promise<Section | null> {
  return null
}

export async function create(_data: Partial<NewSection>): Promise<Section | null> {
  return null
}

export async function update(_id: number, _data: Partial<NewSection>): Promise<Section | null> {
  return null
}

export async function remove(_id: number): Promise<void> {}
