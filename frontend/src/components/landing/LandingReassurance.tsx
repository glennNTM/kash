import { Gift, Unlink, Banknote } from '../../lib/icons'

// TODO(contenu à valider)
// Uniquement des faits vérifiables sur le produit : aucun chiffre d'audience
// ni note de store tant que l'app n'en a pas de réels.
const FACTS = [
  { icon: Gift, title: 'Gratuit', detail: 'Sans carte, sans période d’essai' },
  { icon: Unlink, title: 'Sans connexion bancaire', detail: 'Tu saisis, rien n’est aspiré' },
  { icon: Banknote, title: 'Pensé en FCFA', detail: 'Tes montants dans ta monnaie' },
]

/**
 * Bande de réassurance juste sous le hero : elle lève les trois objections
 * qui bloquent le téléchargement (prix, sécurité, monnaie) avant que le
 * visiteur ne scrolle plus loin. Trois cellules séparées par des filets,
 * pas des cartes — même registre que le relevé.
 */
export default function LandingReassurance() {
  return (
    <section aria-labelledby="reassurance-titre" className="bg-(--bg-1) border-t border-(--border-subtle)">
      <h2 id="reassurance-titre" className="sr-only">
        Pourquoi tu peux installer Kash sans hésiter
      </h2>

      <div className="max-w-6xl mx-auto px-6 md:px-10 lg:px-16">
        <ul className="grid sm:grid-cols-3">
          {FACTS.map(({ icon: Icon, title, detail }) => (
            <li
              key={title}
              className="flex items-start gap-3 py-6 sm:px-6 first:sm:pl-0 last:sm:pr-0 border-t first:border-t-0 sm:border-t-0 sm:border-l sm:first:border-l-0 border-(--border-subtle)"
            >
              <Icon size={18} strokeWidth={1.9} className="text-(--accent) shrink-0 mt-0.5" aria-hidden />
              <span className="flex flex-col gap-0.5">
                <span className="font-bold text-(--t-1)" style={{ fontSize: 'var(--text-body)' }}>
                  {title}
                </span>
                <span className="text-(--t-2)" style={{ fontSize: 'var(--text-body-s)' }}>
                  {detail}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
