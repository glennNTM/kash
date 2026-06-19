import type { Request, Response } from 'express'
import * as incomesService from '../services/incomes.service.js'
import { parseId } from '../lib/params.js'
import type {
  CreateIncomeInput,
  UpdateIncomeInput,
} from '../validators/incomes.schema.js'

/**
 * @route   GET /api/incomes/month/:monthId
 * @desc    Récupère les revenus d'un mois de l'utilisateur connecté
 * @access  Authentifié
 */
export async function getByMonth(req: Request, res: Response): Promise<void> {
  const userId = res.locals['userId'] as string
  const monthId = parseId(req.params['monthId'], 'ID du mois')
  const data = await incomesService.findByMonth(monthId, userId)
  res.status(200).json({ data })
}

/**
 * @route   GET /api/incomes/:id
 * @desc    Récupère un revenu par son ID
 * @access  Authentifié
 */
export async function getById(req: Request, res: Response): Promise<void> {
  const userId = res.locals['userId'] as string
  const id = parseId(req.params['id'], 'ID du revenu')
  const data = await incomesService.findById(id, userId)

  if (!data) {
    res.status(404).json({ error: 'Revenu non trouvé.' })
    return
  }

  res.status(200).json({ data })
}

/**
 * @route   POST /api/incomes
 * @desc    Crée un revenu (corps validé par Zod en amont)
 * @access  Authentifié
 */
export async function create(req: Request, res: Response): Promise<void> {
  const userId = res.locals['userId'] as string
  const data = await incomesService.create(
    req.body as CreateIncomeInput,
    userId
  )
  res.status(201).json({ data })
}

/**
 * @route   PUT /api/incomes/:id
 * @desc    Met à jour un revenu
 * @access  Authentifié
 */
export async function update(req: Request, res: Response): Promise<void> {
  const userId = res.locals['userId'] as string
  const id = parseId(req.params['id'], 'ID du revenu')
  const data = await incomesService.update(
    id,
    req.body as UpdateIncomeInput,
    userId
  )
  res.status(200).json({ data })
}

/**
 * @route   DELETE /api/incomes/:id
 * @desc    Supprime un revenu
 * @access  Authentifié
 */
export async function remove(req: Request, res: Response): Promise<void> {
  const userId = res.locals['userId'] as string
  const id = parseId(req.params['id'], 'ID du revenu')
  await incomesService.remove(id, userId)
  res.status(204).send()
}
