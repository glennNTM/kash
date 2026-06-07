import { formatAmount, formatPercent } from '../../lib/format'
import type { Section, SectionStats } from '../../types/budget'
import ProgressBar from './ProgressBar'

interface SectionCardProps {
  section: Section
  stats: SectionStats
  onClick: (section: Section) => void
}

const STATUS_LABEL: Record<string, string> = {
  normal: '',
  warning: '⚠ Proche du plafond',
  over: '⚠ Dépassement',
}

export default function SectionCard({ section, stats, onClick }: SectionCardProps) {
  const status =
    stats.ratio > 1 ? 'over' : stats.ratio > 0.8 ? 'warning' : 'normal'

  const statusColor =
    status === 'over'
      ? 'var(--error)'
      : status === 'warning'
        ? 'var(--warning)'
        : 'var(--t-3)'

  return (
    <button
      type="button"
      onClick={() => onClick(section)}
      className="w-full text-left rounded-xl border border-(--border-subtle) bg-(--bg-2) p-5 flex flex-col gap-3 transition-shadow duration-(--duration-fast) hover:shadow-md active:scale-[0.98]"
      style={{ boxShadow: 'var(--shadow-sm)' }}
    >
      {/* Titre + % */}
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="font-semibold text-(--t-1) text-sm truncate">{section.name}</p>
          <p className="text-xs text-(--t-3) mt-0.5">{formatPercent(section.percentage)}</p>
        </div>
        <span
          className="shrink-0 text-xs font-semibold px-2 py-0.5 rounded-full"
          style={{
            background: status === 'normal' ? 'var(--bg-3)' : status === 'warning' ? 'rgba(217,119,6,0.10)' : 'rgba(220,38,38,0.10)',
            color: status === 'normal' ? 'var(--t-2)' : statusColor,
          }}
        >
          {Math.round(stats.ratio * 100)} %
        </span>
      </div>

      {/* Barre */}
      <ProgressBar ratio={stats.ratio} />

      {/* Alloué / Dépensé */}
      <div className="flex items-center justify-between text-xs">
        <span className="text-(--t-3)">
          Dépensé{' '}
          <span className="font-semibold text-(--t-1)">{formatAmount(stats.spent)}</span>
        </span>
        <span className="text-(--t-3)">
          /{' '}
          <span className="font-medium">{formatAmount(stats.allocated)}</span>
        </span>
      </div>

      {/* Alerte */}
      {status !== 'normal' && (
        <p className="text-xs font-medium" style={{ color: statusColor }}>
          {STATUS_LABEL[status]}
        </p>
      )}
    </button>
  )
}
