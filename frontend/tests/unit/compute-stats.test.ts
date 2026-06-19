import { describe, it, expect } from 'vitest'
import { computeStats } from '../../src/api/dashboard'
import type { Month, Expense } from '../../src/types/budget'

// Fabrique une dépense complète à partir d'un fragment (réduit le bruit des fixtures).
function expense(partial: Partial<Expense>): Expense {
  return {
    id: 1,
    sectionId: 1,
    label: 'Dépense',
    category: '',
    amountPlanned: 0,
    amountReal: null,
    status: 'planned',
    paidAt: null,
    isRecurring: false,
    ...partial,
  }
}

function month(): Month {
  return {
    id: 1,
    userId: 'u1',
    month: 6,
    year: 2026,
    totalIncome: 300000,
    sections: [
      {
        id: 1,
        monthId: 1,
        name: 'Charges',
        type: 'charges',
        percentage: 0.5, // alloué = 150 000
        expenses: [
          expense({ id: 1, status: 'paid', amountReal: 120000 }),
          // Non payée : ne doit PAS compter dans le dépensé.
          expense({ id: 2, status: 'planned', amountReal: 50000 }),
        ],
      },
      {
        id: 2,
        monthId: 1,
        name: 'Loisirs',
        type: 'loisirs',
        percentage: 0.2, // alloué = 60 000
        expenses: [expense({ id: 3, status: 'paid', amountReal: 60000 })],
      },
    ],
  }
}

describe('computeStats', () => {
  it('calcule alloué = revenu × % et ne compte que les dépenses payées', () => {
    const stats = computeStats(month())
    const charges = stats.sections.find((s) => s.sectionId === 1)!
    expect(charges.allocated).toBe(150000)
    expect(charges.spent).toBe(120000) // la dépense "planned" est ignorée
    expect(charges.remaining).toBe(30000)
  })

  it('calcule le ratio dépensé/alloué', () => {
    const stats = computeStats(month())
    const charges = stats.sections.find((s) => s.sectionId === 1)!
    expect(charges.ratio).toBeCloseTo(0.8) // 120000 / 150000
    const loisirs = stats.sections.find((s) => s.sectionId === 2)!
    expect(loisirs.ratio).toBe(1) // 60000 / 60000 → dépassement imminent
  })

  it('agrège les totaux du mois', () => {
    const stats = computeStats(month())
    expect(stats.totalIncome).toBe(300000)
    expect(stats.totalSpent).toBe(180000) // 120000 + 60000
    expect(stats.totalRemaining).toBe(120000)
  })

  it('ratio = 0 quand la section n’a aucune allocation', () => {
    const m = month()
    m.sections[0]!.percentage = 0
    const stats = computeStats(m)
    expect(stats.sections[0]!.ratio).toBe(0)
  })

  it('ne retient que les dépenses payées dans recentExpenses, triées par date', () => {
    const stats = computeStats(month())
    expect(stats.recentExpenses.every((e) => e.status === 'paid')).toBe(true)
    expect(stats.recentExpenses).toHaveLength(2)
  })
})
