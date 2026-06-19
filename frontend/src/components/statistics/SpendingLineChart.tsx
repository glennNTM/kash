import { Line } from 'react-chartjs-2'
import type { ChartOptions, TooltipItem } from 'chart.js'
import type { Month } from '../../types/budget'
import { resolveChartColors } from '../../lib/chart'
import { buildCumulativeSpending } from '../../lib/statistics'
import { formatAmount } from '../../lib/format'

export default function SpendingLineChart({ month }: { month: Month }) {
  const colors = resolveChartColors()
  const { labels, cumulative, income } = buildCumulativeSpending(month)

  const data = {
    labels,
    datasets: [
      {
        label: 'Dépensé (cumulé)',
        data: cumulative,
        borderColor: colors.accent,
        backgroundColor: colors.accentSoft,
        fill: true,
        tension: 0.3,
        pointRadius: 2,
        pointHoverRadius: 4,
      },
      {
        label: 'Revenu',
        data: labels.map(() => income),
        borderColor: colors.neutral,
        borderDash: [5, 5],
        pointRadius: 0,
        fill: false,
      },
    ],
  }

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: 'index', intersect: false },
    plugins: {
      legend: { labels: { color: colors.text, boxWidth: 12 } },
      tooltip: {
        callbacks: {
          label: (ctx: TooltipItem<'line'>) =>
            `${ctx.dataset.label} : ${formatAmount(ctx.parsed.y ?? 0)}`,
        },
      },
    },
    scales: {
      x: { grid: { display: false }, ticks: { color: colors.text } },
      y: {
        grid: { color: colors.grid },
        ticks: {
          color: colors.text,
          callback: (value) => formatAmount(Number(value)),
        },
      },
    },
  }

  return <Line data={data} options={options} />
}
