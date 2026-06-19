import { BadRequestError } from './errors.js'

// Convertit un paramètre d'URL en ID entier positif, ou lève une 400.
export function parseId(
  raw: string | string[] | undefined,
  label: string
): number {
  const id = typeof raw === 'string' ? Number(raw) : NaN
  if (!Number.isInteger(id) || id <= 0) {
    throw new BadRequestError(`${label} invalide.`)
  }
  return id
}
