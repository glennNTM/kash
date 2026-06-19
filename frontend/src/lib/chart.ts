import {
  Chart as ChartJS,
  // Contrôleurs (un par type de graphe utilisé)
  LineController,
  BarController,
  DoughnutController,
  PieController,
  RadarController,
  // Éléments
  LineElement,
  PointElement,
  BarElement,
  ArcElement,
  // Échelles
  CategoryScale,
  LinearScale,
  RadialLinearScale,
  // Plugins
  Tooltip,
  Legend,
  Filler,
} from 'chart.js'

// Enregistrement sélectif (pas `registerables` complet) pour préserver le tree-shaking.
// L'import de ce module suffit à enregistrer Chart.js (effet de bord unique).
ChartJS.register(
  LineController,
  BarController,
  DoughnutController,
  PieController,
  RadarController,
  LineElement,
  PointElement,
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  RadialLinearScale,
  Tooltip,
  Legend,
  Filler
)

// Lit un token CSS sur <html> (respecte le thème light/dark), avec repli.
function cssVar(name: string, fallback: string): string {
  if (typeof window === 'undefined') return fallback
  const value = getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim()
  return value || fallback
}

// Palette catégorielle multi-teintes (distincte, lisible en thème clair/sombre).
// L'accent vert ouvre la série (cohérence de marque), puis des teintes variées.
const CHART_PALETTE = [
  '#1A9E6E', // vert accent
  '#3B82F6', // bleu
  '#F59E0B', // ambre
  '#8B5CF6', // violet
  '#EC4899', // rose
  '#06B6D4', // cyan
  '#F97316', // orange
  '#84CC16', // lime
  '#6366F1', // indigo
  '#EAB308', // jaune
] as const

export interface ChartPalette {
  accent: string
  accentSoft: string
  warning: string
  neutral: string
  text: string
  grid: string
  /** Une couleur distincte par section/série (palette multi-teintes). */
  sections: string[]
  /** n couleurs distinctes pour n catégories (cycle sur la palette). */
  categorical: (n: number) => string[]
}

/**
 * Résout la palette des graphes à partir des tokens CSS. Le canvas ne sait pas
 * interpréter `var(--token)` : on convertit donc en valeurs concrètes au runtime.
 * Respecte le thème actif ; non réactif à un changement de thème à chaud.
 */
export function resolveChartColors(): ChartPalette {
  const accent = cssVar('--accent', '#1A9E6E')
  const accentSoft = cssVar('--accent-soft', 'rgba(26, 158, 110, 0.10)')
  const warning = cssVar('--warning', '#D97706')
  const neutral = cssVar('--neutral', '#6B6B68')
  const text = cssVar('--t-2', '#4b4b48')
  const grid = cssVar('--border-subtle', 'rgba(0, 0, 0, 0.06)')

  return {
    accent,
    accentSoft,
    warning,
    neutral,
    text,
    grid,
    sections: [...CHART_PALETTE],
    categorical: (n: number) =>
      Array.from({ length: n }, (_, i) => CHART_PALETTE[i % CHART_PALETTE.length]),
  }
}
