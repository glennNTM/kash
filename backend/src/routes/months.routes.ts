import { Router } from 'express'
import { requireAuth } from '../middlewares/auth.middleware.js'
import { getAll, getById, create, update, remove } from '../controllers/months.controller.js'

const monthsRouter: ReturnType<typeof Router> = Router()

monthsRouter.get('/', requireAuth, getAll)
monthsRouter.get('/:id', requireAuth, getById)
monthsRouter.post('/', requireAuth, create)
monthsRouter.put('/:id', requireAuth, update)
monthsRouter.delete('/:id', requireAuth, remove)

export default monthsRouter
