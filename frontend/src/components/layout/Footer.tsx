import { ArrowRight } from '../../lib/icons'
import Logo from './Logo'
import { APP_NAME, CHARIOW_EBOOK_URL, LEGAL_LINKS } from '../../lib/constants'

export default function SiteFooter() {
  return (
    <footer className="bg-(--accent-soft) border-t border-(--border-subtle)">
      <div className="max-w-6xl mx-auto px-6 md:px-10 lg:px-16">
        {/* Bande CTA */}
        <div className="flex flex-col md:flex-row items-center md:items-center justify-between gap-6 py-12 border-b border-(--border-subtle)">
          <div className="flex flex-col items-center md:items-start gap-3 text-center md:text-left">
            <Logo />
            <p className="text-sm text-(--t-2) max-w-xs">
              La méthode 50/30/20 pour reprendre le contrôle de vos finances.
            </p>
          </div>
          <a
            href={CHARIOW_EBOOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-semibold bg-(--accent) text-white px-6 py-3 rounded-full hover:bg-(--accent-hover) transition-colors active:scale-97"
            style={{ transitionDuration: 'var(--duration-fast)' }}
          >
            Obtenir l&apos;ebook
            <ArrowRight size={16} />
          </a>
        </div>

        {/* Bas de page : copyright + liens légaux */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 py-6">
          <p className="text-sm text-(--t-2)">
            © {new Date().getFullYear()} {APP_NAME}. Tous droits réservés.
          </p>
          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
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
      </div>
    </footer>
  )
}
