import { Navigate, Outlet } from 'react-router-dom'
import { Loader2 } from '../../lib/icons'
import { useSession } from '../../hooks/useSession'

/**
 * Garde de route : protège les pages privées (onboarding, dashboard…).
 * - session en cours de résolution → loader plein écran (évite un flash vers /login)
 * - pas de session → redirection vers /login
 * - session valide → rend les routes enfants via <Outlet />
 */
export default function ProtectedRoute() {
  const { data, isPending } = useSession()

  if (isPending) {
    return (
      <div className="min-h-dvh bg-(--bg-1) grid place-items-center">
        <Loader2 size={28} className="animate-spin text-(--accent)" />
      </div>
    )
  }

  if (!data) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}
