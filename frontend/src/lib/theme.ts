/**
 * Helpers de thème (purs côté logique, DOM gardé par `typeof window`).
 * Les tokens CSS réagissent à l'attribut `data-theme` sur <html> :
 *   light / dark explicites, ou `system` qui suit la préférence de l'OS.
 */

export type Theme = 'light' | 'dark' | 'system'

const PREFERS_DARK = '(prefers-color-scheme: dark)'

// Thème réellement appliqué : résout `system` selon la préférence de l'OS.
export function resolveTheme(theme: Theme): 'light' | 'dark' {
  if (theme !== 'system') return theme
  if (typeof window === 'undefined') return 'light'
  return window.matchMedia(PREFERS_DARK).matches ? 'dark' : 'light'
}

// Pose `data-theme` sur <html>.
export function applyTheme(theme: Theme): void {
  if (typeof document === 'undefined') return
  document.documentElement.setAttribute('data-theme', resolveTheme(theme))
}

// Cycle : clair → sombre → système → clair.
export function nextTheme(theme: Theme): Theme {
  return theme === 'light' ? 'dark' : theme === 'dark' ? 'system' : 'light'
}
