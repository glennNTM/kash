import { Router } from 'express'
import { requireAuth } from '../middlewares/auth.middleware.js'
import { getBySection, getById, create, update, remove } from '../controllers/expenses.controller.js'

const expensesRouter: ReturnType<typeof Router> = Router()

expensesRouter.get('/section/:sectionId', requireAuth, getBySection)
expensesRouter.get('/:id', requireAuth, getById)
expensesRouter.post('/', requireAuth, create)
expensesRouter.put('/:id', requireAuth, update)
expensesRouter.delete('/:id', requireAuth, remove)

export default expensesRouter
