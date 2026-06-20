import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  getMonth,
  getAllMonthsWithDetails,
  computeStats,
  createMonthWithDefaults,
  addExpense,
  toggleRecurring,
  deleteExpense,
  updatePercentages,
  renameSection,
} from '../api/dashboard'
import type { Expense } from '../types/budget'

export function useDashboard(year: number, month: number) {
  return useQuery({
    queryKey: ['dashboard', year, month],
    queryFn: async () => {
      const res = await getMonth(year, month)
      if ('error' in res) throw new Error(res.error)
      // null = aucun budget pour cette période (404) → pas une erreur, un état vide.
      if (res.data === null) return { month: null, stats: null }
      return { month: res.data, stats: computeStats(res.data) }
    },
  })
}

// Tous les mois détaillés de l'utilisateur — base des tendances globales (cross-mois).
export function useAllMonths() {
  return useQuery({
    queryKey: ['months', 'all-details'],
    queryFn: async () => {
      const res = await getAllMonthsWithDetails()
      if ('error' in res) throw new Error(res.error)
      return res.data
    },
  })
}

export function useCreateMonth(year: number, month: number) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: () => createMonthWithDefaults(year, month),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['dashboard', year, month] })
    },
  })
}

export function useAddExpense(year: number, month: number) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({
      sectionId,
      expense,
    }: {
      sectionId: number
      expense: Omit<Expense, 'id' | 'sectionId'>
    }) => addExpense(sectionId, expense),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['dashboard', year, month] })
    },
  })
}

export function useUpdatePercentages(year: number, month: number) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ monthId, percentages }: { monthId: number; percentages: Record<string, number> }) =>
      updatePercentages(monthId, percentages),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['dashboard', year, month] })
    },
  })
}

export function useRenameSection(year: number, month: number) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ sectionId, name }: { sectionId: number; name: string }) =>
      renameSection(sectionId, name),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['dashboard', year, month] })
    },
  })
}

export function useDeleteExpense(year: number, month: number) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (expenseId: number) => deleteExpense(expenseId),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['dashboard', year, month] })
    },
  })
}

export function useToggleRecurring(year: number, month: number) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ expenseId, isRecurring }: { expenseId: number; isRecurring: boolean }) =>
      toggleRecurring(expenseId, isRecurring),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['dashboard', year, month] })
    },
  })
}
