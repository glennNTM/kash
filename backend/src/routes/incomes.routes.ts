import { Router } from 'express'
import { requireAuth } from '../middlewares/auth.middleware.js'
import { getByMonth, getById, create, update, remove } from '../controllers/incomes.controller.js'

const incomesRouter: ReturnType<typeof Router> = Router()

incomesRouter.get('/month/:monthId', requireAuth, getByMonth)
incomesRouter.get('/:id', requireAuth, getById)
incomesRouter.post('/', requireAuth, create)
incomesRouter.put('/:id', requireAuth, update)
incomesRouter.delete('/:id', requireAuth, remove)

export default incomesRouter
