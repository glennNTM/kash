import { formatAmount } from '../../lib/format'
import PhoneMockup from '../ui/PhoneMockup'

/**
 * Aperçu produit : trois écrans de l'app, côte à côte.
 *
 * PLACEHOLDER : les écrans sont reconstruits en markup plutôt qu'en captures,
 * pour rester nets sur tous les affichages et suivre le thème. Quand les
 * captures de l'app mobile seront prêtes, chaque `PhoneMockup` accepte une
 * `<img>` en enfant — la structure de la section ne bouge pas.
 *
 * Les chiffres racontent un seul et même mois de septembre, cohérent avec le
 * bandeau du hero : 450 000 de salaire, 357 000 déjà engagés, 93 000 restants.
 */

const SPENT = 357_000
const INCOME = 450_000

const ENVELOPES = [
  { label: 'Charges', spent: 180_000, total: 225_000 },
  { label: 'Épargne', spent: 135_000, total: 135_000 },
  { label: 'Loisirs', spent: 42_000, total: 90_000 },
]

const SPLIT = [
  { label: 'Charges', percent: 50, amount: 225_000, tone: 'var(--accent)' },
  { label: 'Épargne', percent: 30, amount: 135_000, tone: 'var(--t-2)' },
  { label: 'Loisirs', percent: 20, amount: 90_000, tone: 'var(--border-strong)' },
]

const SCREENS = [
  {
    title: 'Ce qu’il te reste, en gros',
    desc: 'Le seul chiffre qui compte, au centre : ton salaire moins tes dépenses, recalculé à chaque paiement coché.',
  },
  {
    title: 'La règle 50/30/20, visible',
    desc: 'Ton salaire réparti en trois enveloppes. D’un coup d’œil, tu vois si l’équilibre tient encore.',
  },
  {
    title: 'Chaque enveloppe sous contrôle',
    desc: 'Charges, épargne, loisirs : une barre par section te prévient avant que ça déborde.',
  },
]

/** Petite ligne « libellé · montant » réutilisée dans les écrans. */
function MoneyRow({ label, value }: { label: string; value: number }) {
  return (
    <li className="flex items-baseline justify-between gap-3 py-2 border-t border-(--border-subtle) first:border-t-0">
      <span className="text-(--t-2)" style={{ fontSize: 'var(--text-caption)' }}>
        {label}
      </span>
      <span
        className="tabular text-(--t-1)"
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '12px',
          fontWeight: 500,
          letterSpacing: '-0.035em',
        }}
      >
        {formatAmount(value)}
      </span>
    </li>
  )
}

function ScreenLabel({ children }: { children: string }) {
  return (
    <span
      className="uppercase text-(--t-3)"
      style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '9.5px',
        fontWeight: 700,
        letterSpacing: '0.14em',
      }}
    >
      {children}
    </span>
  )
}

export default function LandingShowcase() {
  return (
    <section id="apercu" className="scroll-mt-20 bg-(--bg-2) border-t border-(--border-subtle) py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-6 md:px-10 lg:px-16">
        <div className="flex flex-col gap-4 mb-14 max-w-2xl">
          <h2 style={{ fontSize: 'clamp(30px, 4.4vw, 48px)' }}>
            Trois écrans, et tu sais où tu en es
          </h2>
          <p className="text-(--t-2)" style={{ fontSize: 'var(--text-body-l)' }}>
            Pas de tableau de bord à déchiffrer. Un solde, une répartition, des
            enveloppes — et rien d’autre à comprendre.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 justify-items-center">
          {/* Écran 1 — le solde */}
          <figure className="flex flex-col items-center gap-6 max-w-[280px]">
            <PhoneMockup label="Écran du solde : 93 000 FCFA restants sur le mois">
              <ScreenLabel>Restant ce mois</ScreenLabel>
              <p
                className="tabular text-(--accent)"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '28px',
                  fontWeight: 700,
                  letterSpacing: '-0.05em',
                  lineHeight: 1,
                }}
              >
                {formatAmount(INCOME - SPENT)}
              </p>
              <ul className="flex flex-col mt-1">
                <MoneyRow label="Revenus" value={INCOME} />
                <MoneyRow label="Dépensé" value={SPENT} />
              </ul>
            </PhoneMockup>
            <figcaption className="flex flex-col gap-2 text-center">
              <h3 className="font-body font-bold text-(--t-1)" style={{ fontSize: 'var(--text-heading-s)', letterSpacing: 0 }}>
                {SCREENS[0].title}
              </h3>
              <p className="text-(--t-2)" style={{ fontSize: 'var(--text-body-s)' }}>
                {SCREENS[0].desc}
              </p>
            </figcaption>
          </figure>

          {/* Écran 2 — la répartition */}
          <figure className="flex flex-col items-center gap-6 max-w-[280px]">
            <PhoneMockup label="Écran de répartition : 50 % charges, 30 % épargne, 20 % loisirs">
              <ScreenLabel>Répartition</ScreenLabel>
              <span className="flex h-2 w-full" aria-hidden>
                {SPLIT.map((s) => (
                  <span key={s.label} className="block h-full" style={{ width: `${s.percent}%`, background: s.tone }} />
                ))}
              </span>
              <ul className="flex flex-col">
                {SPLIT.map((s) => (
                  <li
                    key={s.label}
                    className="grid grid-cols-[8px_1fr_auto] items-center gap-2.5 py-2.5 border-t border-(--border-subtle) first:border-t-0"
                  >
                    <span aria-hidden className="block h-2 w-2" style={{ background: s.tone }} />
                    <span className="text-(--t-2) truncate" style={{ fontSize: 'var(--text-caption)' }}>
                      {s.label} · {s.percent} %
                    </span>
                    <span
                      className="tabular text-(--t-1)"
                      style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', fontWeight: 500, letterSpacing: '-0.035em' }}
                    >
                      {formatAmount(s.amount)}
                    </span>
                  </li>
                ))}
              </ul>
            </PhoneMockup>
            <figcaption className="flex flex-col gap-2 text-center">
              <h3 className="font-body font-bold text-(--t-1)" style={{ fontSize: 'var(--text-heading-s)', letterSpacing: 0 }}>
                {SCREENS[1].title}
              </h3>
              <p className="text-(--t-2)" style={{ fontSize: 'var(--text-body-s)' }}>
                {SCREENS[1].desc}
              </p>
            </figcaption>
          </figure>

          {/* Écran 3 — les enveloppes */}
          <figure className="flex flex-col items-center gap-6 max-w-[280px] sm:col-span-2 lg:col-span-1">
            <PhoneMockup label="Écran des enveloppes : consommation de chaque section du budget">
              <ScreenLabel>Enveloppes</ScreenLabel>
              <ul className="flex flex-col gap-4">
                {ENVELOPES.map(({ label, spent, total }) => {
                  const pct = Math.round((spent / total) * 100)
                  return (
                    <li key={label} className="flex flex-col gap-1.5">
                      <div className="flex items-baseline justify-between gap-2">
                        <span className="text-(--t-1)" style={{ fontSize: 'var(--text-caption)', fontWeight: 600 }}>
                          {label}
                        </span>
                        <span
                          className="tabular text-(--t-2)"
                          style={{ fontFamily: 'var(--font-mono)', fontSize: '10px' }}
                        >
                          {pct} %
                        </span>
                      </div>
                      <span className="block h-1.5 w-full bg-(--bg-3)" aria-hidden>
                        <span
                          className="block h-full"
                          style={{ width: `${pct}%`, background: 'var(--accent)' }}
                        />
                      </span>
                      <span
                        className="tabular text-(--t-3)"
                        style={{ fontFamily: 'var(--font-mono)', fontSize: '9.5px' }}
                      >
                        {formatAmount(spent)} / {formatAmount(total)}
                      </span>
                    </li>
                  )
                })}
              </ul>
            </PhoneMockup>
            <figcaption className="flex flex-col gap-2 text-center">
              <h3 className="font-body font-bold text-(--t-1)" style={{ fontSize: 'var(--text-heading-s)', letterSpacing: 0 }}>
                {SCREENS[2].title}
              </h3>
              <p className="text-(--t-2)" style={{ fontSize: 'var(--text-body-s)' }}>
                {SCREENS[2].desc}
              </p>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  )
}
