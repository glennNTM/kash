import { History } from '../lib/icons'
import EmptyState from '../components/ui/EmptyState'

export default function Historique() {
  return (
    <div className="flex flex-col gap-6">
      <h1
        className="font-bold text-(--t-1)"
        style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-display-m)' }}
      >
        Historique
      </h1>

      <EmptyState
        icon={History}
        title="Ton histoire commence ce mois-ci"
        description="Dès ton premier mois clôturé, tu retrouveras ici l'évolution de tes revenus, de tes dépenses et de ton épargne."
        action={{ label: 'Aller au tableau de bord', to: '/dashboard' }}
      />
    </div>
  )
}
