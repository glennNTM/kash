import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X } from '../../lib/icons'
import { APP_NAME, NAV_LINKS } from '../../lib/constants'

export default function LandingNavbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-(--bg-1)/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 md:px-10 h-16 flex items-center gap-4">
        {/* Gauche — logo */}
        <div className="flex-1 flex items-center">
          <Link
            to="/"
            className="font-display font-bold text-(--t-1)"
            style={{ fontSize: 'var(--text-heading-l)' }}
          >
            {APP_NAME}
          </Link>
        </div>

        {/* Centre — liens (desktop), parfaitement centré entre les zones égales */}
        <nav className="hidden md:flex items-center justify-center gap-8">
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              className="text-sm font-medium text-(--t-2) hover:text-(--t-1) transition-colors whitespace-nowrap"
              style={{ transitionDuration: 'var(--duration-fast)' }}
            >
              {label}
            </a>
          ))}
        </nav>

        {/* Droite — actions (desktop) + hamburger (mobile) */}
        <div className="flex-1 flex items-center justify-end gap-2">
          <Link
            to="/login"
            className="hidden md:inline-flex text-sm font-medium text-(--t-2) hover:text-(--t-1) transition-colors px-3 py-2"
            style={{ transitionDuration: 'var(--duration-fast)' }}
          >
            Se connecter
          </Link>
          <Link
            to="/sign-up"
            className="hidden md:inline-flex text-sm font-semibold bg-(--accent) text-white px-5 py-2.5 rounded-full hover:bg-(--accent-hover) transition-colors active:scale-97 whitespace-nowrap"
            style={{ transitionDuration: 'var(--duration-fast)' }}
          >
            Créer mon compte
          </Link>

          {/* Hamburger — mobile */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={open}
            className="md:hidden grid place-items-center size-10 -mr-2 rounded-full text-(--t-1) hover:bg-(--bg-3) transition-colors"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Panneau mobile */}
      {open && (
        <div className="md:hidden border-t border-(--border-subtle) bg-(--bg-2)">
          <nav className="flex flex-col px-6 py-4 gap-1">
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="py-2.5 text-(--t-2) font-medium hover:text-(--t-1) transition-colors"
              >
                {label}
              </a>
            ))}
            <div className="flex flex-col gap-2 pt-3 mt-2 border-t border-(--border-subtle)">
              <Link
                to="/login"
                className="py-2.5 text-center text-(--t-1) font-medium rounded-full border border-(--border-medium)"
              >
                Se connecter
              </Link>
              <Link
                to="/sign-up"
                className="py-2.5 text-center text-white font-semibold rounded-full bg-(--accent) hover:bg-(--accent-hover) transition-colors"
              >
                Créer mon compte
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
