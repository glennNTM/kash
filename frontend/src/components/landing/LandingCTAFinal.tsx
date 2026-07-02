import { Link } from 'react-router-dom'
import { ArrowRight } from '../../lib/icons'

export default function LandingCTAFinal() {
  return (
    <section
      className="w-full py-20 md:py-28 px-6 text-center text-white"
      style={{ background: 'var(--gradient-stat)' }}
    >
      <div className="max-w-3xl mx-auto flex flex-col items-center">
        <h2
          className="font-display font-bold mb-4"
          style={{ fontSize: 'clamp(36px, 6vw, 64px)', lineHeight: '1.1' }}
        >
          Ton prochain mois ne finira pas à sec
        </h2>
        <p className="text-white/85 max-w-xl mx-auto mb-8" style={{ fontSize: 'var(--text-body-l)' }}>
          Pose ton budget en 2 minutes, gratuitement. Ton futur toi te remerciera.
        </p>

        {/* Même CTV que le hero */}
        <Link
          to="/sign-up"
          className="inline-flex items-center gap-2 whitespace-nowrap bg-white text-(--accent) font-semibold px-7 py-3.5 rounded-full hover:bg-white/90 transition-colors active:scale-97"
          style={{ transitionDuration: 'var(--duration-fast)', fontSize: 'var(--text-body-l)' }}
        >
          Reprendre le contrôle de mon argent
          <ArrowRight size={18} strokeWidth={2.5} />
        </Link>
        <p className="text-white/70 mt-4" style={{ fontSize: 'var(--text-body-s)' }}>
          Gratuit · Aucun paiement requis
        </p>
      </div>
    </section>
  )
}
