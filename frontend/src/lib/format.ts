/**
 * Formate un montant en FCFA.
 * Le FCFA est une devise sans sous-unité (pas de centimes).
 * On n'utilise PAS Intl avec style:'currency' + currency:'XAF'
 * pour rester indépendant des locales navigateur et afficher
 * exactement "269 500 FCFA".
 *
 * Les formateurs `Intl` sont construits une seule fois au chargement du module :
 * la landing appelle `formatAmount` des dizaines de fois par rendu (bandeaux de
 * relevé, maquettes de téléphone), et instancier un `NumberFormat` à chaque
 * appel est l'opération la plus coûteuse de la chaîne.
 *
 * Exemples :
 *   formatAmount(269500)   → "269 500 FCFA"
 *   formatAmount(-12000)   → "-12 000 FCFA"
 *   formatAmount(0)        → "0 FCFA"
 */
const amountFormatter = new Intl.NumberFormat('fr-FR', {
  maximumFractionDigits: 0,
})

export function formatAmount(value: number): string {
  return `${amountFormatter.format(value)} FCFA`
}

const percentFormatter = new Intl.NumberFormat('fr-FR', {
  style: 'percent',
  maximumFractionDigits: 0,
})

/**
 * Formate un pourcentage (0.5 → "50 %").
 */
export function formatPercent(value: number): string {
  return percentFormatter.format(value)
}
