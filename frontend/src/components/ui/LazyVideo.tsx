import { useInView } from 'react-intersection-observer'
import { Play } from '../../lib/icons'

export type VideoSource = {
  /** Chemin du fichier (ex. `/kash-demo.webm`). */
  src: string
  /** Type MIME (ex. `video/webm`, `video/mp4`). */
  type: string
}

type LazyVideoProps = {
  /** Sources par ordre de priorité : le navigateur prend la première compatible (webm avant mp4). */
  sources: VideoSource[]
  /** Image d'aperçu affichée avant lecture (et pendant le chargement). */
  poster?: string
  /** Texte d'accessibilité décrivant la vidéo. */
  label: string
  className?: string
}

/**
 * Vidéo chargée paresseusement : le `<video>` (et ses sources) n'est monté
 * que lorsque le conteneur entre dans le viewport. `preload="none"` garantit
 * qu'aucun octet vidéo n'est téléchargé au premier paint.
 *
 * Avant l'entrée en vue, un placeholder léger (poster + bouton play) tient la
 * place et préserve le ratio 16/9 — pas de layout shift.
 */
export default function LazyVideo({ sources, poster, label, className }: LazyVideoProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: '200px', // précharge un peu avant que la vidéo soit visible
  })

  return (
    <div
      ref={ref}
      className={`relative w-full overflow-hidden bg-(--bg-3) ${className ?? ''}`}
      style={{ aspectRatio: '16/9' }}
    >
      {inView ? (
        <video
          className="absolute inset-0 h-full w-full object-cover"
          controls
          preload="none"
          poster={poster}
          playsInline
          aria-label={label}
        >
          {sources.map((s) => (
            <source key={s.src} src={s.src} type={s.type} />
          ))}
          Votre navigateur ne supporte pas la lecture vidéo.
        </video>
      ) : (
        // Placeholder tant que la vidéo n'est pas en vue
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={
            poster
              ? { backgroundImage: `url(${poster})`, backgroundSize: 'cover', backgroundPosition: 'center' }
              : { background: 'var(--gradient-goal)' }
          }
        >
          <span
            className="flex h-16 w-16 items-center justify-center rounded-full bg-(--accent) text-white"
            style={{ boxShadow: 'var(--shadow-glow)' }}
          >
            <Play size={26} fill="white" strokeWidth={0} className="ml-1" />
          </span>
        </div>
      )}
    </div>
  )
}
