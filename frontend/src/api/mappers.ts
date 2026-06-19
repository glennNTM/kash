import type { Month, Section, Expense, ExpenseStatus, SectionType } from '../types/budget'

/**
 * Couche de mapping API → types front. Centralise toutes les conversions :
 * - montants/pourcentages `numeric` renvoyés en string → number
 * - champ API `name` → `label` côté dépenses
 * - `category` nullable → '' (le front attend une string)
 * Ne jamais parser ces valeurs ailleurs (cf. règle formatAmount).
 */

// ── DTO renvoyés par l'API (forme brute) ──────────────────────
export interface ExpenseDTO {
  id: number
  sectionId: number
  name: string
  category: string | null
  amountPlanned: string
  amountReal: string | null
  status: ExpenseStatus
  paidAt: string | null
  isRecurring: boolean
}

export interface SectionDTO {
  id: number
  monthId: number
  name: string
  type: SectionType
  percentage: string
  expenses?: ExpenseDTO[]
}

export interface MonthDTO {
  id: number
  userId: string
  month: number
  year: number
  totalIncome: string
  sections?: SectionDTO[]
}

// ── Mappers ───────────────────────────────────────────────────
export function mapExpense(dto: ExpenseDTO): Expense {
  return {
    id: dto.id,
    sectionId: dto.sectionId,
    label: dto.name,
    category: dto.category ?? '',
    amountPlanned: Number(dto.amountPlanned),
    amountReal: dto.amountReal === null ? null : Number(dto.amountReal),
    status: dto.status,
    paidAt: dto.paidAt,
    isRecurring: dto.isRecurring,
  }
}

export function mapSection(dto: SectionDTO): Section {
  return {
    id: dto.id,
    monthId: dto.monthId,
    name: dto.name,
    type: dto.type,
    percentage: Number(dto.percentage),
    expenses: (dto.expenses ?? []).map(mapExpense),
  }
}

export function mapMonth(dto: MonthDTO): Month {
  return {
    id: dto.id,
    userId: dto.userId,
    month: dto.month,
    year: dto.year,
    totalIncome: Number(dto.totalIncome),
    sections: (dto.sections ?? []).map(mapSection),
  }
}
