import { ChevronLeft, ChevronRight } from 'lucide-react'

const MONTHS_FR = [
  'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
  'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre',
]

interface MonthSelectorProps {
  year: number
  month: number
  onChange: (year: number, month: number) => void
}

export default function MonthSelector({ year, month, onChange }: MonthSelectorProps) {
  const now = new Date()
  const isCurrentOrFuture =
    year > now.getFullYear() ||
    (year === now.getFullYear() && month >= now.getMonth() + 1)

  function prev() {
    if (month === 1) onChange(year - 1, 12)
    else onChange(year, month - 1)
  }

  function next() {
    if (isCurrentOrFuture) return
    if (month === 12) onChange(year + 1, 1)
    else onChange(year, month + 1)
  }

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={prev}
        aria-label="Mois précédent"
        className="grid place-items-center size-8 rounded-full text-(--t-2) transition-colors duration-(--duration-fast) hover:bg-(--bg-3) hover:text-(--t-1)"
      >
        <ChevronLeft size={18} strokeWidth={2} />
      </button>

      <span className="min-w-[140px] text-center text-sm font-semibold text-(--t-1)">
        {MONTHS_FR[month - 1]} {year}
      </span>

      <button
        type="button"
        onClick={next}
        disabled={isCurrentOrFuture}
        aria-label="Mois suivant"
        className="grid place-items-center size-8 rounded-full text-(--t-2) transition-colors duration-(--duration-fast) hover:bg-(--bg-3) hover:text-(--t-1) disabled:opacity-30 disabled:cursor-not-allowed"
      >
        <ChevronRight size={18} strokeWidth={2} />
      </button>
    </div>
  )
}
