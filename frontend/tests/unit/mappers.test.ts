import { describe, it, expect } from 'vitest'
import {
  mapExpense,
  mapSection,
  mapMonth,
  type ExpenseDTO,
  type MonthDTO,
} from '../../src/api/mappers'

describe('mapExpense', () => {
  it('convertit les montants string → number et name → label', () => {
    const dto: ExpenseDTO = {
      id: 1,
      sectionId: 2,
      name: 'Loyer',
      category: 'Logement',
      amountPlanned: '120000',
      amountReal: '118000',
      status: 'paid',
      paidAt: '2026-06-01',
      isRecurring: true,
    }
    expect(mapExpense(dto)).toEqual({
      id: 1,
      sectionId: 2,
      label: 'Loyer',
      category: 'Logement',
      amountPlanned: 120000,
      amountReal: 118000,
      status: 'paid',
      paidAt: '2026-06-01',
      isRecurring: true,
    })
  })

  it('mappe category null → chaîne vide et préserve amountReal null', () => {
    const dto: ExpenseDTO = {
      id: 3,
      sectionId: 2,
      name: 'Courses',
      category: null,
      amountPlanned: '50000',
      amountReal: null,
      status: 'planned',
      paidAt: null,
      isRecurring: false,
    }
    const mapped = mapExpense(dto)
    expect(mapped.category).toBe('')
    expect(mapped.amountReal).toBeNull()
  })
})

describe('mapSection', () => {
  it('convertit percentage en number et défaut expenses → []', () => {
    const mapped = mapSection({
      id: 1,
      monthId: 1,
      name: 'Charges',
      type: 'charges',
      percentage: '0.5',
    })
    expect(mapped.percentage).toBe(0.5)
    expect(mapped.expenses).toEqual([])
  })
})

describe('mapMonth', () => {
  it('convertit totalIncome et mappe les sections imbriquées', () => {
    const dto: MonthDTO = {
      id: 1,
      userId: 'u1',
      month: 6,
      year: 2026,
      totalIncome: '300000',
      sections: [
        {
          id: 1,
          monthId: 1,
          name: 'Charges',
          type: 'charges',
          percentage: '0.5',
          expenses: [],
        },
      ],
    }
    const mapped = mapMonth(dto)
    expect(mapped.totalIncome).toBe(300000)
    expect(mapped.sections).toHaveLength(1)
    expect(mapped.sections[0]!.percentage).toBe(0.5)
  })
})
