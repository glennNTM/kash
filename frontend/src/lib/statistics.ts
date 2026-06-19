import type { Month, DashboardStats } from '../types/budget'

/**
 * Builders purs pour les graphes des statistiques. Aucune dépendance au DOM
 * (les couleurs sont injectées côté composant) → testables unitairement.
 * Toutes les vues se basent sur les dépenses PAYÉES (amountReal), cohérent
 * avec computeStats.
 */

// "2026-06-12T..." → "12/06" (slice ISO, indépendant du fuseau et de la locale).
function formatDay(iso: string): string {
  const [, m, d] = iso.slice(0, 10).split('-')
  return `${d}/${m}`
}

// ── Line : dépenses payées cumulées au fil du mois ────────────────────────────
export interface CumulativeSeries {
  labels: string[]
  cumulative: number[]
  income: number
}

export function buildCumulativeSpending(month: Month): CumulativeSeries {
  const paid = month.sections
    .flatMap((s) => s.expenses)
    .filter((e) => e.status === 'paid' && e.paidAt)
    .map((e) => ({ date: e.paidAt as string, amount: e.amountReal ?? 0 }))
    .sort((a, b) => a.date.localeCompare(b.date))

  const labels: string[] = []
  const cumulative: number[] = []
  let running = 0
  for (const p of paid) {
    running += p.amount
    labels.push(formatDay(p.date))
    cumulative.push(running)
  }

  return { labels, cumulative, income: month.totalIncome }
}

// ── Pie : répartition des dépenses payées par catégorie ───────────────────────
export interface CategoryBreakdown {
  labels: string[]
  values: number[]
}

export function buildCategoryBreakdown(month: Month): CategoryBreakdown {
  const totals = new Map<string, number>()
  for (const e of month.sections.flatMap((s) => s.expenses)) {
    if (e.status !== 'paid') continue
    const key = e.category || 'Autre'
    totals.set(key, (totals.get(key) ?? 0) + (e.amountReal ?? 0))
  }
  const entries = [...totals.entries()].sort((a, b) => b[1] - a[1])
  return {
    labels: entries.map(([label]) => label),
    values: entries.map(([, value]) => value),
  }
}

// ── Radar : alloué vs dépensé par section ─────────────────────────────────────
export interface SectionRadar {
  labels: string[]
  allocated: number[]
  spent: number[]
}

export function buildSectionRadar(
  month: Month,
  stats: DashboardStats
): SectionRadar {
  return {
    labels: month.sections.map((s) => s.name),
    allocated: stats.sections.map((s) => s.allocated),
    spent: stats.sections.map((s) => s.spent),
  }
}

// ── Stacked bar : dépensé + restant (= alloué) par section ─────────────────────
export interface SectionStacked {
  labels: string[]
  spent: number[]
  remaining: number[]
}

export function buildSectionStacked(
  month: Month,
  stats: DashboardStats
): SectionStacked {
  return {
    labels: month.sections.map((s) => s.name),
    spent: stats.sections.map((s) => s.spent),
    // Restant tronqué à 0 : un dépassement n'a pas de « restant » positif à empiler.
    remaining: stats.sections.map((s) => Math.max(s.remaining, 0)),
  }
}
