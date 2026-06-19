import { useQuery } from '@tanstack/react-query'
import { getMonths } from '../api/months'

/**
 * Liste des mois de l'utilisateur — source de vérité de l'état d'onboarding.
 * `data.length === 0` ⇒ aucun budget ⇒ onboarding à faire.
 * Clé ['months'] partagée : mise à jour par useSubmitOnboarding au succès,
 * pour que les gardes de route reflètent immédiatement le budget créé.
 */
export function useMonths() {
  return useQuery({
    queryKey: ['months'],
    queryFn: getMonths,
  })
}
