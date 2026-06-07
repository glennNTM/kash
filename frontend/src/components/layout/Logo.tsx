import { Link } from 'react-router-dom'
import { Wallet } from '../../lib/icons'
import { APP_NAME } from '../../lib/constants'

type LogoProps = {
  to?: string
  className?: string
}

/**
 * Lockup de marque Kash : badge icône (accent) + wordmark.
 * Partagé entre le header et le footer de la landing.
 */
export default function Logo({ to = '/', className = '' }: LogoProps) {
  return (
    <Link to={to} className={`flex items-center gap-2 ${className}`}>
      <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-(--accent) text-white shadow-sm">
        <Wallet size={18} strokeWidth={2.5} />
      </span>
      <span className="text-2xl font-bold text-(--t-1) font-display leading-none">
        {APP_NAME}
      </span>
    </Link>
  )
}
