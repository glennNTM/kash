import { useNavigate } from 'react-router-dom'
import { ArrowRight } from '../../lib/icons'
import { formatPercent } from '../../lib/format'
import type { DashboardStats } from '../../types/budget'

interface StatsPreviewCardProps {
  stats: DashboardStats
  sections: { name: string; percentage: number }[]
}

const SECTION_COLORS = [
  'var(--accent)',
  'var(--warning)',
  'rgba(26,158,110,0.4)',
  'var(--neutral)',
]

export default function StatsPreviewCard({ stats, sections }: StatsPreviewCardProps) {
  const navigate = useNavigate()
  const total = stats.totalIncome || 1

  return (
    <button
      type="button"
      onClick={() => navigate('/statistiques')}
      className="w-full text-left rounded-xl border border-(--border-subtle) bg-(--bg-2) p-5 flex flex-col gap-4 transition-shadow duration-(--duration-fast) hover:shadow-md active:scale-[0.98] cursor-pointer"
      style={{ boxShadow: 'var(--shadow-sm)' }}
    >
      {/* Titre */}
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-(--t-1)">Répartition</p>
        <span className="flex items-center gap-1 text-xs font-medium text-(--accent)">
          Voir tout <ArrowRight size={13} strokeWidth={2.5} />
        </span>
      </div>

      {/* Donut simplifié — barre segmentée */}
      <div className="flex h-2.5 w-full rounded-full overflow-hidden gap-px">
        {sections.map((sec, i) => (
          <div
            key={sec.name}
            style={{
              width: `${sec.percentage * 100}%`,
              background: SECTION_COLORS[i % SECTION_COLORS.length],
            }}
          />
        ))}
      </div>

      {/* Légende */}
      <ul className="flex flex-col gap-2">
        {sections.map((sec, i) => {
          const secStats = stats.sections[i]
          return (
            <li key={sec.name} className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-2 text-(--t-2)">
                <span
                  className="size-2 rounded-full shrink-0"
                  style={{ background: SECTION_COLORS[i % SECTION_COLORS.length] }}
                />
                {sec.name}
              </span>
              <span className="font-semibold text-(--t-1)" style={{ fontFamily: 'var(--font-mono)' }}>
                {formatPercent(secStats ? secStats.spent / total : sec.percentage)}
              </span>
            </li>
          )
        })}
      </ul>
    </button>
  )
}
