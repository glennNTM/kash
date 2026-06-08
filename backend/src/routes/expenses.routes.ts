import { Router } from 'express'
import { requireAuth } from '../middlewares/auth.middleware.js'
import * as expensesController from '../controllers/expenses.controller.js'

const router: ReturnType<typeof Router> = Router()

router.get('/section/:sectionId', requireAuth, expensesController.getBySection)
router.get('/:id', requireAuth, expensesController.getById)
router.post('/', requireAuth, expensesController.create)
router.put('/:id', requireAuth, expensesController.update)
router.delete('/:id', requireAuth, expensesController.remove)

export default router
