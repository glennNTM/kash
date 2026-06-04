import { Wallet, PiggyBank, Sparkles } from 'lucide-react'

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
            <div
              key={title}
              className="group bg-(--bg-2) rounded-2xl border border-(--border-subtle) p-7 text-center flex flex-col items-center transition-[transform,box-shadow] duration-200 hover:-translate-y-1 hover:shadow-lg"
              style={{
                boxShadow: 'var(--shadow-sm)',
                transitionTimingFunction: 'var(--ease-apple)',
              }}
            >
              <div className="w-14 h-14 rounded-2xl bg-(--accent-soft) flex items-center justify-center">
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

              {/* Description — visible sur mobile, révélée au survol sur desktop */}
              <p
                className="text-(--t-2) overflow-hidden mt-3 md:mt-0 md:max-h-0 md:opacity-0 md:group-hover:mt-3 md:group-hover:max-h-40 md:group-hover:opacity-100 transition-[max-height,opacity,margin] duration-300"
                style={{
                  fontSize: 'var(--text-body)',
                  transitionTimingFunction: 'var(--ease-apple)',
                }}
              >
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
