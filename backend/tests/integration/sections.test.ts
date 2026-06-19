import { describe, it, expect, beforeEach, vi } from 'vitest'
import request from 'supertest'
import { BadRequestError } from '../../src/lib/errors.js'

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

vi.mock('../../src/services/sections.service.js', () => ({
  findById: vi.fn(),
  create: vi.fn(),
}))

const sectionsService = await import('../../src/services/sections.service.js')
const { default: app } = await import('../../src/app.js')

describe('sections — routes', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('GET /api/sections/:id renvoie 404 quand la section est introuvable', async () => {
    vi.mocked(sectionsService.findById).mockResolvedValue(null)

    const res = await request(app).get('/api/sections/999')

    expect(res.status).toBe(404)
    expect(res.body).toHaveProperty('error')
  })

  it('POST /api/sections propage une 400 quand la somme des % dépasserait 100%', async () => {
    vi.mocked(sectionsService.create).mockRejectedValue(
      new BadRequestError(
        'La somme des pourcentages des sections dépasserait 100%.'
      )
    )

    const res = await request(app).post('/api/sections').send({
      monthId: 1,
      name: 'Loisirs',
      type: 'loisirs',
      percentage: 0.5,
    })

    expect(res.status).toBe(400)
    expect(res.body.error).toMatch(/100%/)
  })

  it('POST /api/sections rejette en 400 un pourcentage sous 10% (validation Zod)', async () => {
    const res = await request(app).post('/api/sections').send({
      monthId: 1,
      name: 'Loisirs',
      type: 'loisirs',
      percentage: 0.05,
    })

    expect(res.status).toBe(400)
    expect(sectionsService.create).not.toHaveBeenCalled()
  })

  it('GET /api/sections/:id rejette en 400 un id non numérique', async () => {
    const res = await request(app).get('/api/sections/abc')

    expect(res.status).toBe(400)
  })
})
