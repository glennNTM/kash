import { Plus } from '../../lib/icons'
import type { Section, SectionStats } from '../../types/budget'
import SectionCard from './SectionCard'

interface SectionGridProps {
  sections: Section[]
  stats: SectionStats[]
  onSectionClick: (section: Section) => void
  onAddSection: () => void
  onAdjustPercentages: () => void
}

export default function SectionGrid({
  sections,
  stats,
  onSectionClick,
  onAddSection,
}: SectionGridProps) {
  const statsById = Object.fromEntries(stats.map((s) => [s.sectionId, s]))

  return (
    <div className="flex flex-col gap-4">
      {/* Titre + bouton ajuster */}
      <div className="flex items-center justify-between">
        <h2
          className="font-bold text-(--t-1)"
          style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-heading-l)' }}
        >
          Sections
        </h2>
      </div>

      {/* Grille */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {sections.map((section) => (
          <SectionCard
            key={section.id}
            section={section}
            stats={statsById[section.id] ?? { sectionId: section.id, allocated: 0, spent: 0, remaining: 0, ratio: 0 }}
            onClick={onSectionClick}
          />
        ))}

        {/* Carte "Ajouter une section" si < 4 */}
        {sections.length < 4 && (
          <button
            type="button"
            onClick={onAddSection}
            className="rounded-xl border border-dashed border-(--border-medium) bg-transparent p-5 flex flex-col items-center justify-center gap-2 text-(--t-3) min-h-30 transition-colors duration-(--duration-fast) hover:border-(--accent) hover:text-(--accent) hover:bg-(--accent-soft)"
          >
            <Plus size={22} strokeWidth={1.75} />
            <span className="text-sm font-medium">Ajouter une section</span>
          </button>
        )}
      </div>
    </div>
  )
}
