import { BookOpen, Check, Download, ArrowRight } from '../../lib/icons'
import { CHARIOW_EBOOK_URL } from '../../lib/constants'

const learnings = [
  'Répartir chaque revenu avec la règle 50/30/20, sans calculatrice',
  'Bâtir une épargne de sécurité même avec un premier salaire',
  'Identifier et couper les dépenses qui plombent ton mois',
  'Te fixer des objectifs atteignables et les tenir',
]

export default function EbookSection() {
  return (
    <section id="ebook" className="py-20 md:py-28 bg-(--bg-1)">
      <div className="max-w-6xl mx-auto px-6 md:px-10 lg:px-16">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Couverture ebook — gauche */}
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
                  Ebook
                </span>
                <BookOpen size={22} strokeWidth={1.75} />
              </div>
              <div>
                <p className="font-display font-bold leading-tight" style={{ fontSize: 'var(--text-heading-l)' }}>
                  La méthode<br />50 / 30 / 20
                </p>
                <p className="text-white/80 mt-2" style={{ fontSize: 'var(--text-body-s)' }}>
                  Le guide pour maîtriser ton premier salaire.
                </p>
              </div>
            </div>
          </div>

          {/* Argumentaire — droite */}
          <div className="flex flex-col gap-6">
            <span
              className="self-start font-semibold uppercase tracking-widest text-(--accent) bg-(--accent-soft) px-3 py-1.5 rounded-full"
              style={{ fontSize: 'var(--text-eyebrow)' }}
            >
              Va plus loin
            </span>

            <h2
              className="font-display font-bold text-(--t-1)"
              style={{ fontSize: 'var(--text-display-m)', letterSpacing: 'normal' }}
            >
              L'app t'outille. L'ebook t'apprend la méthode.
            </h2>

            <p className="text-(--t-2)" style={{ fontSize: 'var(--text-body-l)', lineHeight: '1.7' }}>
              Kash applique la règle au quotidien, mais c'est en comprenant le
              <em> pourquoi </em> que tu gardes le contrôle pour de bon. L'ebook
              condense la méthode en un guide clair, pensé pour les premiers salaires.
            </p>

            <ul className="flex flex-col gap-3">
              {learnings.map((item) => (
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
                <Download size={16} strokeWidth={2.5} />
                Obtenir l'ebook
                <ArrowRight size={16} strokeWidth={2.5} />
              </a>
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
