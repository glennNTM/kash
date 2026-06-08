import { Router } from 'express'
import { requireAuth } from '../middlewares/auth.middleware.js'
import { getByGoal, getById, create, update, remove } from '../controllers/goal-contributions.controller.js'

const goalContributionsRouter: ReturnType<typeof Router> = Router()

goalContributionsRouter.get('/goal/:goalId', requireAuth, getByGoal)
goalContributionsRouter.get('/:id', requireAuth, getById)
goalContributionsRouter.post('/', requireAuth, create)
goalContributionsRouter.put('/:id', requireAuth, update)
goalContributionsRouter.delete('/:id', requireAuth, remove)

export default goalContributionsRouter
