import { formatAmount } from '../../lib/format'
import type { DashboardStats } from '../../types/budget'

interface HeroCardProps {
  stats: DashboardStats
}

export default function HeroCard({ stats }: HeroCardProps) {
  const isNegative = stats.totalRemaining < 0

  return (
    <div
      className="rounded-xl p-6 text-white"
      style={{ background: 'var(--gradient-stat)' }}
    >
      {/* Montant restant — chiffre roi */}
      <p className="text-white/70 text-sm font-medium mb-1">Restant ce mois</p>
      <p
        className="font-bold leading-none mb-5"
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--text-stat)',
          letterSpacing: '-0.04em',
          color: isNegative ? 'var(--error)' : 'white',
        }}
      >
        {formatAmount(stats.totalRemaining)}
      </p>

      {/* Revenus / Dépensé */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-white/60 text-xs font-medium uppercase tracking-wider mb-0.5">
            Revenus
          </p>
          <p
            className="font-semibold text-lg text-white"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            {formatAmount(stats.totalIncome)}
          </p>
        </div>
        <div>
          <p className="text-white/60 text-xs font-medium uppercase tracking-wider mb-0.5">
            Dépensé
          </p>
          <p
            className="font-semibold text-lg text-white"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            {formatAmount(stats.totalSpent)}
          </p>
        </div>
      </div>
    </div>
  )
}
