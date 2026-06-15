import { Router } from 'express'
import { requireAuth } from '../middlewares/auth.middleware.js'
import { validate } from '../middlewares/validate.middleware.js'
import { createSectionSchema, updateSectionSchema } from '../validators/sections.schema.js'
import { getByMonth, getById, create, update, remove } from '../controllers/sections.controller.js'

const sectionsRouter: ReturnType<typeof Router> = Router()

sectionsRouter.get('/month/:monthId', requireAuth, getByMonth)
sectionsRouter.get('/:id', requireAuth, getById)
sectionsRouter.post('/', requireAuth, validate(createSectionSchema), create)
sectionsRouter.put('/:id', requireAuth, validate(updateSectionSchema), update)
sectionsRouter.delete('/:id', requireAuth, remove)

export default sectionsRouter
