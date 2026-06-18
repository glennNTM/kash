import type { Request, Response } from 'express'
import * as onboardingService from '../services/onboarding.service.js'
import type { OnboardingInput } from '../validators/onboarding.schema.js'

/**
 * @route   POST /api/onboarding
 * @desc    Crée le budget initial (mois + revenu + sections + 1re dépense) en une transaction.
 * @access  Authentifié
 */
export async function create(req: Request, res: Response): Promise<void> {
  const userId = res.locals['userId'] as string
  const data = await onboardingService.createOnboarding(
    userId,
    req.body as OnboardingInput
  )
  res.status(201).json({ data })
}
