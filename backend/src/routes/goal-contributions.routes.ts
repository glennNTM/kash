import { Router } from 'express'
import { requireAuth } from '../middlewares/auth.middleware.js'
import * as goalContributionsController from '../controllers/goal-contributions.controller.js'

const router: ReturnType<typeof Router> = Router()

router.get('/goal/:goalId', requireAuth, goalContributionsController.getByGoal)
router.get('/:id', requireAuth, goalContributionsController.getById)
router.post('/', requireAuth, goalContributionsController.create)
router.put('/:id', requireAuth, goalContributionsController.update)
router.delete('/:id', requireAuth, goalContributionsController.remove)

export default router
