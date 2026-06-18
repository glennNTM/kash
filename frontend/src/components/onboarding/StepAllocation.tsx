import { useState } from 'react'
import { ArrowRight, ChevronLeft } from '../../lib/icons'
import { formatAmount, formatPercent } from '../../lib/format'
import type { SectionType } from '../../types/budget'

export interface AllocationItem {
  name: string
  type: SectionType
  percentage: number // fraction : 0.5 = 50 %
}

const MIN_PCT = 0.1 // 10 %

interface StepAllocationProps {
  defaultValues: AllocationItem[]
  income: number
  onBack: () => void
  onNext: (allocation: AllocationItem[]) => void
}

export default function StepAllocation({
  defaultValues,
  income,
  onBack,
  onNext,
}: StepAllocationProps) {
  // valeurs locales en décimal (0.5 = 50 %), indexées par position
  const [values, setValues] = useState<number[]>(() => defaultValues.map((a) => a.percentage))

  const total = values.reduce((s, v) => s + v, 0)
  const totalPct = Math.round(total * 100)
  const isValid = totalPct === 100 && values.every((v) => v >= MIN_PCT)

  function handleChange(index: number, raw: string) {
    const num = parseFloat(raw)
    if (isNaN(num)) return
    setValues((prev) => prev.map((v, i) => (i === index ? +(num / 100).toFixed(4) : v)))
  }

  function handleSubmit() {
    if (!isValid) return
    onNext(defaultValues.map((a, i) => ({ ...a, percentage: values[i]! })))
  }

  const totalColor =
    totalPct === 100 ? 'var(--success)' : totalPct > 100 ? 'var(--error)' : 'var(--warning)'
  const remainingPct = 100 - totalPct

  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-4 mb-5">
        {defaultValues.map((section, index) => {
          const val = values[index]!
          const pct = Math.round(val * 100)
          const isUnder = val < MIN_PCT

          return (
            <div key={section.type + section.name} className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-(--t-1)">{section.name}</label>
                <span className="text-xs font-semibold tabular-nums text-(--t-2)">
                  {income > 0 ? formatAmount(income * val) : formatPercent(val)}
                </span>
              </div>

              {/* Slider */}
              <input
                type="range"
                min={10}
                max={80}
                step={1}
                value={pct}
                onChange={(e) => handleChange(index, e.target.value)}
                className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
                style={{
                  accentColor: isUnder ? 'var(--error)' : 'var(--accent)',
                  background: `linear-gradient(to right, ${
                    isUnder ? 'var(--error)' : 'var(--accent)'
                  } ${pct}%, var(--bg-3) ${pct}%)`,
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
                  onChange={(e) => handleChange(index, e.target.value)}
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
        className="flex items-center justify-between rounded-lg px-4 py-3 mb-6 border"
        style={{
          background: isValid ? 'rgba(26,158,110,0.06)' : 'rgba(220,38,38,0.05)',
          borderColor: isValid ? 'rgba(26,158,110,0.2)' : 'rgba(220,38,38,0.2)',
        }}
      >
        <span className="text-sm font-medium text-(--t-2)">Total</span>
        <div className="flex items-center gap-2">
          {!isValid && remainingPct !== 0 && (
            <span className="text-xs text-(--t-3)">
              {remainingPct > 0
                ? `${remainingPct} % restants`
                : `${Math.abs(remainingPct)} % en trop`}
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
          onClick={onBack}
          className="flex items-center justify-center gap-1.5 px-5 py-3 rounded-full text-sm font-semibold text-(--t-2) bg-(--bg-3) transition-colors hover:bg-(--bg-4)"
        >
          <ChevronLeft size={18} />
          Retour
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!isValid}
          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-full text-sm font-semibold text-white bg-(--accent) transition-colors hover:bg-(--accent-hover) active:scale-97 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          Continuer
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  )
}
