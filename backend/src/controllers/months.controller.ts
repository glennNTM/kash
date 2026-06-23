import type { Request, Response } from 'express'
import * as monthsService from '../services/months.service.js'
import { parseId } from '../lib/params.js'
import { monthByDateQuerySchema } from '../validators/months.schema.js'
import type {
  CreateMonthInput,
  UpdateMonthInput,
} from '../validators/months.schema.js'

/**
 * @route   GET /api/months
 * @desc    Récupère tous les mois de l'utilisateur connecté. Avec ?details=true,
 *          inclut les sections et dépenses imbriquées (vues globales / tendances).
 * @access  Authentifié
 */
export async function getAll(req: Request, res: Response): Promise<void> {
  const userId = res.locals['userId'] as string
  const data =
    req.query['details'] === 'true'
      ? await monthsService.findAllWithDetails(userId)
      : await monthsService.findAll(userId)
  res.status(200).json({ data })
}

/**
 * @route   GET /api/months/by-date?year=&month=
 * @desc    Récupère le mois (année + mois) avec ses sections et dépenses imbriquées.
 *          Sert le dashboard en une requête. 404 si aucun budget pour cette période.
 * @access  Authentifié
 */
export async function getByDate(req: Request, res: Response): Promise<void> {
  const userId = res.locals['userId'] as string
  // La query est en lecture seule en Express 5 → on valide ici (ZodError → 400 via l'error handler).
  const { year, month } = monthByDateQuerySchema.parse(req.query)
  const data = await monthsService.findByDateWithDetails(userId, year, month)

  if (!data) {
    res.status(404).json({ error: 'Aucun budget pour ce mois.' })
    return
  }

  res.status(200).json({ data })
}

/**
 * @route   GET /api/months/:id
 * @desc    Récupère un mois spécifique par son ID
 * @access  Authentifié
 */
export async function getById(req: Request, res: Response): Promise<void> {
  const userId = res.locals['userId'] as string
  const id = parseId(req.params['id'], 'ID du mois')
  const data = await monthsService.findById(id, userId)

  if (!data) {
    res.status(404).json({ error: 'Mois non trouvé.' })
    return
  }

  res.status(200).json({ data })
}

/**
 * @route   POST /api/months
 * @desc    Crée un mois (corps validé par Zod en amont)
 * @access  Authentifié
 */
export async function create(req: Request, res: Response): Promise<void> {
  const userId = res.locals['userId'] as string
  const data = await monthsService.create(req.body as CreateMonthInput, userId)
  res.status(201).json({ data })
}

/**
 * @route   PUT /api/months/:id
 * @desc    Met à jour un mois
 * @access  Authentifié
 */
export async function update(req: Request, res: Response): Promise<void> {
  const userId = res.locals['userId'] as string
  const id = parseId(req.params['id'], 'ID du mois')
  const data = await monthsService.update(
    id,
    req.body as UpdateMonthInput,
    userId
  )
  res.status(200).json({ data })
}

/**
 * @route   DELETE /api/months/:id
 * @desc    Supprime un mois
 * @access  Authentifié
 */
export async function remove(req: Request, res: Response): Promise<void> {
  const userId = res.locals['userId'] as string
  const id = parseId(req.params['id'], 'ID du mois')
  await monthsService.remove(id, userId)
  res.status(204).send()
}
