import { Router } from 'express'
import { requireAuth } from '../middlewares/auth.middleware.js'
import * as goalsController from '../controllers/goals.controller.js'

const router: ReturnType<typeof Router> = Router()

router.get('/', requireAuth, goalsController.getAll)
router.get('/:id', requireAuth, goalsController.getById)
router.post('/', requireAuth, goalsController.create)
router.put('/:id', requireAuth, goalsController.update)
router.delete('/:id', requireAuth, goalsController.remove)

export default router
