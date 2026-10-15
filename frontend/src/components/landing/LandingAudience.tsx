import { Minus, Check } from '../../lib/icons'

// TODO(contenu à valider)
const FOR_YOU = [
  'Tu touches un salaire et tu ne sais pas où il passe',
  'Tu veux épargner, même un peu, chaque mois',
  'Tu préfères une méthode simple à un tableur',
  'Tu veux savoir ce qu’il te reste, sans calculer',
]

// TODO(contenu à valider)
const NOT_FOR_YOU = [
  'Tu cherches à investir en bourse ou en crypto',
  'Tu veux que l’app se connecte à ta banque',
  'Tu as déjà un budget qui tient et un tableur qui te suffit',
]

/**
 * Auto-sélection : dire franchement à qui Kash ne s'adresse pas rend la
 * promesse plus crédible pour ceux à qui il s'adresse. Même grammaire visuelle
 * que `LandingProblem` (tiret éteint contre coche en accent), mais la coche
 * passe à gauche : ici c'est la colonne positive qui doit se lire en premier.
 */
export default function LandingAudience() {
  return (
    <section className="bg-(--bg-2) border-t border-(--border-subtle) py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-6 md:px-10 lg:px-16">
        <h2 className="max-w-2xl mb-14" style={{ fontSize: 'clamp(30px, 4.4vw, 48px)' }}>
          Kash n’est pas fait pour tout le monde
        </h2>

        <div className="grid md:grid-cols-2">
          <div className="md:pr-12 lg:pr-16 pb-10 md:pb-0 border-b md:border-b-0 md:border-r border-(--border-medium)">
            <h3
              className="font-body font-bold text-(--accent) uppercase mb-7"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-eyebrow)',
                letterSpacing: '0.14em',
              }}
            >
              C’est pour toi si
            </h3>
            <ul className="flex flex-col">
              {FOR_YOU.map((item) => (
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

          <div className="md:pl-12 lg:pl-16 pt-10 md:pt-0">
            <h3
              className="font-body font-bold text-(--t-3) uppercase mb-7"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-eyebrow)',
                letterSpacing: '0.14em',
              }}
            >
              Pas encore pour toi si
            </h3>
            <ul className="flex flex-col">
              {NOT_FOR_YOU.map((item) => (
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
        </div>
      </div>
    </section>
  )
}
