import { Router } from 'express'
import { requireAuth } from '../middlewares/auth.middleware.js'
import { validate } from '../middlewares/validate.middleware.js'
import {
  createIncomeSchema,
  updateIncomeSchema,
} from '../validators/incomes.schema.js'
import {
  getByMonth,
  getById,
  create,
  update,
  remove,
} from '../controllers/incomes.controller.js'

const incomesRouter: ReturnType<typeof Router> = Router()

incomesRouter.get('/month/:monthId', requireAuth, getByMonth)
incomesRouter.get('/:id', requireAuth, getById)
incomesRouter.post('/', requireAuth, validate(createIncomeSchema), create)
incomesRouter.put('/:id', requireAuth, validate(updateIncomeSchema), update)
incomesRouter.delete('/:id', requireAuth, remove)

export default incomesRouter
