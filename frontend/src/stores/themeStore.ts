import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { applyTheme, nextTheme, type Theme } from '../lib/theme'

interface ThemeState {
  theme: Theme
  setTheme: (theme: Theme) => void
  /** Cycle clair → sombre → système. */
  toggleTheme: () => void
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: 'system',
      setTheme: (theme) => set({ theme }),
      toggleTheme: () => set((s) => ({ theme: nextTheme(s.theme) })),
    }),
    { name: 'kash-theme' }
  )
)

let initialized = false

/**
 * Branche l'application du thème, une seule fois au démarrage (cf. main.tsx) :
 *  - applique le thème persisté immédiatement ;
 *  - réapplique à chaque changement d'état (effet centralisé, hors des actions) ;
 *  - suit la préférence OS en direct quand le thème vaut `system`.
 */
export function initTheme(): void {
  if (initialized || typeof window === 'undefined') return
  initialized = true

  applyTheme(useThemeStore.getState().theme)
  useThemeStore.subscribe((state) => applyTheme(state.theme))

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if (useThemeStore.getState().theme === 'system') applyTheme('system')
  })
}
