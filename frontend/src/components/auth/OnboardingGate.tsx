import { Navigate, Outlet } from 'react-router-dom'
import { Loader2 } from '../../lib/icons'
import { useMonths } from '../../hooks/useMonths'

/**
 * Gardes d'onboarding — déterminent la destination selon que l'utilisateur a
 * déjà un budget (≥ 1 mois) ou non. Posées sous ProtectedRoute (session acquise).
 *
 * L'état est inféré de GET /api/months (cf. useMonths) : pas de flag dédié.
 * En cas d'erreur réseau, on ne piège pas l'utilisateur — on laisse passer et
 * la page cible gère son propre état d'erreur.
 */

function GateLoader() {
  return (
    <div className="min-h-dvh bg-(--bg-1) grid place-items-center">
      <Loader2 size={28} className="animate-spin text-(--accent)" />
    </div>
  )
}

/** Pages du dashboard : sans budget → redirige vers l'onboarding. */
export function RequireBudget() {
  const { data, isPending, isError } = useMonths()

  if (isPending) return <GateLoader />
  if (!isError && data && data.length === 0) {
    return <Navigate to="/onboarding" replace />
  }
  return <Outlet />
}

/** Onboarding : si l'utilisateur a déjà un budget → renvoie au dashboard. */
export function RequireNoBudget() {
  const { data, isPending } = useMonths()

  if (isPending) return <GateLoader />
  if (data && data.length > 0) {
    return <Navigate to="/dashboard" replace />
  }
  return <Outlet />
}
