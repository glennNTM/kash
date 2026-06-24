import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ArrowRight, Menu, X } from '../../lib/icons'
import { NAV_LINKS } from '../../lib/constants'
import Logo from './Logo'

/**
 * Header unique de l'app publique (landing, login, sign-up).
 * Layout en 3 zones : logo à l'extrême gauche · nav centrée · actions à l'extrême droite.
 * Grille `1fr auto 1fr` : les deux colonnes latérales égales garantissent que la nav
 * est réellement centrée, indépendamment de la largeur du logo ou des CTA.
 */
export default function SiteHeader() {
  const { pathname } = useLocation()
  const isLogin = pathname === '/login'
  const isRegister = pathname === '/sign-up'
  const isHome = pathname === '/'
  const [open, setOpen] = useState(false)

  // Sur la landing : ancres internes (scroll). Ailleurs : on revient à l'accueil puis on ancre.
  const navHref = (href: string) => (isHome ? href : `/${href}`)

  return (
    <header className="sticky top-0 z-50">
      <div className="relative w-full mx-auto">
        <div className="grid grid-cols-[1fr_auto_1fr] items-center py-2 bg-(--bg-1) px-2">
          {/* Gauche — logo */}
          <div className="justify-self-start">
            <Logo />
          </div>

          {/* Centre — navigation (desktop) */}
          <nav className="hidden md:flex items-center justify-self-center gap-7">
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={href}
                href={navHref(href)}
                className="text-sm font-medium text-(--t-2) hover:text-(--t-1) transition-colors whitespace-nowrap"
                style={{ transitionDuration: 'var(--duration-fast)' }}
              >
                {label}
              </a>
            ))}
          </nav>

          {/* Droite — actions (desktop) + hamburger (mobile) */}
          <div className="justify-self-end flex items-center gap-1">
            {!isLogin && (
              <Link
                to="/login"
                className="hidden sm:inline-flex text-sm font-medium text-(--t-2) hover:text-(--t-1) transition-colors px-4 py-2.5"
                style={{ transitionDuration: 'var(--duration-fast)' }}
              >
                Se connecter
              </Link>
            )}
            {!isRegister && (
              <Link
                to="/sign-up"
                className="inline-flex items-center gap-1.5 text-sm font-semibold bg-(--accent) text-white px-5 py-2.5 rounded-full hover:bg-(--accent-hover) transition-colors active:scale-97 whitespace-nowrap"
                style={{ transitionDuration: 'var(--duration-fast)' }}
              >
                Commencer
                <ArrowRight size={16} />
              </Link>
            )}

            {/* Hamburger — mobile uniquement */}
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
              aria-expanded={open}
              className="md:hidden grid place-items-center size-10 rounded-full text-(--t-1) hover:bg-(--bg-3) transition-colors"
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Panneau mobile */}
        {open && (
          <nav className="md:hidden absolute inset-x-0 top-full mt-2 flex flex-col rounded-3xl border border-(--border-subtle) bg-(--bg-2) p-3 shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={href}
                href={navHref(href)}
                onClick={() => setOpen(false)}
                className="px-3 py-2.5 rounded-xl text-(--t-2) font-medium hover:text-(--t-1) hover:bg-(--bg-3) transition-colors"
              >
                {label}
              </a>
            ))}
          </nav>
        )}
      </div>
    </header>
  )
}
