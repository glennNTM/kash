import { Link } from 'react-router-dom'
import Logo from './Logo'
import { APP_NAME, APP_TAGLINE, LEGAL_LINKS, NAV_LINKS, SOCIAL_LINKS } from '../../lib/constants'

/**
 * Troisième et dernière ponctuation sombre : le footer prolonge le CTA final
 * sans rupture de fond, pour que la page se termine sur un seul bloc.
 */
export default function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer data-tone="ink" className="border-t border-(--border-subtle)">
      <div className="max-w-6xl mx-auto px-6 md:px-10 lg:px-16 py-14">
        <div className="grid gap-10 md:grid-cols-[1fr_auto_auto] md:gap-16">
          <div className="flex flex-col gap-3 max-w-xs">
            <Logo />
            <p className="text-(--t-2)" style={{ fontSize: 'var(--text-body-s)' }}>
              {APP_TAGLINE}
            </p>
          </div>

          <nav aria-label="Sections du site" className="flex flex-col gap-3">
            <span
              className="uppercase text-(--t-3)"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '9.5px',
                fontWeight: 700,
                letterSpacing: '0.14em',
              }}
            >
              Le site
            </span>
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={href}
                href={`/${href}`}
                className="text-(--t-2) hover:text-(--t-1) transition-colors"
                style={{ fontSize: 'var(--text-body-s)' }}
              >
                {label}
              </a>
            ))}
          </nav>

          <nav aria-label="Informations légales" className="flex flex-col gap-3">
            <span
              className="uppercase text-(--t-3)"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '9.5px',
                fontWeight: 700,
                letterSpacing: '0.14em',
              }}
            >
              Légal
            </span>
            {LEGAL_LINKS.map(({ label, href }) => (
              <Link
                key={href}
                to={href}
                className="text-(--t-2) hover:text-(--t-1) transition-colors"
                style={{ fontSize: 'var(--text-body-s)' }}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-12 pt-6 border-t border-(--border-subtle) flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-(--t-3)" style={{ fontSize: 'var(--text-caption)' }}>
            © {year} {APP_NAME}. Tous droits réservés.
          </p>

          <div className="flex items-center gap-5">
            {SOCIAL_LINKS.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-(--t-2) hover:text-(--t-1) transition-colors"
                style={{ fontSize: 'var(--text-body-s)' }}
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
