import { Router } from 'express'
import { requireAuth } from '../middlewares/auth.middleware.js'
import { validate } from '../middlewares/validate.middleware.js'
import { createGoalContributionSchema, updateGoalContributionSchema } from '../validators/goal-contributions.schema.js'
import { getByGoal, getById, create, update, remove } from '../controllers/goal-contributions.controller.js'

const goalContributionsRouter: ReturnType<typeof Router> = Router()

goalContributionsRouter.get('/goal/:goalId', requireAuth, getByGoal)
goalContributionsRouter.get('/:id', requireAuth, getById)
goalContributionsRouter.post('/', requireAuth, validate(createGoalContributionSchema), create)
goalContributionsRouter.put('/:id', requireAuth, validate(updateGoalContributionSchema), update)
goalContributionsRouter.delete('/:id', requireAuth, remove)

export default goalContributionsRouter
