/**
 * Familles de police de l'app, exposées en TypeScript.
 *
 * Le CHARGEMENT des polices se fait via Bunny Fonts (`<link>` dans `index.html`,
 * RGPD-friendly, aucun appel à Google). Ce module n'effectue aucun chargement :
 * il se contente d'exposer les familles définies dans les tokens `--font-*` de
 * `index.css` (@theme), pour éviter d'écrire `'var(--font-…)'` en dur dans les
 * composants.
 *
 * Usage : `style={{ fontFamily: fontDisplay }}`
 */

/** Titres — manuscrit (Caveat). */
export const fontDisplay = 'var(--font-display)'

/** Corps & sous-titres (Manrope). */
export const fontBody = 'var(--font-body)'

/** Montants & valeurs chiffrées (JetBrains Mono). */
export const fontMono = 'var(--font-mono)'

/** Regroupe les familles pour un accès par clé si besoin. */
export const fonts = {
  display: fontDisplay,
  body: fontBody,
  mono: fontMono,
} as const

export type FontFamily = keyof typeof fonts
