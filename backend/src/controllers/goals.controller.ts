import type { Request, Response } from 'express'
import * as goalsService from '../services/goals.service.js'
import { parseId } from '../lib/params.js'
import type {
  CreateGoalInput,
  UpdateGoalInput,
} from '../validators/goals.schema.js'

/**
 * @route   GET /api/goals
 * @desc    Récupère les objectifs de l'utilisateur connecté
 * @access  Authentifié
 */
export async function getAll(_req: Request, res: Response): Promise<void> {
  const userId = res.locals['userId'] as string
  const data = await goalsService.findAll(userId)
  res.status(200).json({ data })
}

/**
 * @route   GET /api/goals/:id
 * @desc    Récupère un objectif par son ID
 * @access  Authentifié
 */
export async function getById(req: Request, res: Response): Promise<void> {
  const userId = res.locals['userId'] as string
  const id = parseId(req.params['id'], "ID de l'objectif")
  const data = await goalsService.findById(id, userId)

  if (!data) {
    res.status(404).json({ error: 'Objectif non trouvé.' })
    return
  }

  res.status(200).json({ data })
}

/**
 * @route   POST /api/goals
 * @desc    Crée un objectif (corps validé par Zod en amont)
 * @access  Authentifié
 */
export async function create(req: Request, res: Response): Promise<void> {
  const userId = res.locals['userId'] as string
  const data = await goalsService.create(req.body as CreateGoalInput, userId)
  res.status(201).json({ data })
}

/**
 * @route   PUT /api/goals/:id
 * @desc    Met à jour un objectif
 * @access  Authentifié
 */
export async function update(req: Request, res: Response): Promise<void> {
  const userId = res.locals['userId'] as string
  const id = parseId(req.params['id'], "ID de l'objectif")
  const data = await goalsService.update(
    id,
    req.body as UpdateGoalInput,
    userId
  )
  res.status(200).json({ data })
}

/**
 * @route   DELETE /api/goals/:id
 * @desc    Supprime un objectif
 * @access  Authentifié
 */
export async function remove(req: Request, res: Response): Promise<void> {
  const userId = res.locals['userId'] as string
  const id = parseId(req.params['id'], "ID de l'objectif")
  await goalsService.remove(id, userId)
  res.status(204).send()
}
