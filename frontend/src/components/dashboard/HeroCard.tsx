import BalanceCard from './BalanceCard'
import PaymentTrendCard from './PaymentTrendCard'
import StatsPreviewCard from './StatsPreviewCard'
import type { Month, DashboardStats } from '../../types/budget'

interface HeroCardProps {
  month: Month
  stats: DashboardStats
  /** Ouvre la modale d'ajustement des pourcentages (depuis la carte Répartition). */
  onAdjust: () => void
}

/**
 * Bloc d'en-tête du dashboard : trois cartes sur une ligne —
 * tendance de paiement · solde (revenus) · répartition.
 */
export default function HeroCard({ month, stats, onAdjust }: HeroCardProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch">
      <PaymentTrendCard />
      <BalanceCard stats={stats} />
      <StatsPreviewCard
        totalIncome={stats.totalIncome}
        sections={month.sections.map((s) => ({ name: s.name, percentage: s.percentage }))}
        onAdjust={onAdjust}
      />
    </div>
  )
}
