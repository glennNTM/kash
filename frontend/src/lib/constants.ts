export const APP_NAME = 'Kash'

export const CHARIOW_EBOOK_URL = '#' // TODO: remplacer par l'URL réelle de l'ebook sur Chariow

// Liens centraux de la navbar (ancres vers les sections de la landing).
export const NAV_LINKS = [
  { label: 'Comment ça marche', href: '#etapes' },
  { label: 'Le guide', href: '#ebook' },
  { label: 'FAQ', href: '#faq' },
] as const

// TODO: remplacer les `#` par les vraies routes/pages quand elles existeront.
export const LEGAL_LINKS = [
  { label: 'CGU', href: '#' },
  { label: 'Confidentialité', href: '#' },
  { label: 'Mentions légales', href: '#' },
  { label: 'Contact', href: '#' },
] as const

// TODO: remplacer par les vrais comptes.
export const SOCIAL_LINKS = [
  { label: 'X', href: '#' },
  { label: 'Instagram', href: '#' },
] as const

// Objections fréquentes de l'ICP (jeune salarié, premier salaire).
export const FAQ_ITEMS = [
  {
    q: "C'est vraiment gratuit ?",
    a: "Oui. L'application Kash est 100 % gratuite, sans carte bancaire ni période d'essai. L'ebook « La méthode 50/30/20 » est le seul produit payant, et il est totalement optionnel.",
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
    a: 'Un tableur ne te prévient de rien. Kash te montre visuellement ce qu’il te reste, t’alerte quand tu approches d’un plafond, et pré-remplit tes dépenses récurrentes chaque mois.',
  },
] as const
