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
    <section
      id="ebook"
      className="scroll-mt-20 bg-(--bg-1) border-t border-(--border-subtle) py-20 md:py-28"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-10 lg:px-16">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* PLACEHOLDER : couverture reconstruite en markup, à remplacer par
              le vrai visuel dès qu'il existe. */}
          <div className="flex justify-center md:justify-start">
            <div
              data-tone="ink"
              className="relative w-56 sm:w-64 aspect-[3/4] flex flex-col justify-between p-6"
              style={{ boxShadow: 'var(--shadow-lg)' }}
            >
              <div className="flex items-center justify-between">
                <span
                  className="uppercase text-(--t-2)"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'var(--text-eyebrow)',
                    fontWeight: 700,
                    letterSpacing: '0.14em',
                  }}
                >
                  Le guide
                </span>
                <BookOpen size={20} strokeWidth={1.75} className="text-(--accent)" />
              </div>

              <div className="flex flex-col gap-2">
                <p
                  className="font-display text-(--t-1)"
                  style={{ fontSize: 'var(--text-heading-l)', fontWeight: 900, lineHeight: 1.05 }}
                >
                  La méthode
                  <br />
                  50 / 30 / 20
                </p>
                <p className="text-(--t-2)" style={{ fontSize: 'var(--text-body-s)' }}>
                  Maîtriser ton premier salaire, pas à pas.
                </p>
              </div>
            </div>
          </div>

          {/* Argumentaire */}
          <div className="flex flex-col gap-6">
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)' }}>
              Apprends la méthode avant même de commencer
            </h2>

            <p className="text-(--t-2)" style={{ fontSize: 'var(--text-body-l)', lineHeight: '1.62' }}>
              L'app applique la règle au quotidien. Le guide t'explique le
              <em> pourquoi </em>, pour garder le contrôle pour de bon — condensé
              en un format clair, pensé pour les premiers salaires.
            </p>

            <ul className="flex flex-col">
              {LEARNINGS.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 py-3 border-t border-(--border-subtle) first:border-t-0"
                >
                  <Check size={15} className="text-(--accent) shrink-0 mt-1" strokeWidth={2.75} />
                  <span className="text-(--t-1)" style={{ fontSize: 'var(--text-body)' }}>
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            {/* Second CTA ebook — explicite, contrairement à celui de la
                section « Pourquoi Kash existe ». */}
            <div className="flex flex-wrap items-center gap-4 pt-1">
              <a
                href={CHARIOW_EBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-(--accent) text-white font-bold px-6 py-3 rounded-(--radius-md) hover:bg-(--accent-hover) transition-colors"
                style={{ transitionDuration: 'var(--duration-fast)', fontSize: 'var(--text-body)' }}
              >
                Télécharger le guide
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
