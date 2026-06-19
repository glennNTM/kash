import { useMutation, useQueryClient } from '@tanstack/react-query'
import { submitOnboarding, type OnboardingPayload } from '../api/onboarding'
import type { Month } from '../types/budget'

/**
 * Soumet l'onboarding (création atomique du budget). Au succès :
 *  - alimente le cache ['months'] avec le mois créé, pour que la garde
 *    RequireBudget laisse passer le dashboard sans rebond vers l'onboarding ;
 *  - invalide la query dashboard du mois concerné, pour qu'il reflète le budget.
 */
export function useSubmitOnboarding(year: number, month: number) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (payload: OnboardingPayload) => submitOnboarding(payload),
    onSuccess: (res) => {
      if ('data' in res) {
        const created = res.data
        qc.setQueryData<Month[]>(['months'], (old) =>
          old ? [created, ...old.filter((m) => m.id !== created.id)] : [created]
        )
        qc.invalidateQueries({ queryKey: ['dashboard', year, month] })
      }
    },
  })
}
