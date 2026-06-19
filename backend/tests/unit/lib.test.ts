import { describe, it, expect } from 'vitest'
import { parseId } from '../../src/lib/params.js'
import {
  BadRequestError,
  ForbiddenError,
  NotFoundError,
  ConflictError,
} from '../../src/lib/errors.js'

describe('parseId', () => {
  it('convertit une chaîne numérique en entier', () => {
    expect(parseId('42', 'ID')).toBe(42)
  })

  it('rejette une valeur non numérique', () => {
    expect(() => parseId('abc', 'ID du mois')).toThrow(BadRequestError)
  })

  it('rejette zéro et les négatifs', () => {
    expect(() => parseId('0', 'ID')).toThrow(BadRequestError)
    expect(() => parseId('-3', 'ID')).toThrow(BadRequestError)
  })

  it('rejette undefined', () => {
    expect(() => parseId(undefined, 'ID')).toThrow(BadRequestError)
  })

  it("inclut le label dans le message d'erreur", () => {
    expect(() => parseId('x', 'ID de la section')).toThrow(/ID de la section/)
  })
})

describe('classes d’erreurs métier', () => {
  it('porte chacune le bon statut HTTP', () => {
    expect(new BadRequestError().status).toBe(400)
    expect(new ForbiddenError().status).toBe(403)
    expect(new NotFoundError().status).toBe(404)
    expect(new ConflictError().status).toBe(409)
  })

  it('conserve le message fourni', () => {
    expect(new NotFoundError('Section introuvable.').message).toBe(
      'Section introuvable.'
    )
  })
})
