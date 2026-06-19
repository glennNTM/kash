import { Radar } from 'react-chartjs-2'
import type { ChartOptions, TooltipItem } from 'chart.js'
import type { Month, DashboardStats } from '../../types/budget'
import { resolveChartColors } from '../../lib/chart'
import { buildSectionRadar } from '../../lib/statistics'
import { formatAmount } from '../../lib/format'

interface Props {
  month: Month
  stats: DashboardStats
}

export default function SectionRadarChart({ month, stats }: Props) {
  const colors = resolveChartColors()
  const { labels, allocated, spent } = buildSectionRadar(month, stats)

  const data = {
    labels,
    datasets: [
      {
        label: 'Alloué',
        data: allocated,
        borderColor: colors.neutral,
        backgroundColor: 'transparent',
        borderDash: [5, 5],
        pointRadius: 2,
      },
      {
        label: 'Dépensé',
        data: spent,
        borderColor: colors.accent,
        backgroundColor: colors.accentSoft,
        fill: true,
        pointRadius: 2,
      },
    ],
  }

  const options: ChartOptions<'radar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { labels: { color: colors.text, boxWidth: 12 } },
      tooltip: {
        callbacks: {
          label: (ctx: TooltipItem<'radar'>) =>
            `${ctx.dataset.label} : ${formatAmount(ctx.parsed.r)}`,
        },
      },
    },
    scales: {
      r: {
        angleLines: { color: colors.grid },
        grid: { color: colors.grid },
        pointLabels: { color: colors.text },
        ticks: { display: false },
      },
    },
  }

  return <Radar data={data} options={options} />
}
