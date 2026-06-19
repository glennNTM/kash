import { describe, it, expect } from 'vitest'
import { onboardingSchema } from '../../src/validators/onboarding.schema.js'
import {
  createSectionSchema,
  updatePercentagesSchema,
} from '../../src/validators/sections.schema.js'

// Payload d'onboarding valide, réutilisé puis dérivé pour chaque cas d'erreur.
function validOnboarding() {
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

describe('onboardingSchema', () => {
  it('accepte un payload complet et cohérent', () => {
    const result = onboardingSchema.safeParse(validOnboarding())
    expect(result.success).toBe(true)
  })

  it('rejette une somme de pourcentages différente de 100%', () => {
    const data = validOnboarding()
    data.allocation[2]!.percentage = 0.3 // total = 110%
    const result = onboardingSchema.safeParse(data)
    expect(result.success).toBe(false)
    expect(result.error?.issues[0]?.message).toMatch(/100%/)
  })

  it('rejette une section sous 10%', () => {
    const data = validOnboarding()
    data.allocation = [
      { name: 'Charges fixes', type: 'charges', percentage: 0.95 },
      { name: 'Épargne', type: 'epargne', percentage: 0.05 },
    ]
    const result = onboardingSchema.safeParse(data)
    expect(result.success).toBe(false)
  })

  it('rejette un sectionIndex hors des sections fournies', () => {
    const data = validOnboarding()
    data.firstExpense.sectionIndex = 5
    const result = onboardingSchema.safeParse(data)
    expect(result.success).toBe(false)
    expect(result.error?.issues[0]?.message).toMatch(/section/i)
  })

  it('rejette un revenu négatif ou nul', () => {
    const data = validOnboarding()
    data.income.amount = 0
    const result = onboardingSchema.safeParse(data)
    expect(result.success).toBe(false)
  })

  it('rejette un mois hors plage 1–12', () => {
    const data = validOnboarding()
    data.month = 13
    const result = onboardingSchema.safeParse(data)
    expect(result.success).toBe(false)
  })
})

describe('createSectionSchema', () => {
  it('accepte une section valide', () => {
    const result = createSectionSchema.safeParse({
      monthId: 1,
      name: 'Charges',
      type: 'charges',
      percentage: 0.5,
    })
    expect(result.success).toBe(true)
  })

  it('rejette un pourcentage sous 10%', () => {
    const result = createSectionSchema.safeParse({
      monthId: 1,
      name: 'Charges',
      type: 'charges',
      percentage: 0.05,
    })
    expect(result.success).toBe(false)
  })

  it('rejette un type de section inconnu', () => {
    const result = createSectionSchema.safeParse({
      monthId: 1,
      name: 'Charges',
      type: 'voyage',
      percentage: 0.5,
    })
    expect(result.success).toBe(false)
  })
})

describe('updatePercentagesSchema', () => {
  it('accepte une liste de répartitions valides', () => {
    const result = updatePercentagesSchema.safeParse({
      percentages: [
        { id: 1, percentage: 0.5 },
        { id: 2, percentage: 0.5 },
      ],
    })
    expect(result.success).toBe(true)
  })

  it('rejette une liste vide', () => {
    const result = updatePercentagesSchema.safeParse({ percentages: [] })
    expect(result.success).toBe(false)
  })
})
