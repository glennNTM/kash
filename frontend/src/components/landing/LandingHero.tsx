import { Check } from '../../lib/icons'
import { DEMO_INCOME, DEMO_SECTIONS } from '../../lib/constants'
import { formatAmount } from '../../lib/format'
import LedgerTicker from '../ui/LedgerTicker'
import PhoneMockup from '../ui/PhoneMockup'
import StoreBadges from '../ui/StoreBadges'

// Bénéfices utilisateur (pas des fonctionnalités).
const BENEFITS = [
  'Aucune connaissance requise',
  'Ton budget prêt en 2 minutes',
  'Tes dépenses classées par enveloppe',
]

const LEDGER = [
  { label: 'Salaire', value: DEMO_INCOME },
  { label: 'Charges 50 %', value: 225_000 },
  { label: 'Épargne 30 %', value: 135_000 },
  { label: 'Loisirs 20 %', value: 90_000 },
  { label: 'Reste à vivre', value: 90_000, highlight: true },
] as const

export default function LandingHero() {
  return (
    <section className="bg-(--bg-1) pt-12 pb-14 md:pt-16 md:pb-20">
      <div className="max-w-6xl mx-auto px-6 md:px-10 lg:px-16">
        <div className="grid lg:grid-cols-[1fr_auto] gap-12 lg:gap-16 items-center">
          {/* Colonne texte */}
          <div className="flex flex-col gap-5 min-w-0">
            <span
              className="uppercase text-(--t-3)"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-eyebrow)',
                fontWeight: 700,
                letterSpacing: '0.14em',
              }}
            >
              Méthode 50 / 30 / 20
            </span>

            {/* H1 — le résultat désiré, pas l'outil */}
            <h1 style={{ fontSize: 'clamp(34px, 5.6vw, 64px)' }}>
              Arrête de finir tes mois{' '}
              <span className="text-(--accent)">à sec</span>
            </h1>

            <p
              className="text-(--t-2) max-w-xl"
              style={{ fontSize: 'var(--text-body-l)', lineHeight: '1.62' }}
            >
              Kash répartit ton salaire en trois enveloppes claires, suit tes
              dépenses et te montre, à tout moment, ce qu’il te reste vraiment.
            </p>

            {/* 3 bénéfices */}
            <ul className="flex flex-col gap-2.5">
              {BENEFITS.map((b) => (
                <li key={b} className="flex items-center gap-2.5">
                  <Check size={15} className="text-(--accent) shrink-0" strokeWidth={2.75} />
                  <span className="text-(--t-1)" style={{ fontSize: 'var(--text-body)' }}>
                    {b}
                  </span>
                </li>
              ))}
            </ul>

            <div className="flex flex-col gap-3 pt-2">
              <StoreBadges />
              <span className="text-(--t-3)" style={{ fontSize: 'var(--text-body-s)' }}>
                Gratuit · Aucun paiement requis
              </span>
            </div>
          </div>

          {/* Colonne produit */}
          <div className="justify-self-center lg:justify-self-end">
            <PhoneMockup label="Écran d’accueil de l’application Kash : salaire du mois réparti en trois enveloppes">
              <span
                className="uppercase text-(--t-3)"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '9.5px',
                  fontWeight: 700,
                  letterSpacing: '0.14em',
                }}
              >
                Septembre
              </span>

              <p
                className="tabular text-(--t-1)"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '26px',
                  fontWeight: 700,
                  letterSpacing: '-0.05em',
                  lineHeight: 1,
                }}
              >
                {formatAmount(DEMO_INCOME)}
              </p>

              {/* Barre de répartition */}
              <span className="flex h-2 w-full" aria-hidden>
                {DEMO_SECTIONS.map((s) => (
                  <span
                    key={s.label}
                    className="block h-full"
                    style={{ width: `${s.percent * 100}%`, background: s.tone }}
                  />
                ))}
              </span>

              <ul className="flex flex-col">
                {DEMO_SECTIONS.map((s) => (
                  <li
                    key={s.label}
                    className="grid grid-cols-[8px_1fr_auto] items-center gap-2.5 py-2.5 border-t border-(--border-subtle) first:border-t-0"
                  >
                    <span
                      aria-hidden
                      className="block h-2 w-2"
                      style={{ background: s.tone }}
                    />
                    <span className="text-(--t-2) truncate" style={{ fontSize: 'var(--text-caption)' }}>
                      {s.label}
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
                      {formatAmount(s.amount)}
                    </span>
                  </li>
                ))}
              </ul>
            </PhoneMockup>
          </div>
        </div>

        {/* Bandeau de relevé — la signature, en clôture de hero */}
        <LedgerTicker entries={LEDGER} className="mt-14 md:mt-18" />
      </div>
    </section>
  )
}
