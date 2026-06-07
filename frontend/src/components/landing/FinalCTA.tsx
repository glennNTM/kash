import { Link } from 'react-router-dom'
import { ArrowRight, BookOpen } from '../../lib/icons'
import { CHARIOW_EBOOK_URL } from '../../lib/constants'

export default function FinalCTA() {
  return (
    <section className="px-6 pb-20 md:pb-28">
      <div
        className="max-w-5xl mx-auto rounded-2xl px-6 py-14 md:px-16 md:py-20 text-center text-white"
        style={{ background: 'var(--gradient-stat)', boxShadow: 'var(--shadow-lg)' }}
      >
        <h2
          className="font-display font-bold mb-4"
          style={{ fontSize: 'var(--text-display-m)', letterSpacing: 'normal' }}
        >
          Prêt à reprendre le contrôle ?
        </h2>
        <p
          className="text-white/85 max-w-xl mx-auto mb-8"
          style={{ fontSize: 'var(--text-body-l)' }}
        >
          Commence gratuitement en quelques minutes, ou approfondis la méthode
          avec l'ebook. Ton futur budget te remerciera.
        </p>

        <div className="flex flex-wrap justify-center gap-3">
          <Link
            to="/login"
            className="inline-flex items-center gap-2 whitespace-nowrap bg-white text-(--accent) font-semibold px-6 py-3 rounded-full hover:bg-white/90 transition-colors active:scale-97"
            style={{ transitionDuration: 'var(--duration-fast)', fontSize: 'var(--text-body)' }}
          >
            Commencer gratuitement
            <ArrowRight size={16} strokeWidth={2.5} />
          </Link>
          <a
            href={CHARIOW_EBOOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 whitespace-nowrap bg-white/15 text-white font-semibold px-6 py-3 rounded-full hover:bg-white/25 transition-colors border border-white/30"
            style={{ transitionDuration: 'var(--duration-fast)', fontSize: 'var(--text-body)' }}
          >
            <BookOpen size={16} strokeWidth={2.5} />
            Obtenir l'ebook
          </a>
        </div>
      </div>
    </section>
  )
}
