import type { Month, DashboardStats, Expense } from '../types/budget'
import { apiRequest, ApiError } from '../lib/api-client'
import { humanizeError } from '../lib/errors'
import { mapMonth, mapExpense, type MonthDTO, type ExpenseDTO } from './mappers'

type Result<T> = { data: T } | { error: string }

const MONTH_NAMES = [
  'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
  'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre',
]

// Enrobe un appel API dans le contrat { data } | { error } attendu par les hooks/composants.
async function safe<T>(fn: () => Promise<T>): Promise<Result<T>> {
  try {
    return { data: await fn() }
  } catch (err) {
    return { error: err instanceof ApiError ? err.message : humanizeError(err) }
  }
}

// Mois agrégé (sections + dépenses) pour le dashboard. `data: null` = aucun budget (404, pas une erreur).
export async function getMonth(
  year: number,
  month: number
): Promise<{ data: Month | null } | { error: string }> {
  try {
    const dto = await apiRequest<MonthDTO>(`/api/months/by-date?year=${year}&month=${month}`)
    return { data: mapMonth(dto) }
  } catch (err) {
    if (err instanceof ApiError && err.status === 404) return { data: null }
    return { error: err instanceof ApiError ? err.message : humanizeError(err) }
  }
}

// Crée le budget du mois avec la répartition par défaut 50/30/20 (revenu à 0, à renseigner ensuite).
export async function createMonthWithDefaults(year: number, month: number): Promise<Result<true>> {
  return safe(async () => {
    const created = await apiRequest<MonthDTO>('/api/months', {
      method: 'POST',
      body: { name: `${MONTH_NAMES[month - 1]} ${year}`, month, year, totalIncome: 0 },
    })
    const defaults = [
      { name: 'Charges fixes', type: 'charges', percentage: 0.5, sortOrder: 0 },
      { name: 'Épargne & objectifs', type: 'epargne', percentage: 0.3, sortOrder: 1 },
      { name: 'Loisirs & plaisirs', type: 'loisirs', percentage: 0.2, sortOrder: 2 },
    ] as const
    for (const section of defaults) {
      await apiRequest('/api/sections', { method: 'POST', body: { monthId: created.id, ...section } })
    }
    return true as const
  })
}

// Statistiques dérivées du mois — calcul client, jamais stocké.
export function computeStats(month: Month): DashboardStats {
  let totalSpent = 0
  const sections = month.sections.map((sec) => {
    const allocated = month.totalIncome * sec.percentage
    const spent = sec.expenses
      .filter((e) => e.status === 'paid')
      .reduce((sum, e) => sum + (e.amountReal ?? 0), 0)
    totalSpent += spent
    return {
      sectionId: sec.id,
      allocated,
      spent,
      remaining: allocated - spent,
      ratio: allocated > 0 ? spent / allocated : 0,
    }
  })

  const recentExpenses = month.sections
    .flatMap((sec) =>
      sec.expenses.map((e) => ({ ...e, sectionName: sec.name })),
    )
    .filter((e) => e.status === 'paid')
    .sort((a, b) => (b.paidAt ?? '').localeCompare(a.paidAt ?? ''))
    .slice(0, 8)

  return {
    totalIncome: month.totalIncome,
    totalSpent,
    totalRemaining: month.totalIncome - totalSpent,
    sections,
    recentExpenses,
  }
}

export async function addExpense(
  sectionId: number,
  expense: Omit<Expense, 'id' | 'sectionId'>
): Promise<Result<Expense>> {
  return safe(async () => {
    const dto = await apiRequest<ExpenseDTO>('/api/expenses', {
      method: 'POST',
      body: {
        sectionId,
        name: expense.label,
        category: expense.category,
        amountPlanned: expense.amountPlanned,
        // null → omis (le backend attend un number optionnel). paidAt est géré côté serveur.
        amountReal: expense.amountReal ?? undefined,
        status: expense.status,
        isRecurring: expense.isRecurring,
      },
    })
    return mapExpense(dto)
  })
}

export async function updatePercentages(
  monthId: number,
  percentages: Record<string, number>
): Promise<Result<true>> {
  return safe(async () => {
    await apiRequest(`/api/sections/month/${monthId}/percentages`, {
      method: 'PUT',
      body: {
        percentages: Object.entries(percentages).map(([id, percentage]) => ({
          id: Number(id),
          percentage,
        })),
      },
    })
    return true as const
  })
}

export async function renameSection(sectionId: number, name: string): Promise<Result<true>> {
  return safe(async () => {
    await apiRequest(`/api/sections/${sectionId}`, { method: 'PUT', body: { name: name.trim() } })
    return true as const
  })
}

export async function deleteExpense(expenseId: number): Promise<Result<true>> {
  return safe(async () => {
    await apiRequest(`/api/expenses/${expenseId}`, { method: 'DELETE' })
    return true as const
  })
}

export async function toggleRecurring(expenseId: number, isRecurring: boolean): Promise<Result<Expense>> {
  return safe(async () => {
    const dto = await apiRequest<ExpenseDTO>(`/api/expenses/${expenseId}`, {
      method: 'PUT',
      body: { isRecurring },
    })
    return mapExpense(dto)
  })
}
