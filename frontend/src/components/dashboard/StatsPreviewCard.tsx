import { useNavigate } from 'react-router-dom'
import { Doughnut } from 'react-chartjs-2'
import type { ChartOptions, TooltipItem } from 'chart.js'
import { ArrowRight } from '../../lib/icons'
import { formatPercent } from '../../lib/format'
import { resolveChartColors } from '../../lib/chart'
import type { DashboardStats } from '../../types/budget'

interface StatsPreviewCardProps {
  stats: DashboardStats
  sections: { name: string; percentage: number }[]
}

export default function StatsPreviewCard({ stats, sections }: StatsPreviewCardProps) {
  const navigate = useNavigate()
  const total = stats.totalIncome || 1
  const colors = resolveChartColors()
  const palette = sections.map((_, i) => colors.sections[i % colors.sections.length] as string)

  const data = {
    labels: sections.map((s) => s.name),
    datasets: [
      {
        data: sections.map((s) => s.percentage * 100),
        backgroundColor: palette,
        borderWidth: 0,
      },
    ],
  }

  const options: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '68%',
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx: TooltipItem<'doughnut'>) =>
            ` ${ctx.label} : ${Math.round(Number(ctx.parsed))} %`,
        },
      },
    },
  }

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

      {/* Doughnut de la répartition allouée */}
      <div className="relative h-32">
        <Doughnut data={data} options={options} />
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
                  style={{ background: palette[i] }}
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
