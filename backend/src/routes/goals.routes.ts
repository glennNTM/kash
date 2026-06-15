import { Router } from 'express'
import { requireAuth } from '../middlewares/auth.middleware.js'
import { getAll, getById, create, update, remove } from '../controllers/goals.controller.js'

const goalsRouter: ReturnType<typeof Router> = Router()

goalsRouter.get('/', requireAuth, getAll)
goalsRouter.get('/:id', requireAuth, getById)
goalsRouter.post('/', requireAuth, create)
goalsRouter.put('/:id', requireAuth, update)
goalsRouter.delete('/:id', requireAuth, remove)

export default goalsRouter
