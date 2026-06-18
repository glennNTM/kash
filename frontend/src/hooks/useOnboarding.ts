import { useMutation, useQueryClient } from '@tanstack/react-query'
import { submitOnboarding, type OnboardingPayload } from '../api/onboarding'

/**
 * Soumet l'onboarding (création atomique du budget) et invalide la query
 * dashboard du mois concerné au succès, pour que le dashboard reflète
 * immédiatement le budget fraîchement créé.
 */
export function useSubmitOnboarding(year: number, month: number) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (payload: OnboardingPayload) => submitOnboarding(payload),
    onSuccess: (res) => {
      if ('data' in res) {
        qc.invalidateQueries({ queryKey: ['dashboard', year, month] })
      }
    },
  })
}
