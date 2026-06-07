import LazyVideo from '../ui/LazyVideo'

// Assets à placer dans `frontend/public/` (webp/mp4 + poster).
// La source webm est servie en premier (meilleure compression), mp4 en repli
// pour les navigateurs plus anciens.
const VIDEO_SOURCES = [
  { src: '/kash-demo.webm', type: 'video/webm' },
  { src: '/kash-demo.mp4', type: 'video/mp4' },
]
const VIDEO_POSTER = '/kash-poster.jpg'

export default function VideoSection() {
  return (
    <section id="video" className="py-20 md:py-28 bg-(--bg-1)">
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

        {/* Vidéo 16:9, chargée paresseusement */}
        <div className="max-w-3xl mx-auto">
          <div className="rounded-2xl overflow-hidden" style={{ boxShadow: 'var(--shadow-lg)' }}>
            <LazyVideo
              sources={VIDEO_SOURCES}
              poster={VIDEO_POSTER}
              label="Démonstration de l'application Kash"
              className="rounded-2xl border border-(--border-medium)"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
