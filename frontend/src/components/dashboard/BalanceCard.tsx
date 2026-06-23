import { formatAmount } from '../../lib/format'
import type { DashboardStats } from '../../types/budget'

interface BalanceCardProps {
  stats: DashboardStats
}

/** Carte « Revenus » : restant ce mois (chiffre roi) + revenus / dépensé. */
export default function BalanceCard({ stats }: BalanceCardProps) {
  const isNegative = stats.totalRemaining < 0

  return (
    <div className="rounded-xl p-6 bg-(--bg-2) border border-(--accent) flex flex-col">
      {/* Montant restant — chiffre roi (montant + devise sur une seule ligne) */}
      <p className="text-(--t-2) text-sm font-medium mb-1">Restant ce mois</p>
      <p
        className="font-bold leading-none mb-6 whitespace-nowrap"
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'clamp(24px, 3vw, 34px)',
          letterSpacing: '-0.03em',
          color: isNegative ? 'var(--error)' : 'var(--t-1)',
        }}
      >
        {formatAmount(stats.totalRemaining)}
      </p>

      {/* Revenus / Dépensé — chaque ligne : libellé à gauche, montant+devise à droite */}
      <div className="flex flex-col gap-3 mt-auto">
        <div className="flex items-center justify-between gap-3">
          <span className="text-(--t-3) text-xs font-medium uppercase tracking-wider">
            Revenus
          </span>
          <span
            className="font-semibold text-base text-(--accent) whitespace-nowrap"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            {formatAmount(stats.totalIncome)}
          </span>
        </div>
        <div className="flex items-center justify-between gap-3">
          <span className="text-(--t-3) text-xs font-medium uppercase tracking-wider">
            Dépensé
          </span>
          <span
            className="font-semibold text-base text-(--error) whitespace-nowrap"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            {formatAmount(stats.totalSpent)}
          </span>
        </div>
      </div>
    </div>
  )
}
