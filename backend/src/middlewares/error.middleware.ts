import type { ErrorRequestHandler } from 'express'
import { ZodError } from 'zod'
import { AppError } from '../lib/errors.js'

// Codes d'erreur PostgreSQL remontés par le driver postgres-js.
const PG_UNIQUE_VIOLATION = '23505'
const PG_FK_VIOLATION = '23503'

/**
 * @desc    Gestionnaire d'erreurs central. Monté en dernier, après les routes.
 *          Express 5 forwarde automatiquement les rejets des handlers async ici.
 * @access  Middleware terminal
 */
export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  // Validation Zod → 400
  if (err instanceof ZodError) {
    res.status(400).json({ error: err.issues[0]?.message ?? 'Données invalides.' })
    return
  }

  // Erreurs métier explicites → leur statut
  if (err instanceof AppError) {
    res.status(err.status).json({ error: err.message })
    return
  }

  // Erreurs de contrainte PostgreSQL (transaction)
  if (err && typeof err === 'object' && 'code' in err) {
    const code = (err as { code: unknown }).code
    if (code === PG_UNIQUE_VIOLATION) {
      res.status(409).json({ error: 'Cette ressource existe déjà.' })
      return
    }
    if (code === PG_FK_VIOLATION) {
      res.status(400).json({ error: 'Référence invalide vers une ressource liée.' })
      return
    }
  }

  console.error('Erreur non gérée :', err)
  res.status(500).json({ error: 'Erreur interne du serveur.' })
}
