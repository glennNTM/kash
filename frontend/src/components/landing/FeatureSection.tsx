import { Wallet, PiggyBank, Sparkles } from '../../lib/icons'

const features = [
  {
    icon: Wallet,
    percentage: '50 %',
    title: 'Charges fixes',
    description:
      'Loyer, abonnements, courses essentielles — tout ce qui est nécessaire et prévisible. Kash vous aide à ne jamais dépasser cette enveloppe.',
  },
  {
    icon: PiggyBank,
    percentage: '30 %',
    title: 'Épargne & objectifs',
    description:
      'Voyage, urgences, investissement — votre futur se construit ici. Définissez vos objectifs et suivez votre progression mois après mois.',
  },
  {
    icon: Sparkles,
    percentage: '20 %',
    title: 'Loisirs & plaisirs',
    description:
      'Restaurants, sorties, shopping — une enveloppe dédiée pour profiter sans culpabilité, en sachant exactement ce qu\'il vous reste.',
  },
]

export default function FeatureSection() {
  return (
    <section
      id="features"
      className="py-20 md:py-28 px-6"
      style={{
        background: 'var(--gradient-stat)',
        borderRadius: '0 0 50% 50% / 0 0 80px 80px',
      }}
    >
      <div className="max-w-6xl mx-auto md:px-4 lg:px-10">
        {/* Titre de section */}
        <div className="text-center mb-14">
          <span
            className="inline-block font-semibold uppercase tracking-widest text-white bg-white/15 px-3 py-1 rounded-full mb-4"
            style={{ fontSize: 'var(--text-eyebrow)' }}
          >
            Comment ça marche
          </span>
          <h2
            className="font-display font-bold text-white mb-4"
            style={{ fontSize: 'var(--text-display-m)', letterSpacing: 'normal' }}
          >
            La règle du 50/30/20
          </h2>
          <p
            className="text-white/85 max-w-xl mx-auto"
            style={{ fontSize: 'var(--text-body-l)' }}
          >
            Une méthode simple, efficace et prouvée pour ne plus jamais finir
            le mois dans le rouge.
          </p>
        </div>

        {/* Cartes */}
        <div className="grid md:grid-cols-3 gap-6">
          {features.map(({ icon: Icon, percentage, title, description }) => (
            <div key={title} className="group h-[300px] [perspective:1200px]">
              {/* Conteneur flip */}
              <div
                className="relative w-full h-full [transform-style:preserve-3d] transition-[transform] group-hover:[transform:rotateY(180deg)]"
                style={{
                  transitionDuration: '650ms',
                  transitionTimingFunction: 'var(--ease-smooth)',
                }}
              >
                {/* Face avant — icon + pourcentage + titre + description */}
                <div
                  className="absolute inset-0 [backface-visibility:hidden] bg-(--bg-2) rounded-2xl border border-(--border-subtle) p-7 flex flex-col items-center justify-center text-center"
                  style={{ boxShadow: 'var(--shadow-sm)' }}
                >
                  <div className="w-14 h-14 rounded-2xl bg-(--accent-soft) flex items-center justify-center shrink-0">
                    <Icon size={26} className="text-(--accent)" strokeWidth={1.75} />
                  </div>
                  <span
                    className="font-display font-bold text-(--accent) mt-4 leading-none"
                    style={{ fontSize: 'var(--text-heading-l)' }}
                  >
                    {percentage}
                  </span>
                  <h3
                    className="font-semibold text-(--t-1) mt-2"
                    style={{ fontSize: 'var(--text-heading-s)', fontFamily: 'var(--font-body)' }}
                  >
                    {title}
                  </h3>
                  <p
                    className="text-(--t-2) mt-3 line-clamp-3"
                    style={{ fontSize: 'var(--text-body)' }}
                  >
                    {description}
                  </p>
                </div>

                {/* Face arrière — titre + description mise en avant */}
                <div
                  className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] bg-white/20 border border-white/30 rounded-2xl p-8 flex flex-col items-center justify-center text-center gap-5"
                >
                  <h3
                    className="font-semibold text-white"
                    style={{ fontSize: 'var(--text-heading-s)', fontFamily: 'var(--font-body)' }}
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
      </div>
    </section>
  )
}
