import { formatAmount } from '../../lib/format'

/**
 * Bandeau de relevé — la signature du système visuel.
 *
 * Un rail de montants séparés par des filets d'un pixel, façon relevé bancaire.
 * Il remplace l'ancien `BackgroundRippleEffect`, qui posait le même halo vert
 * décoratif sur cinq sections et aplatissait toute la page : ici le décor
 * porte de l'information (la répartition réelle d'un mois).
 *
 * Débordement horizontal contenu dans le composant : sur mobile le rail défile
 * tout seul, la page ne part jamais en scroll latéral.
 */

export type LedgerEntry = {
  label: string
  /** Montant en FCFA (formaté ici), ou chaîne déjà mise en forme. */
  value: number | string
  /** Passe la valeur en accent — une seule par bandeau, sinon plus rien ne ressort. */
  highlight?: boolean
}

type LedgerTickerProps = {
  entries: readonly LedgerEntry[]
  className?: string
}

export default function LedgerTicker({ entries, className = '' }: LedgerTickerProps) {
  return (
    <div
      className={`flex overflow-x-auto border-t border-b border-(--border-medium) ${className}`}
    >
      {entries.map(({ label, value, highlight }) => (
        <div
          key={label}
          className="flex flex-col gap-1 shrink-0 grow px-5 py-3 first:pl-0 border-l border-(--border-subtle) first:border-l-0 whitespace-nowrap"
        >
          <span
            className="uppercase text-(--t-3)"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '9.5px',
              letterSpacing: '0.12em',
            }}
          >
            {label}
          </span>
          <span
            className="tabular"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '15px',
              fontWeight: 700,
              letterSpacing: '-0.045em',
              color: highlight ? 'var(--accent)' : 'var(--t-1)',
            }}
          >
            {typeof value === 'number' ? formatAmount(value) : value}
          </span>
        </div>
      ))}
    </div>
  )
}
