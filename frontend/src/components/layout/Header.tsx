import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { ArrowDown, Menu, X } from '../../lib/icons'
import { NAV_LINKS } from '../../lib/constants'
import Logo from './Logo'

/**
 * Header du site vitrine. Plus aucun lien de compte : l'inscription et la
 * connexion vivent dans l'app mobile, pas ici.
 *
 * Le CTA renvoie vers `#telecharger` (les deux badges en bas de page) plutôt
 * que directement vers un store : envoyer tout le monde sur l'App Store
 * laisserait les visiteurs Android dans le mur.
 *
 * Layout en 3 zones : logo à gauche · nav centrée · action à droite.
 * Grille `1fr auto 1fr` : les colonnes latérales égales garantissent que la
 * nav est réellement centrée, quelle que soit la largeur du logo ou du CTA.
 */
export default function SiteHeader() {
  const { pathname } = useLocation()
  const isHome = pathname === '/'
  const [open, setOpen] = useState(false)

  // Sur la landing : ancres internes. Ailleurs : retour à l'accueil puis ancre.
  const navHref = (href: string) => (isHome ? href : `/${href}`)

  return (
    <header className="sticky top-0 z-50 border-b border-(--border-medium) bg-(--bg-glass) backdrop-blur-md">
      {/* Lien d'évitement : premier arrêt clavier, invisible tant qu'il n'a pas le focus. */}
      <a
        href="#contenu"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-60 focus:bg-(--t-1) focus:text-(--bg-2) focus:px-4 focus:py-2.5 focus:rounded-(--radius-md) text-sm font-bold"
      >
        Aller au contenu
      </a>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 h-14 md:h-16">
          {/* Gauche — logo */}
          <div className="justify-self-start">
            <Logo />
          </div>

          {/* Centre — navigation (desktop) */}
          <nav className="hidden md:flex items-center justify-self-center gap-6 lg:gap-8">
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

          {/* Droite — action (desktop) + hamburger (mobile) */}
          <div className="justify-self-end flex items-center gap-1 sm:gap-2">
            <a
              href={navHref('#telecharger')}
              className="hidden sm:inline-flex items-center gap-1.5 text-sm font-bold bg-(--accent) text-white px-4 lg:px-5 py-2.5 rounded-(--radius-md) hover:bg-(--accent-hover) transition-colors whitespace-nowrap"
              style={{ transitionDuration: 'var(--duration-fast)' }}
            >
              Télécharger l’app
            </a>

            {/* Hamburger — mobile uniquement */}
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
              aria-expanded={open}
              className="md:hidden grid place-items-center size-10 text-(--t-1) hover:bg-(--bg-3) transition-colors rounded-(--radius-md)"
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Panneau mobile */}
        {open && (
          <nav className="md:hidden absolute inset-x-4 top-full mt-2 flex flex-col border border-(--border-medium) bg-(--bg-2) p-3 rounded-(--radius-lg) shadow-(--shadow-lg)">
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={href}
                href={navHref(href)}
                onClick={() => setOpen(false)}
                className="px-3 py-2.5 text-(--t-2) font-medium hover:text-(--t-1) hover:bg-(--bg-3) transition-colors rounded-(--radius-sm)"
              >
                {label}
              </a>
            ))}

            <a
              href={navHref('#telecharger')}
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center gap-1.5 text-sm font-bold bg-(--accent) text-white px-4 py-3 rounded-(--radius-md) hover:bg-(--accent-hover) transition-colors"
              style={{ transitionDuration: 'var(--duration-fast)' }}
            >
              Télécharger l’app
              <ArrowDown size={16} strokeWidth={2.5} />
            </a>
          </nav>
        )}
      </div>
    </header>
  )
}
