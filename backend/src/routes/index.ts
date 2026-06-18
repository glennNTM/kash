import { Router } from 'express'
import monthsRouter from './months.routes.js'
import incomesRouter from './incomes.routes.js'
import sectionsRouter from './sections.routes.js'
import expensesRouter from './expenses.routes.js'
import goalsRouter from './goals.routes.js'
import goalContributionsRouter from './goal-contributions.routes.js'
import onboardingRouter from './onboarding.routes.js'

const router: ReturnType<typeof Router> = Router()

router.use('/onboarding', onboardingRouter)
router.use('/months', monthsRouter)
router.use('/incomes', incomesRouter)
router.use('/sections', sectionsRouter)
router.use('/expenses', expensesRouter)
router.use('/goals', goalsRouter)
router.use('/goal-contributions', goalContributionsRouter)

export default router
