import { Wallet, PiggyBank, Sparkles } from 'lucide-react'

const features = [
  {
    icon: Wallet,
    eyebrow: '50 %',
    title: 'Charges fixes',
    description:
      'Loyer, abonnements, courses essentielles — tout ce qui est nécessaire et prévisible. Kash vous aide à ne jamais dépasser cette enveloppe.',
    color: 'text-(--accent)',
    soft: 'bg-(--accent-soft)',
  },
  {
    icon: PiggyBank,
    eyebrow: '30 %',
    title: 'Épargne & objectifs',
    description:
      'Voyage, urgences, investissement — votre futur se construit ici. Définissez vos objectifs et suivez votre progression mois après mois.',
    color: 'text-(--accent)',
    soft: 'bg-(--accent-soft)',
  },
  {
    icon: Sparkles,
    eyebrow: '20 %',
    title: 'Loisirs & plaisirs',
    description:
      'Restaurants, sorties, shopping — une enveloppe dédiée pour profiter sans culpabilité, en sachant exactement ce qu\'il vous reste.',
    color: 'text-(--accent)',
    soft: 'bg-(--accent-soft)',
  },
]

export default function FeatureSection() {
  return (
    <section id="features" className="py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-6 md:px-10 lg:px-16">
        {/* Titre de section */}
        <div className="text-center mb-14">
          <span
            className="inline-block text-xs font-semibold uppercase tracking-widest text-(--accent) bg-(--accent-soft) px-3 py-1 rounded-full mb-4"
            style={{ fontSize: 'var(--text-eyebrow)' }}
          >
            Comment ça marche
          </span>
          <h2
            className="font-display font-bold text-(--t-1) mb-4"
            style={{ fontSize: 'var(--text-display-m)', letterSpacing: 'normal' }}
          >
            La règle du 50/30/20
          </h2>
          <p
            className="text-(--t-2) max-w-xl mx-auto"
            style={{ fontSize: 'var(--text-body-l)' }}
          >
            Une méthode simple, efficace et prouvée pour ne plus jamais finir
            le mois dans le rouge.
          </p>
        </div>

        {/* Cartes */}
        <div className="grid md:grid-cols-3 gap-6">
          {features.map(({ icon: Icon, eyebrow, title, description, color, soft }) => (
            <div
              key={title}
              className="bg-(--bg-2) rounded-xl border border-(--border-subtle) p-6 flex flex-col gap-4"
              style={{ boxShadow: 'var(--shadow-sm)' }}
            >
              <div className={`w-11 h-11 rounded-xl ${soft} flex items-center justify-center`}>
                <Icon size={22} className={color} strokeWidth={1.75} />
              </div>
              <div>
                <span
                  className="text-xs font-semibold uppercase tracking-widest text-(--accent)"
                  style={{ fontSize: 'var(--text-eyebrow)' }}
                >
                  {eyebrow}
                </span>
                <h3
                  className="font-semibold text-(--t-1) mt-1"
                  style={{ fontSize: 'var(--text-heading-s)', fontFamily: 'var(--font-body)' }}
                >
                  {title}
                </h3>
              </div>
              <p
                className="text-(--t-2)"
                style={{ fontSize: 'var(--text-body)' }}
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
