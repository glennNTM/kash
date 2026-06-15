import type { Request, Response } from 'express'
import * as monthsService from '../services/months.service.js'

/**
 * @route   GET /api/months
 * @desc    Récupère tous les mois de l'utilisateur connecté
 * @access  Authentifié
 */
export async function getAll(_req: Request, res: Response): Promise<void> {
  try {
    const userId = res.locals['userId'] as string

    if (!userId) {
      res.status(401).json({ error: 'Non authentifié.' })
      return
    }

    const data = await monthsService.findAll(userId)

    res.status(200).json({ data })
  } catch (error) {
    console.error('Erreur GET /api/months :', error)
    res.status(500).json({ error: 'Erreur interne du serveur. Impossible de récupérer les mois.' })
  }
}

/**
 * @route   GET /api/months/:id
 * @desc    Récupère un mois spécifique par son ID
 * @access  Authentifié
 */
export async function getById(req: Request, res: Response): Promise<void> {
  try {
    const userId = res.locals['userId'] as string

    if (!userId) {
      res.status(401).json({ error: 'Non authentifié.' })
      return
    }

    // Récupération et validation de l'ID depuis les paramètres d'URL
    const id = parseInt(req.params['id'] as string, 10)

    if (isNaN(id)) {
      res.status(400).json({ error: 'ID du mois invalide.' })
      return
    }

    const data = await monthsService.findById(id, userId)

    if (!data) {
      res.status(404).json({ error: 'Mois non trouvé.' })
      return
    }

    res.status(200).json({ data })
  } catch (error) {
    console.error('Erreur GET /api/months/:id :', error)
    res.status(500).json({ error: 'Erreur interne du serveur. Impossible de récupérer le mois.' })
  }
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
