import toast from 'react-hot-toast'
import { Target } from '../lib/icons'
import EmptyState from '../components/ui/EmptyState'

export default function Objectifs() {
  // TODO: brancher sur la modal de création d'objectif quand elle existera.
  function handleCreate() {
    toast('La création d’objectifs arrive très bientôt 🚧', { icon: '🎯' })
  }

  return (
    <div className="flex flex-col gap-6">
      <h1
        className="font-bold text-(--t-1)"
        style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-display-m)' }}
      >
        Objectifs
      </h1>

      <EmptyState
        icon={Target}
        title="Ton premier objectif t'attend"
        description="Voyage, fonds d'urgence, nouveau matériel… Donne un cap à ton épargne et suis ta progression mois après mois."
        action={{ label: '+ Créer un objectif', onClick: handleCreate }}
      />
    </div>
  )
}
