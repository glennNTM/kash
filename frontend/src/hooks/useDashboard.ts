import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getMonth, computeStats, addExpense, toggleRecurring, deleteExpense, updatePercentages, renameSection } from '../api/dashboard'
import type { Expense } from '../types/budget'

export function useDashboard(year: number, month: number) {
  return useQuery({
    queryKey: ['dashboard', year, month],
    queryFn: async () => {
      const res = await getMonth(year, month)
      if ('error' in res) throw new Error(res.error)
      return { month: res.data, stats: computeStats(res.data) }
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
      sectionId: string
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
    mutationFn: ({ monthId, percentages }: { monthId: string; percentages: Record<string, number> }) =>
      updatePercentages(monthId, percentages),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['dashboard', year, month] })
    },
  })
}

export function useRenameSection(year: number, month: number) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ sectionId, name }: { sectionId: string; name: string }) =>
      renameSection(sectionId, name),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['dashboard', year, month] })
    },
  })
}

export function useDeleteExpense(year: number, month: number) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (expenseId: string) => deleteExpense(expenseId),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['dashboard', year, month] })
    },
  })
}

export function useToggleRecurring(year: number, month: number) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (expenseId: string) => toggleRecurring(expenseId),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['dashboard', year, month] })
    },
  })
}
