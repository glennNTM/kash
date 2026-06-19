import { CloudOff, RotateCw } from '../../lib/icons'

interface ErrorStateProps {
  /** Quoi : ce qui n'a pas marché, côté utilisateur. */
  title?: string
  /** Pourquoi : la cause, en clair et sans jargon. */
  description?: string
  /** Action : relance la requête (React Query `refetch`). */
  onRetry?: () => void
  retrying?: boolean
  className?: string
}

/**
 * État d'erreur empathique — « Quoi + Pourquoi + Action ».
 * Ne dump jamais d'erreur technique : les messages sont passés humanisés
 * (cf. lib/errors.ts) ou laissés à leurs valeurs par défaut rassurantes.
 */
export default function ErrorState({
  title = 'Tes données n’ont pas pu se charger',
  description = 'La connexion au serveur a échoué — c’est temporaire, rien n’est perdu.',
  onRetry,
  retrying = false,
  className = '',
}: ErrorStateProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center text-center px-6 py-14 rounded-xl border border-(--border-subtle) bg-(--bg-2) ${className}`}
      style={{ boxShadow: 'var(--shadow-sm)' }}
      role="alert"
    >
      <span
        className="grid place-items-center size-16 rounded-full mb-5"
        style={{ background: 'rgba(220,38,38,0.08)' }}
      >
        <CloudOff size={30} strokeWidth={1.5} style={{ color: 'var(--error)' }} />
      </span>

      <h2 className="font-semibold text-(--t-1) mb-2" style={{ fontSize: 'var(--text-heading-s)' }}>
        {title}
      </h2>

      <p className="text-(--t-2) max-w-sm mb-6" style={{ fontSize: 'var(--text-body)' }}>
        {description}
      </p>

      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          disabled={retrying}
          className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-(--accent) text-white font-semibold transition-colors hover:bg-(--accent-hover) active:scale-97 disabled:opacity-60 disabled:cursor-not-allowed"
          style={{ fontSize: 'var(--text-body)', transitionDuration: 'var(--duration-fast)' }}
        >
          <RotateCw size={16} className={retrying ? 'animate-spin' : ''} />
          {retrying ? 'Nouvelle tentative…' : 'Réessayer'}
        </button>
      )}
    </div>
  )
}
