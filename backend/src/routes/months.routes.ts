import { Router } from 'express'
import { requireAuth } from '../middlewares/auth.middleware.js'
import { validate } from '../middlewares/validate.middleware.js'
import { createMonthSchema, updateMonthSchema } from '../validators/months.schema.js'
import { getAll, getById, create, update, remove } from '../controllers/months.controller.js'

const monthsRouter: ReturnType<typeof Router> = Router()

monthsRouter.get('/', requireAuth, getAll)
monthsRouter.get('/:id', requireAuth, getById)
monthsRouter.post('/', requireAuth, validate(createMonthSchema), create)
monthsRouter.put('/:id', requireAuth, validate(updateMonthSchema), update)
monthsRouter.delete('/:id', requireAuth, remove)

export default monthsRouter
