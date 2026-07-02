import { Link } from 'react-router-dom'
import { Wallet, SlidersHorizontal, BarChart3, ArrowRight } from '../../lib/icons'
import MicroTestimonial from './MicroTestimonial'

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

export default function LandingSteps() {
  return (
    <>
      <section
        id="etapes"
        className="scroll-mt-20 py-20 md:py-28 px-6"
        style={{
          background: 'var(--gradient-stat)',
          borderRadius: '0 0 50% 50% / 0 0 80px 80px',
        }}
      >
        <div className="max-w-6xl mx-auto md:px-4 lg:px-10">
          <div className="text-center mb-14">
            <h2
              className="font-display font-bold text-white"
              style={{ fontSize: 'clamp(34px, 5vw, 56px)' }}
            >
              Aussi simple que 1, 2, 3
            </h2>
          </div>

          {/* Cartes qui flippent au survol */}
          <div className="grid md:grid-cols-3 gap-6">
            {STEPS.map(({ icon: Icon, title, description }, i) => (
              <div key={title} className="group h-[300px] [perspective:1200px]">
                <div
                  className="relative w-full h-full [transform-style:preserve-3d] transition-[transform] group-hover:[transform:rotateY(180deg)]"
                  style={{
                    transitionDuration: '650ms',
                    transitionTimingFunction: 'var(--ease-smooth)',
                  }}
                >
                  {/* Face avant — numéro + icône + titre */}
                  <div
                    className="absolute inset-0 [backface-visibility:hidden] bg-(--bg-2) rounded-2xl border border-(--border-subtle) p-7 flex flex-col items-center justify-center text-center"
                    style={{ boxShadow: 'var(--shadow-sm)' }}
                  >
                    <span
                      className="font-display font-bold text-(--accent) leading-none"
                      style={{ fontSize: 'var(--text-display-m)' }}
                    >
                      {i + 1}
                    </span>
                    <div className="w-14 h-14 rounded-2xl bg-(--accent-soft) flex items-center justify-center mt-4">
                      <Icon size={26} className="text-(--accent)" strokeWidth={1.75} />
                    </div>
                    <h3
                      className="font-semibold text-(--t-1) mt-4"
                      style={{ fontSize: 'var(--text-heading-m)', fontFamily: 'var(--font-body)' }}
                    >
                      {title}
                    </h3>
                  </div>

                  {/* Face arrière — description */}
                  <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] bg-white/20 border border-white/30 rounded-2xl p-8 flex flex-col items-center justify-center text-center gap-4">
                    <h3
                      className="font-semibold text-white"
                      style={{ fontSize: 'var(--text-heading-m)', fontFamily: 'var(--font-body)' }}
                    >
                      {title}
                    </h3>
                    <p
                      className="text-white/90"
                      style={{ fontSize: 'var(--text-body-l)', lineHeight: '1.65' }}
                    >
                      {description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTV + objection levée */}
          <div className="flex flex-col items-center gap-3 mt-14">
            <Link
              to="/sign-up"
              className="inline-flex items-center gap-2 whitespace-nowrap bg-white text-(--accent) font-semibold px-7 py-3.5 rounded-full hover:bg-white/90 transition-colors active:scale-97"
              style={{ transitionDuration: 'var(--duration-fast)', fontSize: 'var(--text-body-l)' }}
            >
              Créer mon premier budget
              <ArrowRight size={18} strokeWidth={2.5} />
            </Link>
            <span className="text-white/70" style={{ fontSize: 'var(--text-body-s)' }}>
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
