import { BookOpen, Check, ArrowRight } from '../../lib/icons'
import { CHARIOW_EBOOK_URL } from '../../lib/constants'

const LEARNINGS = [
  'Répartir chaque revenu avec la règle 50/30/20, sans calculatrice',
  'Bâtir une épargne de sécurité même avec un premier salaire',
  'Repérer et couper les dépenses qui plombent ton mois',
  'Te fixer des objectifs atteignables et les tenir',
]

export default function LandingEbook() {
  return (
    <section id="ebook" className="scroll-mt-20 py-20 md:py-28 bg-(--bg-2)">
      <div className="max-w-6xl mx-auto px-6 md:px-10 lg:px-16">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Couverture ebook — PLACEHOLDER (remplacer par le vrai visuel) */}
          <div className="flex justify-center md:justify-start">
            <div
              className="relative w-56 sm:w-64 aspect-[3/4] rounded-2xl overflow-hidden flex flex-col justify-between p-6 text-white"
              style={{ background: 'var(--gradient-stat)', boxShadow: 'var(--shadow-lg)' }}
            >
              <div className="flex items-center justify-between">
                <span
                  className="font-semibold uppercase tracking-widest bg-white/15 px-2.5 py-1 rounded-full"
                  style={{ fontSize: 'var(--text-eyebrow)' }}
                >
                  Le guide
                </span>
                <BookOpen size={22} strokeWidth={1.75} />
              </div>
              <div>
                <p className="font-display font-bold leading-tight" style={{ fontSize: 'var(--text-heading-l)' }}>
                  La méthode
                  <br />
                  50 / 30 / 20
                </p>
                <p className="text-white/80 mt-2" style={{ fontSize: 'var(--text-body-s)' }}>
                  Maîtriser ton premier salaire, pas à pas.
                </p>
              </div>
            </div>
          </div>

          {/* Argumentaire — droite */}
          <div className="flex flex-col gap-6">
            <h2
              className="font-display font-bold text-(--t-1)"
              style={{ fontSize: 'clamp(32px, 4.5vw, 52px)', lineHeight: '1.1' }}
            >
              Apprends la méthode avant même de commencer
            </h2>

            <p className="text-(--t-2)" style={{ fontSize: 'var(--text-body-l)', lineHeight: '1.7' }}>
              L'app applique la règle au quotidien. Le guide t'explique le
              <em> pourquoi </em>, pour garder le contrôle pour de bon — condensé
              en un format clair, pensé pour les premiers salaires.
            </p>

            <ul className="flex flex-col gap-3">
              {LEARNINGS.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-(--accent-soft)">
                    <Check size={13} className="text-(--accent)" strokeWidth={3} />
                  </span>
                  <span className="text-(--t-1)" style={{ fontSize: 'var(--text-body)' }}>
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap items-center gap-4 pt-1">
              <a
                href={CHARIOW_EBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 whitespace-nowrap bg-(--accent) text-white font-semibold px-6 py-3 rounded-full hover:bg-(--accent-hover) transition-colors active:scale-97"
                style={{ transitionDuration: 'var(--duration-fast)', fontSize: 'var(--text-body)' }}
              >
                Lire le guide complet
                <ArrowRight size={16} strokeWidth={2.5} />
              </a>
              {/* TODO: remplacer par le vrai prix de l'ebook sur Chariow. */}
              <span className="text-(--t-3)" style={{ fontSize: 'var(--text-body-s)' }}>
                Paiement unique · Accès à vie
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
