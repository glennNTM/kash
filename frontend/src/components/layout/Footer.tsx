import { Link } from 'react-router-dom'
import { APP_NAME, CHARIOW_EBOOK_URL } from '../../lib/constants'

export default function SiteFooter() {
  return (
    <footer className="border-t border-(--border-subtle) bg-(--bg-2)">
      <div className="max-w-6xl mx-auto px-6 md:px-10 lg:px-16 py-10 flex flex-col md:flex-row items-center md:items-start justify-between gap-8">
        <div className="flex flex-col items-center md:items-start gap-2">
          <Link to="/" className="text-lg font-bold text-(--accent) font-display">
            {APP_NAME}
          </Link>
          <p className="text-xs text-(--t-3) max-w-xs text-center md:text-left">
            La méthode 50/30/20 pour reprendre le contrôle de vos finances.
          </p>
        </div>

        <nav className="flex flex-col items-center md:items-start gap-2">
          <span className="text-xs font-semibold uppercase tracking-widest text-(--t-3) mb-1">
            Ressources
          </span>
          <a
            href={CHARIOW_EBOOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-(--t-2) hover:text-(--accent) transition-colors"
            style={{ transitionDuration: 'var(--duration-fast)' }}
          >
            Ebook 50/30/20
          </a>
        </nav>

        <nav className="flex flex-col items-center md:items-start gap-2">
          <span className="text-xs font-semibold uppercase tracking-widest text-(--t-3) mb-1">
            App
          </span>
          <Link
            to="/login"
            className="text-sm text-(--t-2) hover:text-(--accent) transition-colors"
            style={{ transitionDuration: 'var(--duration-fast)' }}
          >
            Connexion
          </Link>
        </nav>
      </div>

      <div className="border-t border-(--border-subtle) py-4 text-center text-xs text-(--t-3)">
        © {new Date().getFullYear()} {APP_NAME}. Tous droits réservés.
      </div>
    </footer>
  )
}
