import type { GoalContribution, NewGoalContribution } from '../db/schema/index.js'

export async function findByGoal(_goalId: number): Promise<GoalContribution[]> {
  return []
}

export async function findById(_id: number): Promise<GoalContribution | null> {
  return null
}

export async function create(_data: Partial<NewGoalContribution>): Promise<GoalContribution | null> {
  return null
}

export async function update(
  _id: number,
  _data: Partial<NewGoalContribution>,
): Promise<GoalContribution | null> {
  return null
}

export async function remove(_id: number): Promise<void> {}
