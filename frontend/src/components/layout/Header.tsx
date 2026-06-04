import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { APP_NAME, NAV_LINKS, CHARIOW_EBOOK_URL } from '../../lib/constants'

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const isLogin = location.pathname === '/login'

  return (
    <header className="sticky top-0 z-50 bg-(--bg-glass) backdrop-blur-xl border-b border-(--border-subtle)">
      <div className="relative max-w-6xl mx-auto px-6 md:px-10 lg:px-16 h-[72px] flex items-center justify-between">
        <Link to="/" className="text-4xl font-bold text-(--accent) font-display leading-none">
          {APP_NAME}
        </Link>

        {/* Nav desktop — centrée */}
        <nav className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-8">
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              className="text-sm font-medium text-(--t-2) hover:text-(--t-1) transition-colors"
              style={{ transitionDuration: 'var(--duration-fast)' }}
            >
              {label}
            </a>
          ))}
        </nav>

        {/* CTA desktop */}
        <div className="hidden md:flex items-center gap-2">
          {!isLogin && (
            <Link
              to="/login"
              className="text-sm font-medium text-(--t-2) hover:text-(--t-1) transition-colors px-4 py-2"
              style={{ transitionDuration: 'var(--duration-fast)' }}
            >
              Connexion
            </Link>
          )}
          <a
            href={CHARIOW_EBOOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold bg-(--accent) text-white px-5 py-2.5 rounded-full hover:bg-(--accent-hover) transition-colors active:scale-97"
            style={{ transitionDuration: 'var(--duration-fast)' }}
          >
            Obtenir l&apos;ebook
          </a>
        </div>

        {/* Burger mobile */}
        <button
          className="md:hidden p-2 text-(--t-2) hover:text-(--t-1)"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Menu mobile */}
      {menuOpen && (
        <div className="md:hidden border-t border-(--border-subtle) bg-(--bg-2) px-4 pb-4 pt-2 flex flex-col gap-3">
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              className="text-sm font-medium text-(--t-2) py-2"
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </a>
          ))}
          {!isLogin && (
            <Link
              to="/login"
              className="text-sm font-medium text-(--t-2) py-2"
              onClick={() => setMenuOpen(false)}
            >
              Connexion
            </Link>
          )}
          <a
            href={CHARIOW_EBOOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold bg-(--accent) text-white px-5 py-3 rounded-full text-center mt-1"
          >
            Obtenir l&apos;ebook
          </a>
        </div>
      )}
    </header>
  )
}
