/**
 * Formate un montant en FCFA.
 * Le FCFA est une devise sans sous-unité (pas de centimes).
 * On n'utilise PAS Intl avec style:'currency' + currency:'XAF'
 * pour rester indépendant des locales navigateur et afficher
 * exactement "269 500 FCFA".
 *
 * Exemples :
 *   formatAmount(269500)   → "269 500 FCFA"
 *   formatAmount(-12000)   → "-12 000 FCFA"
 *   formatAmount(0)        → "0 FCFA"
 */
export function formatAmount(value: number): string {
  const formatted = new Intl.NumberFormat('fr-FR', {
    maximumFractionDigits: 0,
  }).format(value)
  return `${formatted} FCFA`
}

/**
 * Formate un pourcentage (0.5 → "50 %").
 */
export function formatPercent(value: number): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'percent',
    maximumFractionDigits: 0,
  }).format(value)
}
