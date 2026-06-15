import type { Request, Response, NextFunction } from 'express'
import type { ZodType } from 'zod'

type ValidationSource = 'body' | 'params'

/**
 * @desc    Valide une partie de la requête contre un schéma Zod.
 *          En cas d'échec, le ZodError remonte à l'error handler central (→ 400).
 *          Le corps validé (et typé) remplace req.body pour les contrôleurs.
 */
export const validate =
  (schema: ZodType, source: ValidationSource = 'body') =>
  (req: Request, _res: Response, next: NextFunction): void => {
    const data = schema.parse(req[source])
    if (source === 'body') req.body = data
    next()
  }
