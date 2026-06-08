import type { Request, Response } from 'express'
import * as goalContributionsService from '../services/goal-contributions.service.js'

export async function getByGoal(req: Request, res: Response): Promise<void> {
  const data = await goalContributionsService.findByGoal(Number(req.params['goalId']))
  res.json({ data })
}

export async function getById(req: Request, res: Response): Promise<void> {
  const data = await goalContributionsService.findById(Number(req.params['id']))
  res.json({ data })
}

export async function create(req: Request, res: Response): Promise<void> {
  const data = await goalContributionsService.create(req.body)
  res.status(201).json({ data })
}

export async function update(req: Request, res: Response): Promise<void> {
  const data = await goalContributionsService.update(Number(req.params['id']), req.body)
  res.json({ data })
}

export async function remove(req: Request, res: Response): Promise<void> {
  await goalContributionsService.remove(Number(req.params['id']))
  res.status(204).send()
}
