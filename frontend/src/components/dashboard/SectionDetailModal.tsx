import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Star, Check, Trash2, Pencil, Plus, ChevronDown, ChevronUp } from 'lucide-react'
import toast from 'react-hot-toast'
import * as RadixDialog from '@radix-ui/react-dialog'
import { DialogContent } from '../ui/Dialog'
import ProgressBar from './ProgressBar'
import { formatAmount, formatPercent } from '../../lib/format'
import { useAddExpense, useToggleRecurring, useDeleteExpense } from '../../hooks/useDashboard'
import { EXPENSE_CATEGORIES } from '../../types/budget'
import type { Section, SectionStats, ExpenseStatus } from '../../types/budget'

const addExpenseSchema = z.object({
  label: z.string().min(1, 'Libellé requis').max(60),
  amountPlanned: z.number({ error: 'Montant requis' }).int('Montant entier').positive('Montant positif'),
  category: z.string().min(1, 'Catégorie requise'),
  status: z.enum(['planned', 'paid']),
})

type AddExpenseForm = z.infer<typeof addExpenseSchema>

interface SectionDetailModalProps {
  section: Section | null
  stats: SectionStats | null
  year: number
  month: number
  open: boolean
  onOpenChange: (open: boolean) => void
  onRename: (section: Section) => void
}

export default function SectionDetailModal({
  section,
  stats,
  year,
  month,
  open,
  onOpenChange,
  onRename,
}: SectionDetailModalProps) {
  const [showForm, setShowForm] = useState(false)

  const addExpense = useAddExpense(year, month)
  const toggleRecurring = useToggleRecurring(year, month)
  const deleteExpense = useDeleteExpense(year, month)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AddExpenseForm>({
    resolver: zodResolver(addExpenseSchema),
    defaultValues: { status: 'planned' },
  })

  if (!section || !stats) return null

  async function onSubmit(values: AddExpenseForm) {
    const res = await addExpense.mutateAsync({
      sectionId: section!.id,
      expense: {
        label: values.label,
        category: values.category,
        amountPlanned: values.amountPlanned,
        amountReal: values.status === 'paid' ? values.amountPlanned : null,
        status: values.status as ExpenseStatus,
        paidAt: values.status === 'paid' ? new Date().toISOString().slice(0, 10) : null,
        isRecurring: false,
      },
    })

    if ('error' in res) {
      toast.error(res.error)
      return
    }

    const newSpent = stats!.spent + (values.status === 'paid' ? values.amountPlanned : 0)
    const newRatio = stats!.allocated > 0 ? newSpent / stats!.allocated : 0
    if (newRatio > 1) {
      toast.error(`Dépassement sur "${section!.name}" !`)
    } else if (newRatio > 0.8) {
      toast(`Budget "${section!.name}" à ${Math.round(newRatio * 100)} %`, {
        icon: '⚠️',
        style: { color: 'var(--warning)' },
      })
    } else {
      toast.success('Dépense ajoutée')
    }

    reset()
    setShowForm(false)
  }

  async function handleToggleRecurring(expenseId: string) {
    const res = await toggleRecurring.mutateAsync(expenseId)
    if ('error' in res) toast.error(res.error)
  }

  async function handleDelete(expenseId: string) {
    const res = await deleteExpense.mutateAsync(expenseId)
    if ('error' in res) toast.error(res.error)
    else toast.success('Dépense supprimée')
  }

  const paid = section.expenses.filter((e) => e.status === 'paid')
  const planned = section.expenses.filter((e) => e.status === 'planned')
  const allExpenses = [...paid, ...planned]
  const plannedTotal = planned.reduce((s, e) => s + e.amountPlanned, 0)

  return (
    <RadixDialog.Root
      open={open}
      onOpenChange={(o: boolean) => { onOpenChange(o); if (!o) setShowForm(false) }}
    >
      <DialogContent title={section.name}>
        {/* Stats section */}
        <div className="flex flex-col gap-3 mb-5">
          <div className="flex items-center justify-between text-sm">
            <span className="text-(--t-2)">
              Alloué{' '}
              <span className="font-semibold text-(--t-1)">{formatAmount(stats.allocated)}</span>
              <span className="text-(--t-3) ml-1">({formatPercent(section.percentage)})</span>
            </span>
            <span
              className="font-semibold"
              style={{ color: stats.remaining < 0 ? 'var(--error)' : 'var(--accent)' }}
            >
              {stats.remaining >= 0 ? '+' : ''}{formatAmount(stats.remaining)}
            </span>
          </div>

          <ProgressBar ratio={stats.ratio} />

          <p className="text-xs text-(--t-3)">
            Dépensé{' '}
            <span className="font-medium text-(--t-2)">{formatAmount(stats.spent)}</span>
            {' · '}Planifié{' '}
            <span className="font-medium text-(--t-2)">{formatAmount(plannedTotal)}</span>
          </p>
        </div>

        {/* Renommer */}
        <button
          type="button"
          onClick={() => onRename(section)}
          className="flex items-center gap-1.5 mb-4 text-xs font-medium text-(--t-2) hover:text-(--t-1) transition-colors duration-(--duration-fast)"
        >
          <Pencil size={13} strokeWidth={2} />
          Renommer la section
        </button>

        {/* Liste des dépenses */}
        {allExpenses.length > 0 ? (
          <ul className="flex flex-col divide-y divide-(--border-subtle) mb-5">
            {allExpenses.map((expense) => (
              <li key={expense.id} className="flex items-center gap-3 py-3">
                {/* Statut payé/planifié */}
                <span
                  className="shrink-0 size-5 rounded-full border-2 grid place-items-center"
                  style={{
                    borderColor: expense.status === 'paid' ? 'var(--success)' : 'var(--border-medium)',
                    background: expense.status === 'paid' ? 'var(--success)' : 'transparent',
                  }}
                >
                  {expense.status === 'paid' && <Check size={11} strokeWidth={3} color="white" />}
                </span>

                {/* Infos */}
                <div className="flex-1 min-w-0">
                  <p
                    className="text-sm font-medium truncate"
                    style={{
                      color: expense.status === 'paid' ? 'var(--t-3)' : 'var(--t-1)',
                      textDecoration: expense.status === 'paid' ? 'line-through' : 'none',
                    }}
                  >
                    {expense.label}
                  </p>
                  <p className="text-xs text-(--t-3)">{expense.category}</p>
                </div>

                {/* Montant */}
                <span
                  className="shrink-0 text-sm font-semibold tabular-nums"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    color: expense.status === 'paid' ? 'var(--success)' : 'var(--t-2)',
                  }}
                >
                  {formatAmount(expense.amountReal ?? expense.amountPlanned)}
                </span>

                {/* Étoile récurrence */}
                <button
                  type="button"
                  onClick={() => handleToggleRecurring(expense.id)}
                  aria-label={expense.isRecurring ? 'Retirer des récurrentes' : 'Répéter le mois prochain'}
                  className="shrink-0 transition-transform duration-(--duration-fast) active:scale-90"
                >
                  <Star
                    size={17}
                    strokeWidth={1.75}
                    fill={expense.isRecurring ? 'var(--warning)' : 'none'}
                    color={expense.isRecurring ? 'var(--warning)' : 'var(--t-3)'}
                  />
                </button>

                {/* Supprimer */}
                <button
                  type="button"
                  onClick={() => handleDelete(expense.id)}
                  aria-label="Supprimer la dépense"
                  className="shrink-0 text-(--t-3) transition-colors duration-(--duration-fast) hover:text-(--error) active:scale-90"
                >
                  <Trash2 size={15} strokeWidth={1.75} />
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-(--t-3) text-center py-6 mb-5">
            Aucune dépense pour l'instant.
          </p>
        )}

        {/* Formulaire ajout */}
        <div className="border-t border-(--border-subtle) pt-4">
          <button
            type="button"
            onClick={() => setShowForm((v) => !v)}
            className="flex items-center gap-2 w-full text-sm font-semibold text-(--accent) mb-3"
          >
            <Plus size={16} strokeWidth={2.5} />
            Ajouter une dépense
            {showForm
              ? <ChevronUp size={15} className="ml-auto" />
              : <ChevronDown size={15} className="ml-auto" />}
          </button>

          {showForm && (
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
              {/* Libellé */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-(--t-2)">Libellé</label>
                <input
                  {...register('label')}
                  placeholder="ex. Loyer, Courses…"
                  className="w-full rounded-md border border-(--border-medium) bg-(--bg-1) px-3 py-2.5 text-sm text-(--t-1) placeholder:text-(--t-3) outline-none transition-colors focus:border-(--accent)"
                />
                {errors.label && <p className="text-xs text-(--error)">{errors.label.message}</p>}
              </div>

              {/* Montant */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-(--t-2)">Montant (FCFA)</label>
                <input
                  {...register('amountPlanned', { valueAsNumber: true })}
                  type="number"
                  inputMode="numeric"
                  placeholder="0"
                  className="w-full rounded-md border border-(--border-medium) bg-(--bg-1) px-3 py-2.5 text-sm text-(--t-1) placeholder:text-(--t-3) outline-none transition-colors focus:border-(--accent) text-right"
                  style={{ fontFamily: 'var(--font-mono)' }}
                />
                {errors.amountPlanned && <p className="text-xs text-(--error)">{errors.amountPlanned.message}</p>}
              </div>

              {/* Catégorie */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-(--t-2)">Catégorie</label>
                <select
                  {...register('category')}
                  className="w-full rounded-md border border-(--border-medium) bg-(--bg-1) px-3 py-2.5 text-sm text-(--t-1) outline-none transition-colors focus:border-(--accent) appearance-none"
                >
                  <option value="">Choisir…</option>
                  {EXPENSE_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                {errors.category && <p className="text-xs text-(--error)">{errors.category.message}</p>}
              </div>

              {/* Statut */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-(--t-2)">Statut</label>
                <div className="flex rounded-md overflow-hidden border border-(--border-medium)">
                  {(['planned', 'paid'] as const).map((status) => (
                    <label
                      key={status}
                      className="flex-1 flex items-center justify-center py-2 text-sm font-medium cursor-pointer has-checked:bg-(--accent) has-checked:text-white text-(--t-2) transition-colors"
                    >
                      <input
                        {...register('status')}
                        type="radio"
                        value={status}
                        className="sr-only"
                      />
                      {status === 'planned' ? 'Planifié' : 'Payé'}
                    </label>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => { setShowForm(false); reset() }}
                  className="flex-1 py-2.5 rounded-full text-sm font-semibold text-(--t-2) bg-(--bg-3) transition-colors hover:bg-(--bg-4)"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 py-2.5 rounded-full text-sm font-semibold text-white bg-(--accent) transition-colors hover:bg-(--accent-hover) disabled:opacity-60"
                >
                  {isSubmitting ? 'Ajout…' : 'Ajouter'}
                </button>
              </div>
            </form>
          )}
        </div>
      </DialogContent>
    </RadixDialog.Root>
  )
}
