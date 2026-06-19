import { describe, it, expect } from 'vitest'
import { formatAmount, formatPercent } from '../../src/lib/format'

// Intl 'fr-FR' insère des espaces insécables (U+202F / U+00A0) comme séparateur
// de milliers ; `\s` les couvre. On normalise tout en espace simple pour des
// assertions stables, indépendantes du caractère exact choisi par le moteur Intl.
function normalize(s: string): string {
  return s.replace(/\s/g, ' ')
}

describe('formatAmount', () => {
  it('formate un montant avec séparateur de milliers et suffixe FCFA', () => {
    expect(normalize(formatAmount(269500))).toBe('269 500 FCFA')
  })

  it('formate zéro', () => {
    expect(normalize(formatAmount(0))).toBe('0 FCFA')
  })

  it('formate un montant négatif (dépassement)', () => {
    expect(normalize(formatAmount(-12000))).toBe('-12 000 FCFA')
  })

  it('ne montre aucune décimale (FCFA sans sous-unité)', () => {
    expect(normalize(formatAmount(1500.75))).toBe('1 501 FCFA')
  })
})

describe('formatPercent', () => {
  it('convertit une fraction en pourcentage', () => {
    expect(normalize(formatPercent(0.5))).toBe('50 %')
  })

  it('arrondit sans décimale', () => {
    expect(normalize(formatPercent(0.333))).toBe('33 %')
  })
})
