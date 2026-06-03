import { useState } from 'react'
import * as RadixDialog from '@radix-ui/react-dialog'
import toast from 'react-hot-toast'
import { DialogContent } from '../ui/Dialog'
import { formatPercent } from '../../lib/format'
import { useUpdatePercentages } from '../../hooks/useDashboard'
import type { Section } from '../../types/budget'

const MIN_PCT = 0.1  // 10 %

interface AdjustPercentagesModalProps {
  monthId: string
  sections: Section[]
  year: number
  month: number
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function AdjustPercentagesModal({
  monthId,
  sections,
  year,
  month,
  open,
  onOpenChange,
}: AdjustPercentagesModalProps) {
  // valeurs locales en décimal (0.5 = 50 %) — lazy init depuis sections
  // Le composant est remonté à chaque ouverture via key= dans le parent
  const [values, setValues] = useState<Record<string, number>>(() =>
    Object.fromEntries(sections.map((s) => [s.id, s.percentage]))
  )
  const update = useUpdatePercentages(year, month)

  const total = Object.values(values).reduce((s, v) => s + v, 0)
  const totalPct = Math.round(total * 100)
  const isValid = totalPct === 100 && Object.values(values).every((v) => v >= MIN_PCT)

  function handleChange(sectionId: string, raw: string) {
    const num = parseFloat(raw)
    if (isNaN(num)) return
    setValues((prev) => ({ ...prev, [sectionId]: +(num / 100).toFixed(4) }))
  }

  async function handleSave() {
    const res = await update.mutateAsync({ monthId, percentages: values })
    if ('error' in res) {
      toast.error(res.error)
      return
    }
    toast.success('Répartition mise à jour')
    onOpenChange(false)
  }

  const remaining = +(1 - total).toFixed(4)
  const remainingPct = Math.round(remaining * 100)
  const totalColor =
    totalPct === 100 ? 'var(--success)' : totalPct > 100 ? 'var(--error)' : 'var(--warning)'

  return (
    <RadixDialog.Root open={open} onOpenChange={onOpenChange}>
      <DialogContent title="Ajuster la répartition">
        <p className="text-sm text-(--t-2) mb-5">
          Chaque section doit représenter au minimum{' '}
          <span className="font-semibold text-(--t-1)">10 %</span>. La somme doit être exactement{' '}
          <span className="font-semibold text-(--t-1)">100 %</span>.
        </p>

        <div className="flex flex-col gap-4 mb-5">
          {sections.map((section) => {
            const val = values[section.id] ?? section.percentage
            const pct = Math.round(val * 100)
            const isUnder = val < MIN_PCT

            return (
              <div key={section.id} className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-(--t-1)">{section.name}</label>
                  <span
                    className="text-xs font-semibold"
                    style={{ color: isUnder ? 'var(--error)' : 'var(--t-2)' }}
                  >
                    {isUnder ? `min. 10 %` : formatPercent(val)}
                  </span>
                </div>

                {/* Slider */}
                <input
                  type="range"
                  min={10}
                  max={80}
                  step={1}
                  value={pct}
                  onChange={(e) => handleChange(section.id, e.target.value)}
                  className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
                  style={{
                    accentColor: isUnder ? 'var(--error)' : 'var(--accent)',
                    background: `linear-gradient(to right, ${isUnder ? 'var(--error)' : 'var(--accent)'} ${pct}%, var(--bg-3) ${pct}%)`,
                  }}
                />

                {/* Input numérique */}
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min={10}
                    max={80}
                    step={1}
                    value={pct}
                    onChange={(e) => handleChange(section.id, e.target.value)}
                    className="w-20 rounded-md border px-3 py-1.5 text-sm text-right outline-none transition-colors"
                    style={{
                      fontFamily: 'var(--font-mono)',
                      borderColor: isUnder ? 'var(--error)' : 'var(--border-medium)',
                      background: 'var(--bg-1)',
                      color: 'var(--t-1)',
                    }}
                  />
                  <span className="text-sm text-(--t-3)">%</span>
                </div>
              </div>
            )
          })}
        </div>

        {/* Jauge totale */}
        <div
          className="flex items-center justify-between rounded-lg px-4 py-3 mb-5 border"
          style={{
            background: isValid ? 'rgba(26,158,110,0.06)' : 'rgba(220,38,38,0.05)',
            borderColor: isValid ? 'rgba(26,158,110,0.2)' : 'rgba(220,38,38,0.2)',
          }}
        >
          <span className="text-sm font-medium text-(--t-2)">Total</span>
          <div className="flex items-center gap-2">
            {!isValid && remainingPct !== 0 && (
              <span className="text-xs text-(--t-3)">
                {remainingPct > 0 ? `${remainingPct} % restants` : `${Math.abs(remainingPct)} % en trop`}
              </span>
            )}
            <span
              className="text-base font-bold tabular-nums"
              style={{ fontFamily: 'var(--font-mono)', color: totalColor }}
            >
              {totalPct} %
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="flex-1 py-2.5 rounded-full text-sm font-semibold text-(--t-2) bg-(--bg-3) transition-colors hover:bg-(--bg-4)"
          >
            Annuler
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={!isValid || update.isPending}
            className="flex-1 py-2.5 rounded-full text-sm font-semibold text-white bg-(--accent) transition-colors hover:bg-(--accent-hover) disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {update.isPending ? 'Enregistrement…' : 'Enregistrer'}
          </button>
        </div>
      </DialogContent>
    </RadixDialog.Root>
  )
}
