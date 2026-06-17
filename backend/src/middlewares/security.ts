import { type NextFunction, type Request, type Response } from 'express'
import { slidingWindow } from '@arcjet/node'
import { isSpoofedBot } from '@arcjet/inspect'
import aj from '../config/arcjet.js'

/**
 * @desc    Middleware de sécurité Arcjet : shield + bots (base) + rate limit paramétrable.
 * @param   limit    Nombre max de requêtes par IP sur la fenêtre.
 * @param   interval Fenêtre glissante (défaut '1m').
 * @access  Monté sur les routes sensibles (auth, mutations API), pas en global.
 */
const securityMiddleware = (limit: number, interval: string = '1m') => {
  // On superpose le rate limit à l'instance de base (shield + detectBot).
  const client = aj.withRule(
    slidingWindow({
      mode: 'LIVE',
      interval,
      max: limit,
    })
  )

  return async (req: Request, res: Response, next: NextFunction) => {
    // En test, on court-circuite Arcjet pour ne pas dépendre du réseau.
    if (process.env.NODE_ENV === 'test') return next()

    try {
      // @arcjet/node accepte la requête Express brute, pas besoin de la reconstruire.
      const decision = await client.protect(req)

      if (decision.isDenied()) {
        // Rate limit dépassé → 429
        if (decision.reason.isRateLimit()) {
          return res
            .status(429)
            .json({ error: 'Trop de requêtes, réessaie dans un instant' })
        }
        // Bot non autorisé → 403
        if (decision.reason.isBot()) {
          return res
            .status(403)
            .json({ error: 'Accès refusé : activité de bot détectée' })
        }
        // Shield et autres → 403
        return res.status(403).json({ error: 'Requête refusée' })
      }

      // Bot usurpant un user-agent légitime (ex: faux Googlebot).
      if (decision.results.some(isSpoofedBot)) {
        return res
          .status(403)
          .json({ error: 'Accès refusé : bot usurpé détecté' })
      }

      next()
    } catch (error) {
      console.error('Arcjet middleware error: ', error)
      res
        .status(500)
        .json({ error: 'Erreur interne du middleware de sécurité' })
    }
  }
}

export default securityMiddleware
