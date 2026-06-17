import type { Request, Response, NextFunction } from 'express'
import { fromNodeHeaders } from 'better-auth/node'
import { auth } from '../lib/auth.js'

/**
 * Vérifie la session Better Auth et expose l'utilisateur aux controllers
 * via res.locals (userId / user). Répond 401 si aucune session valide.
 */
export async function requireAuth(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    })

    if (!session) {
      res.status(401).json({ error: 'Non authentifié.' })
      return
    }

    res.locals['userId'] = session.user.id
    res.locals['user'] = session.user
    next()
  } catch (error) {
    console.error('Erreur requireAuth :', error)
    res.status(401).json({ error: 'Session invalide.' })
  }
}
