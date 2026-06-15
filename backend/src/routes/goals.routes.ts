import { Router } from 'express'
import { requireAuth } from '../middlewares/auth.middleware.js'
import { validate } from '../middlewares/validate.middleware.js'
import { createGoalSchema, updateGoalSchema } from '../validators/goals.schema.js'
import { getAll, getById, create, update, remove } from '../controllers/goals.controller.js'

const goalsRouter: ReturnType<typeof Router> = Router()

goalsRouter.get('/', requireAuth, getAll)
goalsRouter.get('/:id', requireAuth, getById)
goalsRouter.post('/', requireAuth, validate(createGoalSchema), create)
goalsRouter.put('/:id', requireAuth, validate(updateGoalSchema), update)
goalsRouter.delete('/:id', requireAuth, remove)

export default goalsRouter
