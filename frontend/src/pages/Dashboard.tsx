import { useState } from 'react'
import toast from 'react-hot-toast'
import MonthSelector from '../components/dashboard/MonthSelector'
import HeroCard from '../components/dashboard/HeroCard'
import SectionGrid from '../components/dashboard/SectionGrid'
import SectionDetailModal from '../components/dashboard/SectionDetailModal'
import AdjustPercentagesModal from '../components/dashboard/AdjustPercentagesModal'
import RenameSectionModal from '../components/dashboard/RenameSectionModal'
import StatsPreviewCard from '../components/dashboard/StatsPreviewCard'
import RecentExpensesTable from '../components/dashboard/RecentExpensesTable'
import DashboardSkeleton from '../components/dashboard/DashboardSkeleton'
import ErrorState from '../components/ui/ErrorState'
import EmptyState from '../components/ui/EmptyState'
import { Wallet } from '../lib/icons'
import { useDashboard, useCreateMonth } from '../hooks/useDashboard'
import type { Section } from '../types/budget'

export default function Dashboard() {
  const now = new Date()
  const [year, setYear] = useState(now.getFullYear())
  const [month, setMonth] = useState(now.getMonth() + 1)

  const [activeSection, setActiveSection]       = useState<Section | null>(null)
  const [sectionModalOpen, setSectionModalOpen] = useState(false)
  const [adjustModalOpen, setAdjustModalOpen]   = useState(false)
  const [renameSection, setRenameSection]       = useState<Section | null>(null)
  const [renameModalOpen, setRenameModalOpen]   = useState(false)

  const { data, isLoading, isError, refetch, isFetching } = useDashboard(year, month)
  const createMonth = useCreateMonth(year, month)

  const monthData = data?.month ?? null
  const stats = data?.stats ?? null

  function openSection(section: Section) {
    setActiveSection(section)
    setSectionModalOpen(true)
  }

  function openRename(section: Section) {
    setRenameSection(section)
    setRenameModalOpen(true)
  }

  async function handleCreateMonth() {
    const res = await createMonth.mutateAsync()
    if ('error' in res) toast.error(res.error)
    else toast.success('Budget créé pour ce mois')
  }

  return (
    <div className="flex flex-col gap-6">
      {/* En-tête */}
      <div className="flex items-center justify-between">
        <h1
          className="font-bold text-(--t-1)"
          style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-display-m)' }}
        >
          Tableau de bord
        </h1>
        <div className="flex items-center gap-2">
          <MonthSelector
            year={year}
            month={month}
            onChange={(y, m) => { setYear(y); setMonth(m) }}
          />
        </div>
      </div>

      {/* Chargement : squelette « formé » de toute la page */}
      {isLoading && <DashboardSkeleton />}

      {isError && (
        <ErrorState onRetry={() => refetch()} retrying={isFetching} />
      )}

      {/* Aucun budget pour cette période (404) → invitation à le créer */}
      {data && monthData === null && (
        <EmptyState
          icon={Wallet}
          title="Pas encore de budget pour cette période"
          description="Crée ton budget du mois avec la répartition 50/30/20, puis ajuste-le comme tu veux."
          action={{ label: '+ Créer mon budget', onClick: handleCreateMonth }}
        />
      )}

      {/* Hero + Stats preview côte à côte */}
      {monthData && stats && (
        <div className="grid grid-cols-1 md:grid-cols-[1fr_260px] gap-4 items-stretch">
          <HeroCard stats={stats} />
          <StatsPreviewCard
            stats={stats}
            sections={monthData.sections.map((s) => ({ name: s.name, percentage: s.percentage }))}
          />
        </div>
      )}

      {/* Sections */}
      {monthData && stats && (
        <SectionGrid
          sections={monthData.sections}
          stats={stats.sections}
          onSectionClick={openSection}
          onAddSection={() => {}}
          onAdjustPercentages={() => setAdjustModalOpen(true)}
        />
      )}

      {/* Dernières dépenses — pleine largeur */}
      {stats && <RecentExpensesTable expenses={stats.recentExpenses} />}

      {/* Modales */}
      <SectionDetailModal
        section={activeSection}
        stats={stats?.sections.find((s) => s.sectionId === activeSection?.id) ?? null}
        year={year}
        month={month}
        open={sectionModalOpen}
        onOpenChange={(o) => { setSectionModalOpen(o); if (!o) setActiveSection(null) }}
        onRename={openRename}
      />

      {monthData && (
        <AdjustPercentagesModal
          key={adjustModalOpen ? 'adjust-open' : 'adjust-closed'}
          monthId={monthData.id}
          sections={monthData.sections}
          year={year}
          month={month}
          open={adjustModalOpen}
          onOpenChange={setAdjustModalOpen}
        />
      )}

      <RenameSectionModal
        section={renameSection}
        year={year}
        month={month}
        open={renameModalOpen}
        onOpenChange={(o) => { setRenameModalOpen(o); if (!o) setRenameSection(null) }}
      />
    </div>
  )
}
