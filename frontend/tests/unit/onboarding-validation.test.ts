import { describe, it, expect } from 'vitest'
import {
  incomeSchema,
  firstExpenseSchema,
} from '../../src/lib/validation/onboarding'

describe('incomeSchema', () => {
  it('accepte un revenu valide', () => {
    expect(
      incomeSchema.safeParse({ name: 'Salaire', amount: 300000 }).success
    ).toBe(true)
  })

  it('rejette un montant nul ou négatif', () => {
    expect(incomeSchema.safeParse({ name: 'Salaire', amount: 0 }).success).toBe(
      false
    )
  })

  it('rejette un montant non entier', () => {
    expect(
      incomeSchema.safeParse({ name: 'Salaire', amount: 1500.5 }).success
    ).toBe(false)
  })

  it('rejette un nom vide', () => {
    expect(incomeSchema.safeParse({ name: '  ', amount: 300000 }).success).toBe(
      false
    )
  })
})

describe('firstExpenseSchema', () => {
  function valid() {
    return {
      sectionIndex: 0,
      name: 'Loyer',
      category: 'Logement',
      amountPlanned: 120000,
      status: 'paid' as const,
    }
  }

  it('accepte une première dépense valide', () => {
    expect(firstExpenseSchema.safeParse(valid()).success).toBe(true)
  })

  it('exige une catégorie', () => {
    expect(
      firstExpenseSchema.safeParse({ ...valid(), category: '' }).success
    ).toBe(false)
  })

  it('rejette un statut inconnu', () => {
    expect(
      firstExpenseSchema.safeParse({ ...valid(), status: 'archived' }).success
    ).toBe(false)
  })
})
