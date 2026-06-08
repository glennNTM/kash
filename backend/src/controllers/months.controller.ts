import type { Request, Response } from 'express'
import * as monthsService from '../services/months.service.js'

export async function getAll(_req: Request, res: Response): Promise<void> {
  const data = await monthsService.findAll('')
  res.json({ data })
}

export async function getById(req: Request, res: Response): Promise<void> {
  const data = await monthsService.findById(Number(req.params['id']))
  res.json({ data })
}

export async function create(req: Request, res: Response): Promise<void> {
  const data = await monthsService.create(req.body)
  res.status(201).json({ data })
}

export async function update(req: Request, res: Response): Promise<void> {
  const data = await monthsService.update(Number(req.params['id']), req.body)
  res.json({ data })
}

export async function remove(req: Request, res: Response): Promise<void> {
  await monthsService.remove(Number(req.params['id']))
  res.status(204).send()
}
