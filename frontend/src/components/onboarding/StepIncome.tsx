import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight } from '../../lib/icons'
import { incomeSchema, type IncomeForm } from '../../lib/validation/onboarding'

interface StepIncomeProps {
  defaultValues: Partial<IncomeForm>
  onNext: (values: IncomeForm) => void
}

const inputClass =
  'w-full rounded-xl border border-(--border-medium) bg-(--bg-1) px-4 py-3 text-sm text-(--t-1) placeholder:text-(--t-3) outline-none transition-colors focus:border-(--accent)'

export default function StepIncome({ defaultValues, onNext }: StepIncomeProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IncomeForm>({
    resolver: zodResolver(incomeSchema),
    mode: 'onTouched',
    defaultValues,
  })

  return (
    <form onSubmit={handleSubmit(onNext)} noValidate className="flex flex-col gap-5">
      {/* Nom du revenu */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="income-name" className="text-sm font-semibold text-(--t-1)">
          Source de revenu
        </label>
        <input
          id="income-name"
          type="text"
          placeholder="ex. Salaire"
          aria-invalid={!!errors.name}
          className={inputClass}
          {...register('name')}
        />
        {errors.name && <p className="text-xs text-(--error)">{errors.name.message}</p>}
      </div>

      {/* Montant */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="income-amount" className="text-sm font-semibold text-(--t-1)">
          Montant mensuel (FCFA)
        </label>
        <input
          id="income-amount"
          type="number"
          inputMode="numeric"
          placeholder="0"
          aria-invalid={!!errors.amount}
          className={`${inputClass} text-right`}
          style={{ fontFamily: 'var(--font-mono)' }}
          {...register('amount', { valueAsNumber: true })}
        />
        {errors.amount && <p className="text-xs text-(--error)">{errors.amount.message}</p>}
      </div>

      <button
        type="submit"
        disabled={!isValid}
        className="w-full flex items-center justify-center gap-2 bg-(--accent) text-white font-semibold py-3 rounded-full hover:bg-(--accent-hover) transition-colors active:scale-97 disabled:opacity-60 disabled:cursor-not-allowed mt-1"
      >
        Continuer
        <ArrowRight size={18} />
      </button>
    </form>
  )
}
