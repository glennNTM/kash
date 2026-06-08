import type { Request, Response } from 'express'
import * as sectionsService from '../services/sections.service.js'

export async function getByMonth(req: Request, res: Response): Promise<void> {
  const data = await sectionsService.findByMonth(Number(req.params['monthId']))
  res.json({ data })
}

export async function getById(req: Request, res: Response): Promise<void> {
  const data = await sectionsService.findById(Number(req.params['id']))
  res.json({ data })
}

export async function create(req: Request, res: Response): Promise<void> {
  const data = await sectionsService.create(req.body)
  res.status(201).json({ data })
}

export async function update(req: Request, res: Response): Promise<void> {
  const data = await sectionsService.update(Number(req.params['id']), req.body)
  res.json({ data })
}

export async function remove(req: Request, res: Response): Promise<void> {
  await sectionsService.remove(Number(req.params['id']))
  res.status(204).send()
}
