import { Router } from 'express'
import { requireAuth } from '../middlewares/auth.middleware.js'
import * as monthsController from '../controllers/months.controller.js'

const router: ReturnType<typeof Router> = Router()

router.get('/', requireAuth, monthsController.getAll)
router.get('/:id', requireAuth, monthsController.getById)
router.post('/', requireAuth, monthsController.create)
router.put('/:id', requireAuth, monthsController.update)
router.delete('/:id', requireAuth, monthsController.remove)

export default router
