import type { Request, Response } from 'express'
import * as goalsService from '../services/goals.service.js'

export async function getAll(_req: Request, res: Response): Promise<void> {
  const data = await goalsService.findAll('')
  res.json({ data })
}

export async function getById(req: Request, res: Response): Promise<void> {
  const data = await goalsService.findById(Number(req.params['id']))
  res.json({ data })
}

export async function create(req: Request, res: Response): Promise<void> {
  const data = await goalsService.create(req.body)
  res.status(201).json({ data })
}

export async function update(req: Request, res: Response): Promise<void> {
  const data = await goalsService.update(Number(req.params['id']), req.body)
  res.json({ data })
}

export async function remove(req: Request, res: Response): Promise<void> {
  await goalsService.remove(Number(req.params['id']))
  res.status(204).send()
}
