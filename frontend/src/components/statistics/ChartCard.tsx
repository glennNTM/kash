import type { ReactNode } from 'react'
import type { LucideIcon } from '../../lib/icons'

interface ChartCardProps {
  title: string
  icon: LucideIcon
  /** Affiche un état vide local plutôt qu'un canvas trompeur. */
  isEmpty?: boolean
  emptyLabel?: string
  children: ReactNode
}

export default function ChartCard({
  title,
  icon: Icon,
  isEmpty = false,
  emptyLabel = 'Pas encore de données ce mois-ci',
  children,
}: ChartCardProps) {
  return (
    <div
      className="rounded-xl border border-(--border-subtle) bg-(--bg-2) p-5 flex flex-col gap-4"
      style={{ boxShadow: 'var(--shadow-sm)' }}
    >
      <div className="flex items-center gap-2">
        <Icon size={16} className="text-(--accent)" strokeWidth={2.25} />
        <p className="text-sm font-semibold text-(--t-1)">{title}</p>
      </div>

      {isEmpty ? (
        <p className="text-xs text-(--t-3) text-center py-12">{emptyLabel}</p>
      ) : (
        // Hauteur fixe : les graphes remplissent via maintainAspectRatio:false.
        <div className="relative h-64">{children}</div>
      )}
    </div>
  )
}
