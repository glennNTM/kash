import { Router } from 'express'
import { requireAuth } from '../middlewares/auth.middleware.js'
import { validate } from '../middlewares/validate.middleware.js'
import { onboardingSchema } from '../validators/onboarding.schema.js'
import { create } from '../controllers/onboarding.controller.js'

const onboardingRouter: ReturnType<typeof Router> = Router()

onboardingRouter.post('/', requireAuth, validate(onboardingSchema), create)

export default onboardingRouter
