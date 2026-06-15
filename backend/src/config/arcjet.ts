import arcjet, { shield, detectBot } from '@arcjet/node'
import { env } from './env.js'

// La clé est obligatoire hors environnement de test (le middleware court-circuite Arcjet en test).
if (!env.ARCJET_KEY && env.NODE_ENV !== 'test') {
  throw new Error('ARCJET_KEY manquante')
}

// Instance Arcjet partagée. Règles de base (toujours actives) : shield + détection de bots.
// Le rate limit n'est PAS ici : il est superposé par route via aj.withRule() dans le middleware,
// pour appliquer une limite différente selon la sensibilité (auth strict vs API large).
const aj = arcjet({
  key: env.ARCJET_KEY,
  rules: [
    // Shield : protège contre les attaques courantes (SQLi, XSS, etc.).
    shield({ mode: 'LIVE' }),
    // Détection de bots : bloque tout sauf les moteurs de recherche.
    detectBot({
      mode: 'LIVE', // "DRY_RUN" pour journaliser sans bloquer
      allow: ['CATEGORY:SEARCH_ENGINE'], // Google, Bing, etc.
    }),
  ],
})

export default aj;