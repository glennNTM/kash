import { humanizeError } from './errors'

// URL de l'API backend (jamais la base directement — cf. archi sécurité).
const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8000'

/**
 * Erreur API normalisée. Porte le `status` HTTP (0 = échec réseau) pour que
 * les couches consommatrices puissent décider (404 attendu vs vraie erreur).
 * Le `message` est toujours sûr à afficher : message FR authored du backend,
 * sinon repli humanisé (jamais d'erreur brute).
 */
export class ApiError extends Error {
  readonly status: number

  constructor(message: string, status: number) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  body?: unknown
  signal?: AbortSignal
}

/**
 * Appel HTTP central vers l'API Kash.
 * - envoie toujours le cookie de session (`credentials: 'include'`)
 * - déballe `{ data: T }` en cas de succès ; renvoie `undefined` sur 204
 * - lève une `ApiError` (message sûr + status) sur échec réseau ou réponse non-2xx
 */
export async function apiRequest<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const hasBody = options.body !== undefined

  let res: Response
  try {
    res = await fetch(`${API_URL}${path}`, {
      method: options.method ?? 'GET',
      credentials: 'include',
      headers: hasBody ? { 'Content-Type': 'application/json' } : undefined,
      body: hasBody ? JSON.stringify(options.body) : undefined,
      signal: options.signal,
    })
  } catch {
    // Serveur injoignable, offline, CORS bloqué… : pas de réponse HTTP.
    throw new ApiError(humanizeError(new TypeError('Failed to fetch')), 0)
  }

  // 204 No Content (ex. DELETE) : pas de corps à parser.
  if (res.status === 204) return undefined as T

  let payload: unknown = null
  try {
    payload = await res.json()
  } catch {
    // Corps vide ou non-JSON : payload reste null.
  }

  if (!res.ok) {
    // Le backend renvoie toujours un message FR authored et sûr ; sinon on humanise par statut.
    const backendMessage = (payload as { error?: string } | null)?.error
    throw new ApiError(backendMessage ?? humanizeError({ status: res.status }), res.status)
  }

  return (payload as { data: T }).data
}
