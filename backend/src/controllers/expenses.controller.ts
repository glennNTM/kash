import type { Request, Response } from 'express'
import * as expensesService from '../services/expenses.service.js'
import { parseId } from '../lib/params.js'
import type {
  CreateExpenseInput,
  UpdateExpenseInput,
} from '../validators/expenses.schema.js'

/**
 * @route   GET /api/expenses/section/:sectionId
 * @desc    Récupère les dépenses d'une section de l'utilisateur connecté
 * @access  Authentifié
 */
export async function getBySection(req: Request, res: Response): Promise<void> {
  const userId = res.locals['userId'] as string
  const sectionId = parseId(req.params['sectionId'], 'ID de la section')
  const data = await expensesService.findBySection(sectionId, userId)
  res.status(200).json({ data })
}

/**
 * @route   GET /api/expenses/:id
 * @desc    Récupère une dépense par son ID
 * @access  Authentifié
 */
export async function getById(req: Request, res: Response): Promise<void> {
  const userId = res.locals['userId'] as string
  const id = parseId(req.params['id'], 'ID de la dépense')
  const data = await expensesService.findById(id, userId)

  if (!data) {
    res.status(404).json({ error: 'Dépense non trouvée.' })
    return
  }

  res.status(200).json({ data })
}

/**
 * @route   POST /api/expenses
 * @desc    Crée une dépense (corps validé par Zod en amont)
 * @access  Authentifié
 */
export async function create(req: Request, res: Response): Promise<void> {
  const userId = res.locals['userId'] as string
  const data = await expensesService.create(
    req.body as CreateExpenseInput,
    userId
  )
  res.status(201).json({ data })
}

/**
 * @route   PUT /api/expenses/:id
 * @desc    Met à jour une dépense
 * @access  Authentifié
 */
export async function update(req: Request, res: Response): Promise<void> {
  const userId = res.locals['userId'] as string
  const id = parseId(req.params['id'], 'ID de la dépense')
  const data = await expensesService.update(
    id,
    req.body as UpdateExpenseInput,
    userId
  )
  res.status(200).json({ data })
}

/**
 * @route   DELETE /api/expenses/:id
 * @desc    Supprime une dépense
 * @access  Authentifié
 */
export async function remove(req: Request, res: Response): Promise<void> {
  const userId = res.locals['userId'] as string
  const id = parseId(req.params['id'], 'ID de la dépense')
  await expensesService.remove(id, userId)
  res.status(204).send()
}
