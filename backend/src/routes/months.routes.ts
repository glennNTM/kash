import { Router } from 'express'
import { requireAuth } from '../middlewares/auth.middleware.js'
import { validate } from '../middlewares/validate.middleware.js'
import { createMonthSchema, updateMonthSchema } from '../validators/months.schema.js'
import { getAll, getByDate, getById, create, update, remove } from '../controllers/months.controller.js'

const monthsRouter: ReturnType<typeof Router> = Router()

monthsRouter.get('/', requireAuth, getAll)
// Avant /:id : sinon "by-date" serait capturé comme un id.
monthsRouter.get('/by-date', requireAuth, getByDate)
monthsRouter.get('/:id', requireAuth, getById)
monthsRouter.post('/', requireAuth, validate(createMonthSchema), create)
monthsRouter.put('/:id', requireAuth, validate(updateMonthSchema), update)
monthsRouter.delete('/:id', requireAuth, remove)

export default monthsRouter
