import { X, Check } from '../../lib/icons'
import MicroTestimonial from './MicroTestimonial'

const PAIN = [
  'Tu finis le mois sans savoir où est passé ton argent',
  "Tu n'épargnes jamais, il ne reste rien",
  'Tu stresses à chaque dépense imprévue',
  'Tu culpabilises sans comprendre pourquoi',
  "Tu repousses le sujet parce que c'est « compliqué »",
]

const RELIEF = [
  'Tu vois exactement où va chaque franc',
  'Ton épargne se construit automatiquement',
  "Ton fonds d'urgence te protège des imprévus",
  'Tu dépenses sans culpabilité, dans ton budget',
  'Tu gères tes finances en 2 minutes par jour',
]

export default function LandingProblem() {
  return (
    <section className="py-20 md:py-28 bg-(--bg-1)">
      <div className="max-w-6xl mx-auto px-6 md:px-10 lg:px-16">
        <h2
          className="font-display font-bold text-(--t-1) text-center mb-12 md:mb-16"
          style={{ fontSize: 'clamp(34px, 5vw, 56px)', lineHeight: '1.1' }}
        >
          La différence entre stresser et gérer
        </h2>

        <div className="grid md:grid-cols-2 gap-5">
          {/* Douleur — rouge/corail */}
          <div
            className="rounded-2xl border p-7 md:p-8"
            style={{
              borderColor: 'rgba(220, 38, 38, 0.18)',
              background: 'rgba(220, 38, 38, 0.04)',
            }}
          >
            <h3
              className="font-semibold text-(--t-1) mb-6"
              style={{ fontSize: 'var(--text-heading-m)', fontFamily: 'var(--font-body)' }}
            >
              Sans méthode, tu…
            </h3>
            <ul className="flex flex-col gap-4">
              {PAIN.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span
                    className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                    style={{ background: 'rgba(220, 38, 38, 0.12)' }}
                  >
                    <X size={13} style={{ color: 'var(--error)' }} strokeWidth={3} />
                  </span>
                  <span className="text-(--t-2)" style={{ fontSize: 'var(--text-body)' }}>
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Soulagement — vert */}
          <div className="rounded-2xl border border-(--accent) bg-(--accent-soft) p-7 md:p-8">
            <h3
              className="font-semibold text-(--t-1) mb-6"
              style={{ fontSize: 'var(--text-heading-m)', fontFamily: 'var(--font-body)' }}
            >
              Avec Kash, tu…
            </h3>
            <ul className="flex flex-col gap-4">
              {RELIEF.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-(--accent)">
                    <Check size={13} className="text-white" strokeWidth={3} />
                  </span>
                  <span className="text-(--t-1)" style={{ fontSize: 'var(--text-body)' }}>
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <MicroTestimonial
          quote="Avant, mon salaire disparaissait sans que je sache où. Maintenant je sais, et ça change tout."
          author="Témoignage à recueillir"
        />
      </div>
    </section>
  )
}
