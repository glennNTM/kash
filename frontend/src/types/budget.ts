export type SectionType = 'charges' | 'epargne' | 'loisirs' | 'custom'
export type ExpenseStatus = 'planned' | 'paid'

export interface Expense {
  id: string
  sectionId: string
  label: string
  category: string
  amountPlanned: number
  amountReal: number | null
  status: ExpenseStatus
  paidAt: string | null
  isRecurring: boolean
}

export interface Section {
  id: string
  monthId: string
  name: string
  type: SectionType
  percentage: number
  expenses: Expense[]
}

export interface Month {
  id: string
  userId: string
  month: number
  year: number
  totalIncome: number
  sections: Section[]
}

/** Données calculées pour l'affichage — dérivées de Month, jamais stockées */
export interface SectionStats {
  sectionId: string
  allocated: number
  spent: number
  remaining: number
  ratio: number
}

export interface DashboardStats {
  totalIncome: number
  totalSpent: number
  totalRemaining: number
  sections: SectionStats[]
  recentExpenses: (Expense & { sectionName: string })[]
}

export const EXPENSE_CATEGORIES = [
  'Logement',
  'Alimentation',
  'Transport',
  'Santé',
  'Factures',
  'Loisirs',
  'Vêtements',
  'Épargne',
  'Famille',
  'Autre',
] as const

export type ExpenseCategory = (typeof EXPENSE_CATEGORIES)[number]
