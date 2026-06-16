/**
 * Point d'entrée unique des icônes (Lucide React).
 *
 * Toutes les icônes utilisées dans l'app sont ré-exportées ici afin de centraliser
 * leur chargement : un seul endroit à auditer, un seul import à modifier si on change
 * de jeu d'icônes. Le tree-shaking est préservé (ré-exports nommés).
 *
 * Usage : `import { ArrowRight } from '../lib/icons'`
 */

export {
  // Navigation & layout
  LayoutDashboard,
  BarChart3,
  History,
  Target,
  PanelLeftClose,
  PanelLeftOpen,
  Menu,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  ArrowRight,

  // Actions
  Plus,
  Pencil,
  Trash2,
  Check,
  Star,
  SlidersHorizontal,
  X,

  // Compte & système
  User,
  LogOut,
  Mail,
  Bell,
  Shield,
  ShieldCheck,
  Eye,
  EyeOff,
  Loader2,
  RotateCw,
  CloudOff,
  TriangleAlert,

  // Sections budgétaires (50/30/20)
  Wallet,
  PiggyBank,
  Sparkles,

  // Landing / marketing
  Play,
  BookOpen,
  Download,
} from 'lucide-react'

// Type partagé pour typer une prop « icône » dans les composants.
export type { LucideIcon } from 'lucide-react'
