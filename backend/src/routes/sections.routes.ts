import { Router } from 'express'
import { requireAuth } from '../middlewares/auth.middleware.js'
import * as sectionsController from '../controllers/sections.controller.js'

const router: ReturnType<typeof Router> = Router()

router.get('/month/:monthId', requireAuth, sectionsController.getByMonth)
router.get('/:id', requireAuth, sectionsController.getById)
router.post('/', requireAuth, sectionsController.create)
router.put('/:id', requireAuth, sectionsController.update)
router.delete('/:id', requireAuth, sectionsController.remove)

export default router
