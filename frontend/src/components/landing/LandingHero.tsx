import { Link } from 'react-router-dom'
import { ArrowRight, Check } from '../../lib/icons'

// Bénéfices utilisateur (pas des fonctionnalités).
const BENEFITS = [
  'Aucune connaissance requise',
  'Ton budget prêt en 2 minutes',
  'Tes dépenses classées par enveloppe',
]

export default function LandingHero() {
  return (
    <section className="pt-16 pb-20 md:pt-24 md:pb-28 bg-(--bg-1)">
      <div className="max-w-3xl mx-auto px-6 flex flex-col items-center text-center gap-7">
        {/* H1 — le résultat désiré, pas l'outil */}
        <h1
          className="font-display font-bold text-(--t-1)"
          style={{ fontSize: 'clamp(52px, 9vw, 96px)', lineHeight: '1.05' }}
        >
          Arrête de finir tes mois{' '}
          <span
            className="text-(--accent) box-decoration-clone px-1"
            style={{
              background:
                'linear-gradient(transparent 62%, rgba(var(--accent-rgb), 0.18) 62%)',
            }}
          >
            à sec
          </span>
        </h1>

        {/* Sous-titre — comment Kash y aide, en 1-2 phrases */}
        <p
          className="text-(--t-2) max-w-xl"
          style={{ fontSize: 'var(--text-heading-s)', lineHeight: '1.7' }}
        >
          Kash répartit ton salaire en trois enveloppes claires, suit tes
          dépenses et te montre, à tout moment, ce qu'il te reste vraiment.
        </p>

        {/* 3 bénéfices */}
        <ul className="flex flex-col sm:flex-row sm:flex-wrap justify-center gap-x-6 gap-y-2.5">
          {BENEFITS.map((b) => (
            <li key={b} className="flex items-center gap-2.5">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-(--accent-soft)">
                <Check size={13} className="text-(--accent)" strokeWidth={3} />
              </span>
              <span className="text-(--t-1)" style={{ fontSize: 'var(--text-body)' }}>
                {b}
              </span>
            </li>
          ))}
        </ul>

        {/* CTV — vend le résultat, pas l'action */}
        <div className="flex flex-col items-center gap-3 pt-1">
          <Link
            to="/sign-up"
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap bg-(--accent) text-white font-semibold px-7 py-3.5 rounded-full hover:bg-(--accent-hover) transition-colors active:scale-97"
            style={{ transitionDuration: 'var(--duration-fast)', fontSize: 'var(--text-body-l)' }}
          >
            Reprendre le contrôle de mon argent
            <ArrowRight size={18} strokeWidth={2.5} />
          </Link>
          <span className="text-(--t-3)" style={{ fontSize: 'var(--text-body-s)' }}>
            Gratuit · Aucun paiement requis
          </span>
        </div>

        {/* Preuve sociale légère (placeholder : avatars + remplacer par un vrai compteur) */}
        <div className="flex items-center gap-3 pt-2">
          <div className="flex -space-x-2">
            {[0, 1, 2, 3].map((i) => (
              <span
                key={i}
                className="size-8 rounded-full border-2 border-(--bg-1)"
                style={{ background: 'var(--gradient-stat)', opacity: 1 - i * 0.15 }}
                aria-hidden
              />
            ))}
          </div>
          <p className="text-(--t-2)" style={{ fontSize: 'var(--text-body-s)' }}>
            Rejoins les premiers salariés qui reprennent le contrôle
          </p>
        </div>
      </div>
    </section>
  )
}
