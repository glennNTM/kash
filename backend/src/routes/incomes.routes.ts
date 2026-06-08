import { Router } from 'express'
import { requireAuth } from '../middlewares/auth.middleware.js'
import * as incomesController from '../controllers/incomes.controller.js'

const router: ReturnType<typeof Router> = Router()

router.get('/month/:monthId', requireAuth, incomesController.getByMonth)
router.get('/:id', requireAuth, incomesController.getById)
router.post('/', requireAuth, incomesController.create)
router.put('/:id', requireAuth, incomesController.update)
router.delete('/:id', requireAuth, incomesController.remove)

export default router
