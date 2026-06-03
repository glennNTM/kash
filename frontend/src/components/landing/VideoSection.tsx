import { Play } from 'lucide-react'

export default function VideoSection() {
  return (
    <section id="video" className="py-20 md:py-28 bg-(--bg-2)">
      <div className="max-w-6xl mx-auto px-6 md:px-10 lg:px-16">
        <div className="text-center mb-12">
          <span
            className="inline-block text-xs font-semibold uppercase tracking-widest text-(--accent) bg-(--accent-soft) px-3 py-1 rounded-full mb-4"
            style={{ fontSize: 'var(--text-eyebrow)' }}
          >
            En action
          </span>
          <h2
            className="font-display font-bold text-(--t-1) mb-4"
            style={{ fontSize: 'var(--text-display-m)', letterSpacing: 'normal' }}
          >
            Kash en 2 minutes
          </h2>
          <p
            className="text-(--t-2) max-w-lg mx-auto"
            style={{ fontSize: 'var(--text-body-l)' }}
          >
            Découvrez comment configurer votre budget en quelques clics et
            garder le contrôle tout au long du mois.
          </p>
        </div>

        {/* Placeholder vidéo 16:9 */}
        <div className="max-w-3xl mx-auto">
          <div
            className="relative w-full rounded-2xl overflow-hidden bg-(--bg-3) border border-(--border-medium) group cursor-pointer"
            style={{ aspectRatio: '16/9', boxShadow: 'var(--shadow-lg)' }}
          >
            {/* Fond placeholder avec dégradé */}
            <div
              className="absolute inset-0"
              style={{ background: 'var(--gradient-goal)' }}
            />

            {/* Texte placeholder */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
              <button
                aria-label="Lire la vidéo"
                className="w-16 h-16 rounded-full bg-(--accent) text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform"
                style={{ transitionDuration: 'var(--duration-fast)', boxShadow: 'var(--shadow-glow)' }}
                disabled
              >
                <Play size={26} fill="white" strokeWidth={0} className="ml-1" />
              </button>
              <p className="text-sm text-(--t-2) font-medium">
                Vidéo à venir
              </p>
            </div>

            {/* Durée placeholder */}
            <div className="absolute bottom-3 right-3 bg-black/50 text-white text-xs font-mono px-2 py-0.5 rounded">
              2:00
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
