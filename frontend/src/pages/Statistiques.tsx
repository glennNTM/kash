import { BarChart3 } from '../lib/icons'
import EmptyState from '../components/ui/EmptyState'

export default function Statistiques() {
  return (
    <div className="flex flex-col gap-6">
      <h1
        className="font-bold text-(--t-1)"
        style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-display-m)' }}
      >
        Statistiques
      </h1>

      <EmptyState
        icon={BarChart3}
        title="Pas encore de quoi grapher"
        description="Ajoute quelques dépenses depuis ton tableau de bord, et on te montre exactement où part ton argent."
        action={{ label: 'Ajouter une dépense', to: '/dashboard' }}
      />
    </div>
  )
}
