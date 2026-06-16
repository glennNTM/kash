import type { Request, Response } from 'express'
import * as goalContributionsService from '../services/goal-contributions.service.js'
import { parseId } from '../lib/params.js'
import type {
  CreateGoalContributionInput,
  UpdateGoalContributionInput,
} from '../validators/goal-contributions.schema.js'

/**
 * @route   GET /api/goal-contributions/goal/:goalId
 * @desc    Récupère les contributions d'un objectif de l'utilisateur connecté
 * @access  Authentifié
 */
export async function getByGoal(req: Request, res: Response): Promise<void> {
  const userId = res.locals['userId'] as string
  const goalId = parseId(req.params['goalId'], "ID de l'objectif")
  const data = await goalContributionsService.findByGoal(goalId, userId)
  res.status(200).json({ data })
}

/**
 * @route   GET /api/goal-contributions/:id
 * @desc    Récupère une contribution par son ID
 * @access  Authentifié
 */
export async function getById(req: Request, res: Response): Promise<void> {
  const userId = res.locals['userId'] as string
  const id = parseId(req.params['id'], 'ID de la contribution')
  const data = await goalContributionsService.findById(id, userId)

  if (!data) {
    res.status(404).json({ error: 'Contribution non trouvée.' })
    return
  }

  res.status(200).json({ data })
}

/**
 * @route   POST /api/goal-contributions
 * @desc    Crée une contribution (corps validé par Zod en amont)
 * @access  Authentifié
 */
export async function create(req: Request, res: Response): Promise<void> {
  const userId = res.locals['userId'] as string
  const data = await goalContributionsService.create(req.body as CreateGoalContributionInput, userId)
  res.status(201).json({ data })
}

/**
 * @route   PUT /api/goal-contributions/:id
 * @desc    Met à jour une contribution
 * @access  Authentifié
 */
export async function update(req: Request, res: Response): Promise<void> {
  const userId = res.locals['userId'] as string
  const id = parseId(req.params['id'], 'ID de la contribution')
  const data = await goalContributionsService.update(id, req.body as UpdateGoalContributionInput, userId)
  res.status(200).json({ data })
}

/**
 * @route   DELETE /api/goal-contributions/:id
 * @desc    Supprime une contribution
 * @access  Authentifié
 */
export async function remove(req: Request, res: Response): Promise<void> {
  const userId = res.locals['userId'] as string
  const id = parseId(req.params['id'], 'ID de la contribution')
  await goalContributionsService.remove(id, userId)
  res.status(204).send()
}
