import StoreBadges from '../ui/StoreBadges'
import LedgerTicker from '../ui/LedgerTicker'

/**
 * Deuxième ponctuation sombre. Porte l'ancre `#telecharger` : c'est ici que
 * pointent tous les CTA « Télécharger l'app » du header et du menu mobile,
 * pour que le visiteur choisisse son store plutôt que d'être envoyé d'office
 * sur celui qui ne correspond pas à son téléphone.
 */
export default function LandingCTAFinal() {
  return (
    <section
      id="telecharger"
      data-tone="ink"
      className="scroll-mt-20 py-20 md:py-28"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-10 lg:px-16 flex flex-col gap-8">
        <div className="flex flex-col gap-5 max-w-2xl">
          <span
            className="uppercase text-(--accent)"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-eyebrow)',
              fontWeight: 700,
              letterSpacing: '0.14em',
            }}
          >
            Le mois prochain
          </span>

          <h2 style={{ fontSize: 'clamp(32px, 5vw, 56px)' }}>
            Ton prochain mois ne finira pas à sec
          </h2>

          <p className="text-(--t-2)" style={{ fontSize: 'var(--text-body-l)' }}>
            Pose ton budget en deux minutes. L’app est gratuite, sans carte
            bancaire.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <StoreBadges />
          <span className="text-(--t-3)" style={{ fontSize: 'var(--text-body-s)' }}>
            Gratuit · Aucun paiement requis
          </span>
        </div>

        {/* Rappel de la répartition : le même mois que le hero, en clôture. */}
        <LedgerTicker
          className="mt-4"
          entries={[
            { label: 'Salaire', value: 450_000 },
            { label: 'Charges 50 %', value: 225_000 },
            { label: 'Épargne 30 %', value: 135_000 },
            { label: 'Loisirs 20 %', value: 90_000 },
            { label: 'Reste à vivre', value: 90_000, highlight: true },
          ]}
        />
      </div>
    </section>
  )
}
