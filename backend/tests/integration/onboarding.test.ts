import { describe, it, expect, beforeEach, vi } from 'vitest'
import request from 'supertest'

// On mocke le middleware d'auth (session injectée) et le service (db mické) :
// le test couvre le contrat route ↔ validation ↔ controller, pas le SQL réel.
vi.mock('../../src/middlewares/auth.middleware.js', () => ({
  requireAuth: (
    _req: unknown,
    res: { locals: Record<string, unknown> },
    next: () => void
  ) => {
    res.locals['userId'] = 'test-user'
    next()
  },
}))

vi.mock('../../src/services/onboarding.service.js', () => ({
  createOnboarding: vi.fn(),
}))

const { createOnboarding } =
  await import('../../src/services/onboarding.service.js')
const { default: app } = await import('../../src/app.js')

function validPayload() {
  return {
    month: 6,
    year: 2026,
    income: { name: 'Salaire', amount: 300000 },
    allocation: [
      { name: 'Charges fixes', type: 'charges', percentage: 0.5 },
      { name: 'Épargne', type: 'epargne', percentage: 0.3 },
      { name: 'Loisirs', type: 'loisirs', percentage: 0.2 },
    ],
    firstExpense: { sectionIndex: 0, name: 'Loyer', amountPlanned: 120000 },
  }
}

describe('POST /api/onboarding', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('crée le budget initial et renvoie 201', async () => {
    vi.mocked(createOnboarding).mockResolvedValue({ id: 1 } as never)

    const res = await request(app).post('/api/onboarding').send(validPayload())

    expect(res.status).toBe(201)
    expect(res.body).toEqual({ data: { id: 1 } })
    // Le userId injecté par l'auth est bien transmis au service.
    expect(createOnboarding).toHaveBeenCalledWith(
      'test-user',
      expect.objectContaining({ month: 6, year: 2026 })
    )
  })

  it('rejette un payload invalide en 400 sans appeler le service', async () => {
    const bad = validPayload()
    bad.allocation[2]!.percentage = 0.3 // total = 110%

    const res = await request(app).post('/api/onboarding').send(bad)

    expect(res.status).toBe(400)
    expect(res.body).toHaveProperty('error')
    expect(createOnboarding).not.toHaveBeenCalled()
  })
})
