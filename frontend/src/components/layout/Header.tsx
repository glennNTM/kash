import { Link, useLocation } from 'react-router-dom'
import { ArrowRight } from '../../lib/icons'
import Logo from './Logo'

export default function SiteHeader() {
  const location = useLocation()
  const isLogin = location.pathname === '/login'

  return (
    <header className="sticky top-4 z-50 px-4">
      <div className="max-w-5xl mx-auto flex items-center justify-between gap-4 rounded-full bg-(--accent-soft) backdrop-blur-xl border border-(--border-subtle) pl-5 pr-2 py-2 shadow-[0_8px_30px_rgba(0,0,0,0.05)]">
        <Logo />

        <div className="flex items-center gap-1">
          {!isLogin && (
            <Link
              to="/login"
              className="hidden sm:inline-flex text-sm font-medium text-(--t-2) hover:text-(--t-1) transition-colors px-4 py-2.5"
              style={{ transitionDuration: 'var(--duration-fast)' }}
            >
              Se connecter
            </Link>
          )}
          <Link
            to="/login"
            className="inline-flex items-center gap-1.5 text-sm font-semibold bg-(--accent) text-white px-5 py-2.5 rounded-full hover:bg-(--accent-hover) transition-colors active:scale-97"
            style={{ transitionDuration: 'var(--duration-fast)' }}
          >
            Commencer
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </header>
  )
}
