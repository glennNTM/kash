interface ProgressBarProps {
  ratio: number
}

export default function ProgressBar({ ratio }: ProgressBarProps) {
  const pct = Math.min(ratio * 100, 100)

  const fillColor =
    ratio > 1
      ? 'var(--error)'
      : ratio > 0.8
        ? 'var(--warning)'
        : 'var(--accent)'

  return (
    <div
      className="h-1.5 w-full rounded-full overflow-hidden"
      style={{ background: 'var(--bg-3)' }}
      role="progressbar"
      aria-valuenow={Math.round(ratio * 100)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className="h-full rounded-full transition-all duration-(--duration-slow)"
        style={{ width: `${pct}%`, background: fillColor }}
      />
    </div>
  )
}
