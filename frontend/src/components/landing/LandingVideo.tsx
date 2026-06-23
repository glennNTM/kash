import LazyVideo from '../ui/LazyVideo'
import MicroTestimonial from './MicroTestimonial'

// Assets à placer dans `frontend/public/` (webm/mp4 + poster).
const VIDEO_SOURCES = [
  { src: '/kash-demo.webm', type: 'video/webm' },
  { src: '/kash-demo.mp4', type: 'video/mp4' },
]
const VIDEO_POSTER = '/kash-poster.jpg'

export default function LandingVideo() {
  return (
    <section id="demo" className="scroll-mt-20 py-20 md:py-28 bg-(--bg-1)">
      <div className="max-w-6xl mx-auto px-6 md:px-10 lg:px-16">
        <div className="text-center mb-12">
          <h2
            className="font-display font-bold text-(--t-1) mb-4"
            style={{ fontSize: 'clamp(34px, 5vw, 56px)', lineHeight: '1.1' }}
          >
            Vois Kash en 2 minutes
          </h2>
          <p className="text-(--t-2) max-w-lg mx-auto" style={{ fontSize: 'var(--text-body-l)' }}>
            Ce que tu vois après ton inscription : ton budget posé, tes
            enveloppes, et ce qu'il te reste en un coup d'œil.
          </p>
        </div>

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

        <MicroTestimonial
          quote="La vidéo m'a convaincu : j'ai créé mon compte juste après."
          author="Témoignage à recueillir"
        />
      </div>
    </section>
  )
}
