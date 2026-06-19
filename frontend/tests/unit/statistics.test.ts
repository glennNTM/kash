import { describe, it, expect } from 'vitest'
import {
  buildCumulativeSpending,
  buildCategoryBreakdown,
  buildSectionRadar,
  buildSectionStacked,
} from '../../src/lib/statistics'
import { computeStats } from '../../src/api/dashboard'
import type { Month, Expense } from '../../src/types/budget'

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
        percentage: 0.5, // alloué 150 000
        expenses: [
          expense({ id: 1, status: 'paid', amountReal: 100000, paidAt: '2026-06-05', category: 'Logement' }),
          expense({ id: 2, status: 'paid', amountReal: 20000, paidAt: '2026-06-02', category: 'Factures' }),
          expense({ id: 3, status: 'planned', amountReal: 50000, paidAt: null, category: 'Logement' }),
        ],
      },
      {
        id: 2,
        monthId: 1,
        name: 'Loisirs',
        type: 'loisirs',
        percentage: 0.2, // alloué 60 000
        expenses: [
          expense({ id: 4, status: 'paid', amountReal: 80000, paidAt: '2026-06-10', category: 'Loisirs' }),
        ],
      },
    ],
  }
}

describe('buildCumulativeSpending', () => {
  it('cumule les dépenses payées triées par date, en ignorant les non payées', () => {
    const { labels, cumulative, income } = buildCumulativeSpending(month())
    // payées : 20000 (02/06), 100000 (05/06), 80000 (10/06) → cumul 20000, 120000, 200000
    expect(labels).toEqual(['02/06', '05/06', '10/06'])
    expect(cumulative).toEqual([20000, 120000, 200000])
    expect(income).toBe(300000)
  })

  it('renvoie des séries vides sans dépense payée', () => {
    const m = month()
    m.sections.forEach((s) => (s.expenses = s.expenses.filter((e) => e.status !== 'paid')))
    expect(buildCumulativeSpending(m).cumulative).toEqual([])
  })
})

describe('buildCategoryBreakdown', () => {
  it('agrège les dépenses payées par catégorie, triées décroissant', () => {
    const { labels, values } = buildCategoryBreakdown(month())
    // Logement 100000, Loisirs 80000, Factures 20000 (la dépense planned ignorée)
    expect(labels).toEqual(['Logement', 'Loisirs', 'Factures'])
    expect(values).toEqual([100000, 80000, 20000])
  })

  it('mappe une catégorie vide sur « Autre »', () => {
    const m = month()
    m.sections[0]!.expenses = [expense({ status: 'paid', amountReal: 5000, paidAt: '2026-06-01', category: '' })]
    m.sections[1]!.expenses = []
    expect(buildCategoryBreakdown(m).labels).toContain('Autre')
  })
})

describe('buildSectionRadar', () => {
  it('aligne alloué et dépensé sur les noms de sections', () => {
    const m = month()
    const radar = buildSectionRadar(m, computeStats(m))
    expect(radar.labels).toEqual(['Charges', 'Loisirs'])
    expect(radar.allocated).toEqual([150000, 60000])
    expect(radar.spent).toEqual([120000, 80000])
  })
})

describe('buildSectionStacked', () => {
  it('tronque le restant à 0 en cas de dépassement', () => {
    const m = month()
    const stacked = buildSectionStacked(m, computeStats(m))
    // Charges : restant 30000 ; Loisirs : 60000 - 80000 = -20000 → 0
    expect(stacked.spent).toEqual([120000, 80000])
    expect(stacked.remaining).toEqual([30000, 0])
  })
})
