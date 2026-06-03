import type { Month, DashboardStats, Expense } from '../types/budget'
import { MOCK_MONTHS } from '../mocks/dashboardData'

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms))

export async function getMonth(
  year: number,
  month: number,
): Promise<{ data: Month } | { error: string }> {
  await delay(400)
  const found = MOCK_MONTHS.find((m) => m.year === year && m.month === month)
  if (!found) return { error: 'Mois introuvable' }
  return { data: found }
}

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
  sectionId: string,
  expense: Omit<Expense, 'id' | 'sectionId'>,
): Promise<{ data: Expense } | { error: string }> {
  await delay(300)
  const newExpense: Expense = {
    ...expense,
    id: `e-${Date.now()}`,
    sectionId,
  }
  const month = MOCK_MONTHS.find((m) =>
    m.sections.some((s) => s.id === sectionId),
  )
  const section = month?.sections.find((s) => s.id === sectionId)
  if (!section) return { error: 'Section introuvable' }
  section.expenses.push(newExpense)
  return { data: newExpense }
}

export async function updatePercentages(
  monthId: string,
  percentages: Record<string, number>,
): Promise<{ data: true } | { error: string }> {
  await delay(300)
  const month = MOCK_MONTHS.find((m) => m.id === monthId)
  if (!month) return { error: 'Mois introuvable' }
  const total = Object.values(percentages).reduce((s, v) => s + v, 0)
  if (Math.round(total * 100) !== 100) return { error: 'La somme doit être égale à 100 %' }
  for (const section of month.sections) {
    if (percentages[section.id] !== undefined) {
      section.percentage = percentages[section.id]
    }
  }
  return { data: true }
}

export async function renameSection(
  sectionId: string,
  name: string,
): Promise<{ data: true } | { error: string }> {
  await delay(200)
  for (const month of MOCK_MONTHS) {
    const section = month.sections.find((s) => s.id === sectionId)
    if (section) {
      section.name = name.trim()
      return { data: true }
    }
  }
  return { error: 'Section introuvable' }
}

export async function deleteExpense(
  expenseId: string,
): Promise<{ data: true } | { error: string }> {
  await delay(200)
  for (const month of MOCK_MONTHS) {
    for (const section of month.sections) {
      const idx = section.expenses.findIndex((e) => e.id === expenseId)
      if (idx !== -1) {
        section.expenses.splice(idx, 1)
        return { data: true }
      }
    }
  }
  return { error: 'Dépense introuvable' }
}

export async function toggleRecurring(
  expenseId: string,
): Promise<{ data: Expense } | { error: string }> {
  await delay(200)
  for (const month of MOCK_MONTHS) {
    for (const section of month.sections) {
      const expense = section.expenses.find((e) => e.id === expenseId)
      if (expense) {
        expense.isRecurring = !expense.isRecurring
        return { data: expense }
      }
    }
  }
  return { error: 'Dépense introuvable' }
}
