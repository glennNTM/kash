/**
 * Humanisation des erreurs côté client.
 *
 * Règle UX (Error States) : ne JAMAIS afficher une erreur brute à l'utilisateur —
 * ni message technique, ni code, ni stack, ni texte Better Auth en anglais.
 * On traduit vers un message FR clair, avec une porte de sortie, et un repli
 * rassurant quand on ne reconnaît pas l'erreur.
 *
 * Périmètre : sources NON maîtrisées (Better Auth, réseau, statut HTTP, crash).
 * Les messages FR « authored » de notre propre API (`{ error: string }`) sont déjà
 * sûrs et peuvent être affichés directement, sans passer par ici.
 */

// Codes d'erreur Better Auth (stables) → message humain FR.
const AUTH_CODE_MESSAGES: Record<string, string> = {
  INVALID_EMAIL_OR_PASSWORD: 'E-mail ou mot de passe incorrect. Vérifie et réessaie.',
  INVALID_PASSWORD: 'E-mail ou mot de passe incorrect. Vérifie et réessaie.',
  INVALID_EMAIL: 'Cette adresse e-mail ne semble pas valide.',
  USER_ALREADY_EXISTS: 'Un compte existe déjà avec cette adresse. Connecte-toi plutôt.',
  USER_NOT_FOUND: 'Aucun compte ne correspond à cette adresse.',
  EMAIL_NOT_VERIFIED: 'Ton adresse e-mail n’est pas encore vérifiée — regarde ta boîte mail.',
  PASSWORD_TOO_SHORT: 'Mot de passe trop court (8 caractères minimum).',
  CREDENTIAL_ACCOUNT_NOT_FOUND: 'Aucun compte e-mail/mot de passe pour cette adresse.',
  SESSION_EXPIRED: 'Ta session a expiré. Reconnecte-toi pour continuer.',
}

// Statut HTTP → message humain FR (repli quand aucun code n'est reconnu).
const STATUS_MESSAGES: Record<number, string> = {
  0: 'Connexion au serveur impossible. Vérifie ton réseau, puis réessaie.',
  401: 'Ta session a expiré. Reconnecte-toi pour continuer.',
  403: 'Tu n’as pas les droits pour cette action.',
  404: 'Introuvable — cet élément a peut-être été supprimé.',
  409: 'Conflit avec des données existantes.',
  429: 'Trop de tentatives d’un coup. Patiente quelques secondes avant de réessayer.',
}

/** Repli universel — rassurant, et jamais accusateur envers l'utilisateur. */
export const FALLBACK_ERROR =
  'Quelque chose a coincé de notre côté. Réessaie dans un instant — si ça persiste, dis-le-nous.'

interface ErrorLike {
  code?: string
  status?: number
  statusCode?: number
  message?: string
  error?: { code?: string; status?: number; message?: string }
}

/**
 * Transforme n'importe quelle erreur en message FR affichable.
 * @param input  Erreur Better Auth (`{ error: { code, status } }` ou le nœud direct),
 *               TypeError réseau, ou tout objet `{ status, message }`.
 */
export function humanizeError(input: unknown): string {
  if (!input) return FALLBACK_ERROR

  const raw = (typeof input === 'object' ? (input as ErrorLike) : {}) ?? {}
  const node = raw.error ?? raw

  // 1. Code métier connu — la source la plus fiable.
  if (node.code && AUTH_CODE_MESSAGES[node.code]) {
    return AUTH_CODE_MESSAGES[node.code]
  }

  // 2. Erreur réseau (fetch qui échoue : pas de réponse du serveur).
  const message = typeof node.message === 'string' ? node.message : ''
  if (input instanceof TypeError || /failed to fetch|networkerror|network request failed/i.test(message)) {
    return STATUS_MESSAGES[0]
  }

  // 3. Statut HTTP connu.
  const status = node.status ?? raw.statusCode
  if (typeof status === 'number') {
    if (STATUS_MESSAGES[status]) return STATUS_MESSAGES[status]
    if (status >= 500) return FALLBACK_ERROR
  }

  // 4. Repli — on n'expose jamais le message brut.
  return FALLBACK_ERROR
}
