import { ArrowRight } from '../../lib/icons'
import { CHARIOW_EBOOK_URL } from '../../lib/constants'
import MicroTestimonial from './MicroTestimonial'

export default function LandingStory() {
  return (
    <section className="py-20 md:py-28 bg-(--bg-1)">
      <div className="max-w-5xl mx-auto px-6 md:px-10 lg:px-16">
        <div className="grid md:grid-cols-[260px_1fr] gap-10 lg:gap-14 items-center">
          {/* Photo fondateur — PLACEHOLDER (remplacer par une vraie photo souriante) */}
          <div className="flex justify-center md:justify-start">
            <div
              className="w-48 h-48 md:w-full md:h-64 rounded-2xl border border-(--border-subtle) flex items-center justify-center text-center px-4"
              style={{ background: 'var(--gradient-goal)' }}
            >
              <span className="text-(--t-3)" style={{ fontSize: 'var(--text-body-s)' }}>
                [ Ta photo ici ]
              </span>
            </div>
          </div>

          {/* Texte à la première personne */}
          <div className="flex flex-col gap-5">
            <h2
              className="font-display font-bold text-(--t-1)"
              style={{ fontSize: 'clamp(34px, 5vw, 56px)', lineHeight: '1.1' }}
            >
              Je suis un salarié comme toi
            </h2>

            <div className="flex flex-col gap-4 text-(--t-2)" style={{ fontSize: 'var(--text-body-l)', lineHeight: '1.7' }}>
              <p>
                À mon premier vrai salaire, j'étais fier — puis paumé. Chaque
                fin de mois, l'argent avait disparu sans que je sache où. Pas
                d'épargne, du stress, et cette impression de ne jamais être en
                contrôle.
              </p>
              <p>
                J'en avais marre de finir mes mois à sec. J'ai cherché une
                méthode simple, je suis tombé sur le 50/30/20, et je l'ai
                appliquée jusqu'à ce que ça devienne un réflexe. Kash, c'est
                l'outil que j'utilise moi-même au quotidien — celui que j'aurais
                voulu avoir dès le début.
              </p>
            </div>

            {/* Mention ebook (ressource complémentaire) */}
            <div className="flex flex-wrap items-center gap-4 pt-1">
              <a
                href={CHARIOW_EBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-(--accent) font-semibold hover:underline"
                style={{ fontSize: 'var(--text-body)' }}
              >
                J'ai aussi écrit le guide complet de la méthode
                <ArrowRight size={16} strokeWidth={2.5} />
              </a>
            </div>
          </div>
        </div>

        <MicroTestimonial
          quote="On sent que Kash est fait par quelqu'un qui est passé par là. Ça parle vrai."
          author="Témoignage à recueillir"
        />
      </div>
    </section>
  )
}
