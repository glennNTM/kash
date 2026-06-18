import type { Request, Response } from 'express'
import * as sectionsService from '../services/sections.service.js'
import { parseId } from '../lib/params.js'
import type {
  CreateSectionInput,
  UpdateSectionInput,
  UpdatePercentagesInput,
} from '../validators/sections.schema.js'

/**
 * @route   GET /api/sections/month/:monthId
 * @desc    Récupère les sections d'un mois de l'utilisateur connecté
 * @access  Authentifié
 */
export async function getByMonth(req: Request, res: Response): Promise<void> {
  const userId = res.locals['userId'] as string
  const monthId = parseId(req.params['monthId'], 'ID du mois')
  const data = await sectionsService.findByMonth(monthId, userId)
  res.status(200).json({ data })
}

/**
 * @route   GET /api/sections/:id
 * @desc    Récupère une section par son ID
 * @access  Authentifié
 */
export async function getById(req: Request, res: Response): Promise<void> {
  const userId = res.locals['userId'] as string
  const id = parseId(req.params['id'], 'ID de la section')
  const data = await sectionsService.findById(id, userId)

  if (!data) {
    res.status(404).json({ error: 'Section non trouvée.' })
    return
  }

  res.status(200).json({ data })
}

/**
 * @route   POST /api/sections
 * @desc    Crée une section (corps validé par Zod en amont)
 * @access  Authentifié
 */
export async function create(req: Request, res: Response): Promise<void> {
  const userId = res.locals['userId'] as string
  const data = await sectionsService.create(
    req.body as CreateSectionInput,
    userId
  )
  res.status(201).json({ data })
}

/**
 * @route   PUT /api/sections/:id
 * @desc    Met à jour une section
 * @access  Authentifié
 */
export async function update(req: Request, res: Response): Promise<void> {
  const userId = res.locals['userId'] as string
  const id = parseId(req.params['id'], 'ID de la section')
  const data = await sectionsService.update(
    id,
    req.body as UpdateSectionInput,
    userId
  )
  res.status(200).json({ data })
}

/**
 * @route   PUT /api/sections/month/:monthId/percentages
 * @desc    Met à jour la répartition complète d'un mois (somme = 100%, en transaction)
 * @access  Authentifié
 */
export async function updatePercentages(
  req: Request,
  res: Response
): Promise<void> {
  const userId = res.locals['userId'] as string
  const monthId = parseId(req.params['monthId'], 'ID du mois')
  const { percentages } = req.body as UpdatePercentagesInput
  const data = await sectionsService.updatePercentages(
    monthId,
    userId,
    percentages
  )
  res.status(200).json({ data })
}

/**
 * @route   DELETE /api/sections/:id
 * @desc    Supprime une section
 * @access  Authentifié
 */
export async function remove(req: Request, res: Response): Promise<void> {
  const userId = res.locals['userId'] as string
  const id = parseId(req.params['id'], 'ID de la section')
  await sectionsService.remove(id, userId)
  res.status(204).send()
}
