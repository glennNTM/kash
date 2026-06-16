import { useState } from 'react'
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
import { useDashboard } from '../hooks/useDashboard'
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

  function openSection(section: Section) {
    setActiveSection(section)
    setSectionModalOpen(true)
  }

  function openRename(section: Section) {
    setRenameSection(section)
    setRenameModalOpen(true)
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
        <MonthSelector
          year={year}
          month={month}
          onChange={(y, m) => { setYear(y); setMonth(m) }}
        />
      </div>

      {/* Chargement : squelette « formé » de toute la page */}
      {isLoading && <DashboardSkeleton />}

      {isError && (
        <ErrorState onRetry={() => refetch()} retrying={isFetching} />
      )}
      {data && (
        <div className="grid grid-cols-1 md:grid-cols-[1fr_260px] gap-4 items-stretch">
          <HeroCard stats={data.stats} />
          <StatsPreviewCard
            stats={data.stats}
            sections={data.month.sections.map((s) => ({ name: s.name, percentage: s.percentage }))}
          />
        </div>
      )}

      {/* Sections */}
      {data && (
        <SectionGrid
          sections={data.month.sections}
          stats={data.stats.sections}
          onSectionClick={openSection}
          onAddSection={() => {}}
          onAdjustPercentages={() => setAdjustModalOpen(true)}
        />
      )}

      {/* Dernières dépenses — pleine largeur */}
      {data && <RecentExpensesTable expenses={data.stats.recentExpenses} />}

      {/* Modales */}
      <SectionDetailModal
        section={activeSection}
        stats={data?.stats.sections.find((s) => s.sectionId === activeSection?.id) ?? null}
        year={year}
        month={month}
        open={sectionModalOpen}
        onOpenChange={(o) => { setSectionModalOpen(o); if (!o) setActiveSection(null) }}
        onRename={openRename}
      />

      {data && (
        <AdjustPercentagesModal
          key={adjustModalOpen ? 'adjust-open' : 'adjust-closed'}
          monthId={data.month.id}
          sections={data.month.sections}
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
