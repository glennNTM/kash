import { Doughnut } from 'react-chartjs-2'
import type { ChartOptions, TooltipItem } from 'chart.js'
import { SlidersHorizontal } from '../../lib/icons'
import { formatAmount, formatPercent } from '../../lib/format'
import { resolveChartColors } from '../../lib/chart'

interface StatsPreviewCardProps {
  totalIncome: number
  sections: { name: string; percentage: number }[]
  /** Ouvre la modale d'ajustement des pourcentages. */
  onAdjust: () => void
}

/**
 * Carte « Répartition des revenus » : donut de la répartition allouée par section
 * + légende (% et montant). Cliquer ouvre l'ajustement des pourcentages.
 */
export default function StatsPreviewCard({ totalIncome, sections, onAdjust }: StatsPreviewCardProps) {
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
      onClick={onAdjust}
      aria-label="Ajuster la répartition des revenus"
      className="w-full text-left rounded-xl border border-(--border-subtle) bg-(--bg-2) p-6 flex flex-col gap-4 transition-shadow duration-(--duration-fast) hover:shadow-md active:scale-[0.99] cursor-pointer"
      style={{ boxShadow: 'var(--shadow-sm)' }}
    >
      {/* Donut de la répartition allouée */}
      <div className="relative h-32">
        <Doughnut data={data} options={options} />
      </div>

      {/* Légende : % du revenu + montant alloué par section */}
      <ul className="flex flex-col gap-2">
        {sections.map((sec, i) => (
          <li key={sec.name} className="flex items-center justify-between gap-3 text-xs">
            <span className="flex items-center gap-2 text-(--t-2) min-w-0">
              <span
                className="size-2 rounded-full shrink-0"
                style={{ background: palette[i] }}
              />
              <span className="truncate">{sec.name}</span>
            </span>
            <span className="flex items-baseline gap-1.5 shrink-0 whitespace-nowrap">
              <span className="font-semibold text-(--t-1)" style={{ fontFamily: 'var(--font-mono)' }}>
                {formatPercent(sec.percentage)}
              </span>
              <span className="text-(--t-3)" style={{ fontFamily: 'var(--font-mono)' }}>
                {formatAmount(sec.percentage * totalIncome)}
              </span>
            </span>
          </li>
        ))}
      </ul>

      {/* Affordance : la carte est cliquable pour ajuster */}
      <div className="flex items-center gap-1.5 mt-auto pt-1 text-xs font-medium text-(--accent)">
        <SlidersHorizontal size={13} strokeWidth={2.5} />
        Ajuster la répartition
      </div>
    </button>
  )
}
