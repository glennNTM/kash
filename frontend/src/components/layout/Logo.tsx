import { Link } from 'react-router-dom'
import { APP_NAME } from '../../lib/constants'

type LogoProps = {
  to?: string
  className?: string
}

/**
 * Wordmark Kash — Schibsted Grotesk 900, chasse très resserrée.
 * Pas de badge ni d'icône : dans le système « relevé », la marque se signale
 * par la densité de la typo, pas par un symbole rapporté.
 */
export default function Logo({ to = '/', className = '' }: LogoProps) {
  return (
    <Link
      to={to}
      className={`font-display text-(--t-1) hover:text-(--t-1) ${className}`}
      style={{ fontSize: '21px', fontWeight: 900, letterSpacing: '-0.045em' }}
    >
      {APP_NAME}
    </Link>
  )
}
