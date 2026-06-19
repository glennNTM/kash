import { useState } from 'react'
import MonthSelector from '../components/dashboard/MonthSelector'
import ChartCard from '../components/statistics/ChartCard'
import SpendingLineChart from '../components/statistics/SpendingLineChart'
import CategoryPieChart from '../components/statistics/CategoryPieChart'
import SectionRadarChart from '../components/statistics/SectionRadarChart'
import SectionStackedBarChart from '../components/statistics/SectionStackedBarChart'
import Skeleton from '../components/ui/Skeleton'
import ErrorState from '../components/ui/ErrorState'
import EmptyState from '../components/ui/EmptyState'
import { BarChart3, TrendingUp, PieChart, Radar, Layers } from '../lib/icons'
import { useDashboard } from '../hooks/useDashboard'

export default function Statistiques() {
  const now = new Date()
  const [year, setYear] = useState(now.getFullYear())
  const [month, setMonth] = useState(now.getMonth() + 1)

  const { data, isLoading, isError, refetch, isFetching } = useDashboard(year, month)
  const monthData = data?.month ?? null
  const stats = data?.stats ?? null

  // Pas de dépense payée → Line et Pie n'ont rien à montrer.
  const hasSpending = (stats?.totalSpent ?? 0) > 0

  return (
    <div className="flex flex-col gap-6">
      {/* En-tête */}
      <div className="flex items-center justify-between">
        <h1
          className="font-bold text-(--t-1)"
          style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-display-m)' }}
        >
          Statistiques
        </h1>
        <MonthSelector
          year={year}
          month={month}
          onChange={(y, m) => {
            setYear(y)
            setMonth(m)
          }}
        />
      </div>

      {isLoading && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-80 rounded-xl" />
          ))}
        </div>
      )}

      {isError && <ErrorState onRetry={() => refetch()} retrying={isFetching} />}

      {/* Aucun budget pour cette période */}
      {data && monthData === null && (
        <EmptyState
          icon={BarChart3}
          title="Pas encore de quoi grapher"
          description="Crée ton budget et ajoute quelques dépenses depuis le tableau de bord, et on te montre exactement où part ton argent."
          action={{ label: 'Aller au tableau de bord', to: '/dashboard' }}
        />
      )}

      {monthData && stats && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <ChartCard
            title="Dépenses cumulées du mois"
            icon={TrendingUp}
            isEmpty={!hasSpending}
            emptyLabel="Aucune dépense payée ce mois-ci"
          >
            <SpendingLineChart month={monthData} />
          </ChartCard>

          <ChartCard
            title="Répartition par catégorie"
            icon={PieChart}
            isEmpty={!hasSpending}
            emptyLabel="Aucune dépense payée ce mois-ci"
          >
            <CategoryPieChart month={monthData} />
          </ChartCard>

          <ChartCard title="Alloué vs dépensé par section" icon={Radar}>
            <SectionRadarChart month={monthData} stats={stats} />
          </ChartCard>

          <ChartCard title="Consommation par section" icon={Layers}>
            <SectionStackedBarChart month={monthData} stats={stats} />
          </ChartCard>
        </div>
      )}
    </div>
  )
}
