import { Wallet, SlidersHorizontal, BarChart3 } from '../../lib/icons'
import MicroTestimonial from './MicroTestimonial'
import StoreBadges from '../ui/StoreBadges'

const STEPS = [
  {
    icon: Wallet,
    title: 'Entre tes revenus',
    description: 'Salaire, primes, autres sources : tout est centralisé au même endroit.',
  },
  {
    icon: SlidersHorizontal,
    title: 'Répartis selon ta méthode',
    description: '50/30/20 par défaut, ajustable à ta sauce chaque mois.',
  },
  {
    icon: BarChart3,
    title: 'Suis et ajuste',
    description: 'Coche tes dépenses, vois ce qu’il reste, décide en conscience.',
  },
]

/**
 * Première des trois ponctuations sombres (avec le CTA final et le footer).
 * `data-tone="ink"` remappe les tokens de couleur pour tout ce bloc : les
 * composants enfants (badges compris) s'inversent sans code dédié.
 *
 * La numérotation est portante ici — c'est une vraie séquence, pas un motif
 * décoratif : on ne peut pas répartir avant d'avoir saisi ses revenus.
 */
export default function LandingSteps() {
  return (
    <>
      <section
        id="etapes"
        data-tone="ink"
        className="scroll-mt-20 py-20 md:py-28"
      >
        <div className="max-w-6xl mx-auto px-6 md:px-10 lg:px-16">
          <div className="flex flex-col gap-4 mb-14 max-w-2xl">
            <span
              className="uppercase text-(--accent)"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-eyebrow)',
                fontWeight: 700,
                letterSpacing: '0.14em',
              }}
            >
              La méthode
            </span>
            <h2 style={{ fontSize: 'clamp(30px, 4.4vw, 48px)' }}>
              Aussi simple que 1, 2, 3
            </h2>
          </div>

          <ol className="flex flex-col border-t border-(--border-medium)">
            {STEPS.map(({ icon: Icon, title, description }, i) => (
              <li
                key={title}
                className="grid grid-cols-[auto_1fr] md:grid-cols-[auto_minmax(0,280px)_1fr] items-start gap-x-6 gap-y-2 py-7 border-b border-(--border-subtle)"
              >
                <span
                  className="tabular text-(--accent)"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '13px',
                    fontWeight: 700,
                    letterSpacing: '0.06em',
                    paddingTop: '4px',
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>

                <h3
                  className="font-body font-bold text-(--t-1) flex items-center gap-3"
                  style={{ fontSize: 'var(--text-heading-m)', letterSpacing: '-0.01em' }}
                >
                  <Icon size={19} strokeWidth={1.9} className="text-(--accent) shrink-0" />
                  {title}
                </h3>

                <p
                  className="text-(--t-2) col-start-2 md:col-start-3"
                  style={{ fontSize: 'var(--text-body-l)' }}
                >
                  {description}
                </p>
              </li>
            ))}
          </ol>

          <div className="flex flex-col gap-3 mt-12">
            <StoreBadges />
            <span className="text-(--t-3)" style={{ fontSize: 'var(--text-body-s)' }}>
              Gratuit, aucun paiement requis
            </span>
          </div>
        </div>
      </section>

      <MicroTestimonial
        quote="En deux minutes mon budget était posé. Je ne pensais pas que ça pouvait être aussi simple."
        author="Témoignage à recueillir"
      />
    </>
  )
}
