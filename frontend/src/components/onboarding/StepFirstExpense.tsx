import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Check, ChevronLeft } from '../../lib/icons'
import { EXPENSE_CATEGORIES } from '../../types/budget'
import { firstExpenseSchema, type FirstExpenseForm } from '../../lib/validation/onboarding'

interface StepFirstExpenseProps {
  defaultValues: Partial<FirstExpenseForm>
  sections: { name: string }[]
  submitting: boolean
  onBack: (current: Partial<FirstExpenseForm>) => void
  onSubmit: (values: FirstExpenseForm) => void
}

const inputClass =
  'w-full rounded-xl border border-(--border-medium) bg-(--bg-1) px-4 py-3 text-sm text-(--t-1) placeholder:text-(--t-3) outline-none transition-colors focus:border-(--accent)'

export default function StepFirstExpense({
  defaultValues,
  sections,
  submitting,
  onBack,
  onSubmit,
}: StepFirstExpenseProps) {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isValid },
  } = useForm<FirstExpenseForm>({
    resolver: zodResolver(firstExpenseSchema),
    mode: 'onTouched',
    defaultValues: { status: 'planned', sectionIndex: 0, ...defaultValues },
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
      {/* Section cible */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="expense-section" className="text-sm font-semibold text-(--t-1)">
          Dans quelle section ?
        </label>
        <select
          id="expense-section"
          className={`${inputClass} appearance-none`}
          {...register('sectionIndex', { valueAsNumber: true })}
        >
          {sections.map((section, index) => (
            <option key={index} value={index}>
              {section.name}
            </option>
          ))}
        </select>
      </div>

      {/* Libellé */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="expense-name" className="text-sm font-semibold text-(--t-1)">
          Libellé
        </label>
        <input
          id="expense-name"
          type="text"
          placeholder="ex. Loyer, Courses…"
          aria-invalid={!!errors.name}
          className={inputClass}
          {...register('name')}
        />
        {errors.name && <p className="text-xs text-(--error)">{errors.name.message}</p>}
      </div>

      {/* Catégorie */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="expense-category" className="text-sm font-semibold text-(--t-1)">
          Catégorie
        </label>
        <select
          id="expense-category"
          className={`${inputClass} appearance-none`}
          {...register('category')}
        >
          <option value="">Choisir…</option>
          {EXPENSE_CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        {errors.category && <p className="text-xs text-(--error)">{errors.category.message}</p>}
      </div>

      {/* Montant */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="expense-amount" className="text-sm font-semibold text-(--t-1)">
          Montant (FCFA)
        </label>
        <input
          id="expense-amount"
          type="number"
          inputMode="numeric"
          placeholder="0"
          aria-invalid={!!errors.amountPlanned}
          className={`${inputClass} text-right`}
          style={{ fontFamily: 'var(--font-mono)' }}
          {...register('amountPlanned', { valueAsNumber: true })}
        />
        {errors.amountPlanned && (
          <p className="text-xs text-(--error)">{errors.amountPlanned.message}</p>
        )}
      </div>

      {/* Statut */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-semibold text-(--t-1)">Statut</label>
        <div className="flex rounded-xl overflow-hidden border border-(--border-medium)">
          {(['planned', 'paid'] as const).map((status) => (
            <label
              key={status}
              className="flex-1 flex items-center justify-center py-2.5 text-sm font-medium cursor-pointer has-checked:bg-(--accent) has-checked:text-white text-(--t-2) transition-colors"
            >
              <input {...register('status')} type="radio" value={status} className="sr-only" />
              {status === 'planned' ? 'Planifié' : 'Payé'}
            </label>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2 mt-1">
        <button
          type="button"
          onClick={() => onBack(getValues())}
          className="flex items-center justify-center gap-1.5 px-5 py-3 rounded-full text-sm font-semibold text-(--t-2) bg-(--bg-3) transition-colors hover:bg-(--bg-4)"
        >
          <ChevronLeft size={18} />
          Retour
        </button>
        <button
          type="submit"
          disabled={!isValid || submitting}
          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-full text-sm font-semibold text-white bg-(--accent) transition-colors hover:bg-(--accent-hover) active:scale-97 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <Check size={18} />
          {submitting ? 'Création…' : 'Terminer'}
        </button>
      </div>
    </form>
  )
}
