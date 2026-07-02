import { useNavigate } from 'react-router-dom'
import { Bar } from 'react-chartjs-2'
import type { ChartOptions, TooltipItem } from 'chart.js'
import { ArrowRight, TrendingUp } from '../../lib/icons'
import { formatAmount, formatPercent } from '../../lib/format'
import { resolveChartColors } from '../../lib/chart'
import { buildCategoryBreakdownFromMonths } from '../../lib/statistics'
import { useAllMonths } from '../../hooks/useDashboard'

// On ne montre que les premières catégories : au-delà, le détail vit dans /statistiques.
const TOP_N = 5

/**
 * Carte « Tendance de paiement » : met en avant la catégorie où l'utilisateur
 * dépense le plus, sur TOUT son historique (agrégation cross-mois), avec un
 * classement en barres horizontales. Cliquer → Statistiques.
 */
export default function PaymentTrendCard() {
  const navigate = useNavigate()
  const colors = resolveChartColors()
  const { data: months, isLoading, isError } = useAllMonths()

  const { labels, values } = buildCategoryBreakdownFromMonths(months ?? [])
  const totalSpent = values.reduce((sum, v) => sum + v, 0)

  const hasSpending = values.length > 0
  const topLabels = labels.slice(0, TOP_N)
  const topValues = values.slice(0, TOP_N)
  const topAmount = values[0] ?? 0
  const topShare = totalSpent > 0 ? topAmount / totalSpent : 0

  const palette = colors.categorical(topLabels.length)

  const data = {
    labels: topLabels,
    datasets: [
      {
        data: topValues,
        backgroundColor: palette,
        borderRadius: 6,
        barPercentage: 0.7,
      },
    ],
  }

  const options: ChartOptions<'bar'> = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx: TooltipItem<'bar'>) => ` ${formatAmount(ctx.parsed.x ?? 0)}`,
        },
      },
    },
    scales: {
      x: {
        grid: { color: colors.grid },
        ticks: { color: colors.text, maxTicksLimit: 4, callback: (v) => formatAmount(Number(v)) },
      },
      y: { grid: { display: false }, ticks: { color: colors.text } },
    },
  }

  return (
    <button
      type="button"
      onClick={() => navigate('/statistiques')}
      className="w-full text-left rounded-xl border border-(--border-subtle) bg-(--bg-2) p-6 flex flex-col gap-4 transition-shadow duration-(--duration-fast) hover:shadow-md active:scale-[0.99] cursor-pointer"
      style={{ boxShadow: 'var(--shadow-sm)' }}
    >
      {/* Titre */}
      <div className="flex items-center justify-between">
        <p className="flex items-center gap-2 text-sm font-semibold text-(--t-1)">
          <TrendingUp size={16} strokeWidth={2} className="text-(--accent)" />
          Tendance de paiement
        </p>
        <span className="flex items-center gap-1 text-xs font-medium text-(--accent)">
          Voir tout <ArrowRight size={13} strokeWidth={2.5} />
        </span>
      </div>

      {isLoading ? (
        <div className="h-52 skeleton" />
      ) : isError ? (
        <div className="h-52 flex items-center justify-center text-center">
          <p className="text-sm text-(--t-3)">Tendances indisponibles pour le moment.</p>
        </div>
      ) : hasSpending ? (
        <>
          {/* Catégorie la plus dépensière (tout l'historique) */}
          <div>
            <p className="text-xs text-(--t-2)" style={{ fontFamily: 'var(--font-mono)' }}>
              {formatAmount(topAmount)}
              <span className="text-(--t-3)"> · {formatPercent(topShare)} du dépensé</span>
            </p>
          </div>

          {/* Classement par catégorie (barres horizontales) */}
          <div className="relative h-40">
            <Bar data={data} options={options} />
          </div>
        </>
      ) : (
        <div className="h-52 flex items-center justify-center text-center">
          <p className="text-sm text-(--t-3)">
            Pas encore de dépense payée dans ton historique.
          </p>
        </div>
      )}
    </button>
  )
}
