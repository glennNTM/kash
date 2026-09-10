/**
 * Point d'entrée unique des icônes (Lucide React).
 *
 * Toutes les icônes utilisées sur le site sont ré-exportées ici afin de
 * centraliser leur chargement : un seul endroit à auditer, un seul import à
 * modifier si on change de jeu d'icônes. Le tree-shaking est préservé
 * (ré-exports nommés).
 *
 * Usage : `import { ArrowRight } from '../lib/icons'`
 */

export {
  // Navigation
  Menu,
  X,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  ArrowDown,

  // Marqueurs de liste
  Check,
  Minus,

  // Sections budgétaires (50/30/20) & aperçu produit
  Wallet,
  SlidersHorizontal,
  BarChart3,
  PieChart,
  TrendingUp,
  Layers,

  // Landing / marketing
  Play,
  BookOpen,

  // Écran d'erreur global
  TriangleAlert,
  RotateCw,
} from 'lucide-react'

// Type partagé pour typer une prop « icône » dans les composants.
export type { LucideIcon } from 'lucide-react'
