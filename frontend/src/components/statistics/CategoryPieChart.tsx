import { Pie } from 'react-chartjs-2'
import type { ChartOptions, TooltipItem } from 'chart.js'
import type { Month } from '../../types/budget'
import { resolveChartColors } from '../../lib/chart'
import { buildCategoryBreakdown } from '../../lib/statistics'
import { formatAmount } from '../../lib/format'

export default function CategoryPieChart({ month }: { month: Month }) {
  const colors = resolveChartColors()
  const { labels, values } = buildCategoryBreakdown(month)

  const data = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: colors.categorical(values.length),
        borderColor: colors.accentSoft,
        borderWidth: 1,
      },
    ],
  }

  const options: ChartOptions<'pie'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'right', labels: { color: colors.text, boxWidth: 12 } },
      tooltip: {
        callbacks: {
          label: (ctx: TooltipItem<'pie'>) =>
            ` ${ctx.label} : ${formatAmount(Number(ctx.parsed))}`,
        },
      },
    },
  }

  return <Pie data={data} options={options} />
}
