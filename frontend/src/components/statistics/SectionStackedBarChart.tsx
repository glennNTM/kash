import { Bar } from 'react-chartjs-2'
import type { ChartOptions, TooltipItem } from 'chart.js'
import type { Month, DashboardStats } from '../../types/budget'
import { resolveChartColors } from '../../lib/chart'
import { buildSectionStacked } from '../../lib/statistics'
import { formatAmount } from '../../lib/format'

interface Props {
  month: Month
  stats: DashboardStats
}

export default function SectionStackedBarChart({ month, stats }: Props) {
  const colors = resolveChartColors()
  const { labels, spent, remaining } = buildSectionStacked(month, stats)

  const data = {
    labels,
    datasets: [
      {
        label: 'Dépensé',
        data: spent,
        backgroundColor: colors.accent,
        borderRadius: 4,
      },
      {
        label: 'Restant',
        data: remaining,
        backgroundColor: colors.neutral,
        borderRadius: 4,
      },
    ],
  }

  const options: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { labels: { color: colors.text, boxWidth: 12 } },
      tooltip: {
        callbacks: {
          label: (ctx: TooltipItem<'bar'>) =>
            `${ctx.dataset.label} : ${formatAmount(ctx.parsed.y ?? 0)}`,
        },
      },
    },
    scales: {
      x: { stacked: true, grid: { display: false }, ticks: { color: colors.text } },
      y: {
        stacked: true,
        grid: { color: colors.grid },
        ticks: {
          color: colors.text,
          callback: (value) => formatAmount(Number(value)),
        },
      },
    },
  }

  return <Bar data={data} options={options} />
}
