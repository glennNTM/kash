import { Link } from 'react-router-dom'
import type { LucideIcon } from '../../lib/icons'

interface EmptyStateAction {
  label: string
  /** Lien interne (react-router) — prioritaire sur onClick. */
  to?: string
  /** Action impérative (ouvrir une modal, etc.). */
  onClick?: () => void
}

interface EmptyStateProps {
  icon: LucideIcon
  title: string
  description: string
  action?: EmptyStateAction
  /** Action secondaire discrète, en lien texte. */
  secondaryAction?: EmptyStateAction
  className?: string
}

/**
 * État vide réutilisable — ne jamais laisser un écran mort.
 * Illustration douce (icône cerclée d'accent), titre encourageant, explication,
 * et un CTA clair pour démarrer. Cf. règle UX « Empty States ».
 */
export default function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  secondaryAction,
  className = '',
}: EmptyStateProps) {
  const actionClass =
    'inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-(--accent) text-white font-semibold transition-colors hover:bg-(--accent-hover) active:scale-97'

  return (
    <div
      className={`flex flex-col items-center justify-center text-center px-6 py-16 ${className}`}
    >
      {/* Illustration */}
      <span className="grid place-items-center size-20 rounded-full bg-(--accent-soft) mb-6">
        <Icon size={34} strokeWidth={1.5} className="text-(--accent)" />
      </span>

      <h2
        className="font-display font-bold text-(--t-1) mb-2"
        style={{ fontSize: 'var(--text-heading-l)' }}
      >
        {title}
      </h2>

      <p
        className="text-(--t-2) max-w-sm mb-7"
        style={{ fontSize: 'var(--text-body-l)', lineHeight: '1.6' }}
      >
        {description}
      </p>

      {action &&
        (action.to ? (
          <Link
            to={action.to}
            className={actionClass}
            style={{ fontSize: 'var(--text-body-l)', transitionDuration: 'var(--duration-fast)' }}
          >
            {action.label}
          </Link>
        ) : (
          <button
            type="button"
            onClick={action.onClick}
            className={actionClass}
            style={{ fontSize: 'var(--text-body-l)', transitionDuration: 'var(--duration-fast)' }}
          >
            {action.label}
          </button>
        ))}

      {secondaryAction &&
        (secondaryAction.to ? (
          <Link
            to={secondaryAction.to}
            className="mt-3 text-sm font-medium text-(--t-3) hover:text-(--t-1) transition-colors"
            style={{ transitionDuration: 'var(--duration-fast)' }}
          >
            {secondaryAction.label}
          </Link>
        ) : (
          <button
            type="button"
            onClick={secondaryAction.onClick}
            className="mt-3 text-sm font-medium text-(--t-3) hover:text-(--t-1) transition-colors"
            style={{ transitionDuration: 'var(--duration-fast)' }}
          >
            {secondaryAction.label}
          </button>
        ))}
    </div>
  )
}
