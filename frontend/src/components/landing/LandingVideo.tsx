import LazyVideo from '../ui/LazyVideo'
import MicroTestimonial from './MicroTestimonial'

// PLACEHOLDER : assets à produire depuis l'app mobile, puis à déposer dans
// `frontend/public/`. Tant qu'ils sont absents, le composant affiche son
// écran d'attente (poster + bouton lecture) sans casser la mise en page.
const VIDEO_SOURCES = [
  { src: '/kash-demo.webm', type: 'video/webm' },
  { src: '/kash-demo.mp4', type: 'video/mp4' },
]
const VIDEO_POSTER = '/kash-poster.jpg'

export default function LandingVideo() {
  return (
    <section
      id="demo"
      className="scroll-mt-20 bg-(--bg-1) border-t border-(--border-subtle) py-20 md:py-28"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-10 lg:px-16">
        <div className="flex flex-col gap-4 mb-12 max-w-2xl">
          <h2 style={{ fontSize: 'clamp(30px, 4.4vw, 48px)' }}>
            Vois Kash en 2 minutes
          </h2>
          <p className="text-(--t-2)" style={{ fontSize: 'var(--text-body-l)' }}>
            Ce que tu vois dès l’installation : ton budget posé, tes enveloppes,
            et ce qu’il te reste en un coup d’œil.
          </p>
        </div>

        <div className="max-w-3xl">
          <LazyVideo
            sources={VIDEO_SOURCES}
            poster={VIDEO_POSTER}
            label="Démonstration de l'application Kash"
            className="border border-(--border-medium)"
          />
        </div>

        <MicroTestimonial
          quote="La vidéo m'a convaincu : j'ai installé l'app juste après."
          author="Témoignage à recueillir"
        />
      </div>
    </section>
  )
}
