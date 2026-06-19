import Skeleton from '../ui/Skeleton'

/**
 * Squelette du Dashboard qui reproduit la structure réelle (Hero, carte stats,
 * tuiles de sections, table de dépenses). L'œil reconnaît la mise en page →
 * l'attente devient quasi invisible, sans layout shift à l'arrivée des données.
 */
export default function DashboardSkeleton() {
  return (
    <div className="flex flex-col gap-6" role="status" aria-busy="true">
      <span className="sr-only">Chargement du tableau de bord…</span>

      {/* Hero + carte stats */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_260px] gap-4 items-stretch">
        {/* HeroCard : label + chiffre roi + 2 stats */}
        <div className="rounded-xl bg-(--bg-2) border border-(--border-subtle) p-6">
          <Skeleton className="h-3.5 w-28 mb-3" />
          <Skeleton className="h-10 w-48 mb-6" />
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Skeleton className="h-2.5 w-16 mb-2" />
              <Skeleton className="h-5 w-24" />
            </div>
            <div>
              <Skeleton className="h-2.5 w-16 mb-2" />
              <Skeleton className="h-5 w-24" />
            </div>
          </div>
        </div>

        {/* StatsPreviewCard : donut + légende */}
        <div className="rounded-xl bg-(--bg-2) border border-(--border-subtle) p-6 flex flex-col items-center justify-center gap-4">
          <Skeleton circle className="size-28" />
          <div className="w-full flex flex-col gap-2">
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-3/4" />
          </div>
        </div>
      </div>

      {/* Tuiles de sections */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="rounded-xl bg-(--bg-2) border border-(--border-subtle) p-5">
            <div className="flex items-center gap-3 mb-4">
              <Skeleton circle className="size-10" />
              <div className="flex-1">
                <Skeleton className="h-3.5 w-24 mb-2" />
                <Skeleton className="h-2.5 w-16" />
              </div>
            </div>
            <Skeleton className="h-2 w-full rounded-full mb-3" />
            <div className="flex justify-between">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-3 w-14" />
            </div>
          </div>
        ))}
      </div>

      {/* Table des dernières dépenses */}
      <div className="rounded-xl bg-(--bg-2) border border-(--border-subtle) overflow-hidden">
        <div className="px-5 py-4 border-b border-(--border-subtle)">
          <Skeleton className="h-4 w-40" />
        </div>
        <div className="flex flex-col">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="flex items-center justify-between px-5 py-3.5 border-b border-(--border-subtle) last:border-0">
              <Skeleton className="h-3.5 w-32" />
              <Skeleton className="h-3.5 w-20" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
