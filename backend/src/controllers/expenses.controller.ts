import type { Request, Response } from 'express'
import * as expensesService from '../services/expenses.service.js'

export async function getBySection(req: Request, res: Response): Promise<void> {
  const data = await expensesService.findBySection(Number(req.params['sectionId']))
  res.json({ data })
}

export async function getById(req: Request, res: Response): Promise<void> {
  const data = await expensesService.findById(Number(req.params['id']))
  res.json({ data })
}

export async function create(req: Request, res: Response): Promise<void> {
  const data = await expensesService.create(req.body)
  res.status(201).json({ data })
}

export async function update(req: Request, res: Response): Promise<void> {
  const data = await expensesService.update(Number(req.params['id']), req.body)
  res.json({ data })
}

export async function remove(req: Request, res: Response): Promise<void> {
  await expensesService.remove(Number(req.params['id']))
  res.status(204).send()
}
