import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import OnboardingLayout from '../components/onboarding/OnboardingLayout'
import StepIncome from '../components/onboarding/StepIncome'
import StepAllocation, { type AllocationItem } from '../components/onboarding/StepAllocation'
import StepFirstExpense from '../components/onboarding/StepFirstExpense'
import { useSubmitOnboarding } from '../hooks/useOnboarding'
import type { OnboardingPayload } from '../api/onboarding'
import type { IncomeForm, FirstExpenseForm } from '../lib/validation/onboarding'

const TOTAL_STEPS = 3

// Répartition 50/30/20 par défaut (ajustable à l'étape 2).
const DEFAULT_ALLOCATION: AllocationItem[] = [
  { name: 'Charges fixes', type: 'charges', percentage: 0.5 },
  { name: 'Épargne & objectifs', type: 'epargne', percentage: 0.3 },
  { name: 'Loisirs & plaisirs', type: 'loisirs', percentage: 0.2 },
]

const STEP_META = [
  { title: 'Tes revenus', subtitle: 'Commençons par ce que tu gagnes chaque mois.' },
  { title: 'Ta répartition', subtitle: 'Répartis ton revenu selon la méthode 50/30/20.' },
  { title: 'Ta première dépense', subtitle: 'Ajoute une dépense pour démarrer ton suivi.' },
]

export default function Onboarding() {
  const navigate = useNavigate()
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth() + 1

  const [step, setStep] = useState(1)
  const [income, setIncome] = useState<Partial<IncomeForm>>({ name: 'Salaire' })
  const [allocation, setAllocation] = useState<AllocationItem[]>(DEFAULT_ALLOCATION)
  const [expense, setExpense] = useState<Partial<FirstExpenseForm>>({
    status: 'planned',
    sectionIndex: 0,
  })

  const submit = useSubmitOnboarding(year, month)

  function handleIncomeNext(values: IncomeForm) {
    setIncome(values)
    setStep(2)
  }

  function handleAllocationNext(values: AllocationItem[]) {
    setAllocation(values)
    setStep(3)
  }

  async function handleFinish(values: FirstExpenseForm) {
    setExpense(values)

    const payload: OnboardingPayload = {
      month,
      year,
      income: { name: income.name!, amount: income.amount! },
      allocation,
      firstExpense: {
        sectionIndex: values.sectionIndex,
        name: values.name,
        category: values.category,
        amountPlanned: values.amountPlanned,
        status: values.status,
      },
    }

    const res = await submit.mutateAsync(payload)
    if ('error' in res) {
      toast.error(res.error)
      return
    }
    toast.success('Ton budget est prêt !')
    navigate('/dashboard', { replace: true })
  }

  const meta = STEP_META[step - 1]!

  return (
    <OnboardingLayout
      step={step}
      totalSteps={TOTAL_STEPS}
      title={meta.title}
      subtitle={meta.subtitle}
    >
      {step === 1 && <StepIncome defaultValues={income} onNext={handleIncomeNext} />}

      {step === 2 && (
        <StepAllocation
          defaultValues={allocation}
          income={income.amount ?? 0}
          onBack={() => setStep(1)}
          onNext={handleAllocationNext}
        />
      )}

      {step === 3 && (
        <StepFirstExpense
          defaultValues={expense}
          sections={allocation}
          submitting={submit.isPending}
          onBack={(current) => {
            setExpense(current)
            setStep(2)
          }}
          onSubmit={handleFinish}
        />
      )}
    </OnboardingLayout>
  )
}
