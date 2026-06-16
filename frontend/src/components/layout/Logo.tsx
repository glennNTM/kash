import { Link } from 'react-router-dom'
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
        {APP_NAME}
    </Link>
  )
}
