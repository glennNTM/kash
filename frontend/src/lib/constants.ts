export const APP_NAME = 'Kash'

/** Baseline courte, reprise dans le footer et les métas. */
export const APP_TAGLINE = 'La méthode 50/30/20, en FCFA, sur mobile.'

// TODO: remplacer par les URLs réelles des fiches store à la publication de l'app.
export const APP_STORE_URL = '#'
export const PLAY_STORE_URL = '#'

/** Micro-réassurance sous chaque groupe de badges : un seul libellé partout. */
export const CTA_REASSURANCE = 'Gratuit · Sans connexion bancaire'

// TODO: remplacer par l'URL réelle de l'ebook sur Chariow.
export const CHARIOW_EBOOK_URL = '#'

// Liens centraux de la navbar (ancres vers les sections de la landing).
export const NAV_LINKS = [
  { label: 'La méthode', href: '#etapes' },
  { label: 'L’app', href: '#apercu' },
  { label: 'Le guide', href: '#ebook' },
  { label: 'FAQ', href: '#faq' },
] as const

export const LEGAL_LINKS = [
  { label: 'CGU', href: '/cgu' },
  { label: 'Confidentialité', href: '/confidentialite' },
  { label: 'Mentions légales', href: '/mentions-legales' },
] as const

// TODO: remplacer par les vrais comptes.
export const SOCIAL_LINKS = [
  { label: 'X', href: '#' },
  { label: 'Instagram', href: '#' },
] as const

/**
 * Répartition de référence affichée dans les maquettes de la landing.
 * Un seul jeu de chiffres pour toute la page : le bandeau de relevé, le
 * téléphone du hero et l'aperçu produit doivent raconter le même mois.
 */
export const DEMO_INCOME = 450_000

export const DEMO_SECTIONS = [
  { label: 'Charges', percent: 0.5, amount: 225_000, tone: 'var(--accent)' },
  { label: 'Épargne', percent: 0.3, amount: 135_000, tone: 'var(--t-2)' },
  { label: 'Loisirs', percent: 0.2, amount: 90_000, tone: 'var(--border-strong)' },
] as const

// Objections fréquentes de l'ICP (jeune salarié, premier salaire).
export const FAQ_ITEMS = [
  {
    q: "C'est vraiment gratuit ?",
    a: "Oui. L'application est gratuite, sans carte bancaire ni période d'essai. Le guide « La méthode 50/30/20 » est le seul produit payant, et il est totalement optionnel.",
  },
  {
    q: "C'est quoi la méthode 50/30/20 ?",
    a: 'Tu répartis ton revenu en trois enveloppes : 50 % pour les charges (loyer, factures), 30 % pour ton épargne et tes objectifs, 20 % pour tes loisirs. Les pourcentages sont ajustables à ta réalité.',
  },
  {
    q: 'Est-ce que mes données sont en sécurité ?',
    a: "Kash ne se connecte à aucun compte bancaire. C'est toi qui saisis tes revenus et tes dépenses : rien n'est aspiré automatiquement, tes informations restent les tiennes.",
  },
  {
    q: 'Ça marche en FCFA ?',
    a: 'Oui, Kash est pensé pour le FCFA dès le départ. Tes montants et tes répartitions sont affichés dans ta monnaie, sans bricolage.',
  },
  {
    q: "Je n'y connais rien en finance, c'est pour moi ?",
    a: "Justement. Kash est fait pour les débutants : aucune connaissance requise, une méthode simple, et des repères visuels qui te disent en un coup d'œil où tu en es.",
  },
  {
    q: 'Pourquoi Kash plutôt qu’un tableur ?',
    a: 'Un tableur ne te prévient de rien. Kash te montre ce qu’il te reste, t’alerte quand tu approches d’un plafond, et pré-remplit tes dépenses récurrentes chaque mois.',
  },
] as const
