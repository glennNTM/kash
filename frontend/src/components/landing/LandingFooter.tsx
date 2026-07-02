import { Link } from 'react-router-dom'
import { APP_NAME, LEGAL_LINKS } from '../../lib/constants'

export default function LandingFooter() {
  return (
    <footer className="bg-(--bg-2) border-t border-(--border-subtle)">
      <div className="max-w-6xl mx-auto px-6 md:px-10 lg:px-16 py-8 flex flex-col sm:flex-row items-center justify-between gap-5">
        {/* Logo */}
        <Link
          to="/"
          className="font-display font-bold text-(--t-1)"
          style={{ fontSize: 'var(--text-heading-l)' }}
        >
          {APP_NAME}
        </Link>

        {/* Liens légaux */}
        <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
          {LEGAL_LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="text-sm text-(--t-2) hover:text-(--accent) transition-colors"
              style={{ transitionDuration: 'var(--duration-fast)' }}
            >
              {label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  )
}
