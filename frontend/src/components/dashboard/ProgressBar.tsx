interface ProgressBarProps {
  ratio: number
}

export default function ProgressBar({ ratio }: ProgressBarProps) {
  const pct = Math.min(ratio * 100, 100)

  // Dépassement (> 100 %) en rouge ; jusqu'à 100 % inclus en accent (pas d'alerte
  // intermédiaire : atteindre l'alloué est un état normal, pas un avertissement).
  const fillColor = ratio > 1 ? 'var(--error)' : 'var(--accent)'

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
