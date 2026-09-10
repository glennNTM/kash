import { Minus, Check } from '../../lib/icons'
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

/**
 * Avant / après, en deux colonnes séparées par un filet.
 *
 * Pas de cartes colorées ici : dans le système « relevé », l'opposition se lit
 * dans le contraste des marqueurs (tiret éteint contre coche en accent), pas
 * dans deux blocs rouge et vert qui se disputent l'attention.
 */
export default function LandingProblem() {
  return (
    <section className="bg-(--bg-1) border-t border-(--border-subtle) py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-6 md:px-10 lg:px-16">
        <h2 className="max-w-2xl mb-14" style={{ fontSize: 'clamp(30px, 4.4vw, 48px)' }}>
          La différence entre stresser et gérer
        </h2>

        <div className="grid md:grid-cols-2">
          {/* Sans méthode */}
          <div className="md:pr-12 lg:pr-16 pb-10 md:pb-0 border-b md:border-b-0 md:border-r border-(--border-medium)">
            <h3
              className="font-body font-bold text-(--t-3) uppercase mb-7"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-eyebrow)',
                letterSpacing: '0.14em',
              }}
            >
              Sans méthode
            </h3>
            <ul className="flex flex-col">
              {PAIN.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 py-3.5 border-t border-(--border-subtle) first:border-t-0"
                >
                  <Minus size={15} className="text-(--t-3) shrink-0 mt-1" strokeWidth={2.5} />
                  <span className="text-(--t-2)" style={{ fontSize: 'var(--text-body)' }}>
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Avec Kash */}
          <div className="md:pl-12 lg:pl-16 pt-10 md:pt-0">
            <h3
              className="font-body font-bold text-(--accent) uppercase mb-7"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-eyebrow)',
                letterSpacing: '0.14em',
              }}
            >
              Avec Kash
            </h3>
            <ul className="flex flex-col">
              {RELIEF.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 py-3.5 border-t border-(--border-subtle) first:border-t-0"
                >
                  <Check size={15} className="text-(--accent) shrink-0 mt-1" strokeWidth={2.75} />
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
