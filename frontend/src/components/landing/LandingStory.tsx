import { ArrowRight } from '../../lib/icons'
import { CHARIOW_EBOOK_URL } from '../../lib/constants'
import MicroTestimonial from './MicroTestimonial'

export default function LandingStory() {
  return (
    <section className="bg-(--bg-2) border-t border-(--border-subtle) py-20 md:py-28">
      <div className="max-w-5xl mx-auto px-6 md:px-10 lg:px-16">
        <div className="grid md:grid-cols-[260px_1fr] gap-10 lg:gap-16 items-start">
          {/* PLACEHOLDER : remplacer par une vraie photo (portrait, souriant). */}
          <div className="flex justify-center md:justify-start">
            <div
              className="w-48 h-48 md:w-full md:h-72 bg-(--bg-3) border border-(--border-medium) flex items-center justify-center text-center px-4"
              style={{ borderRadius: 'var(--radius-md)' }}
            >
              <span className="text-(--t-3)" style={{ fontSize: 'var(--text-body-s)' }}>
                [ Ta photo ici ]
              </span>
            </div>
          </div>

          {/* Texte à la première personne */}
          <div className="flex flex-col gap-5">
            <span
              className="uppercase text-(--t-3)"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-eyebrow)',
                fontWeight: 700,
                letterSpacing: '0.14em',
              }}
            >
              Pourquoi Kash existe
            </span>

            <h2 style={{ fontSize: 'clamp(30px, 4.4vw, 48px)' }}>
              Je suis un salarié comme toi
            </h2>

            <div
              className="flex flex-col gap-4 text-(--t-2)"
              style={{ fontSize: 'var(--text-body-l)', lineHeight: '1.62' }}
            >
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

            {/* Premier CTA ebook — volontairement implicite : il attise la
                curiosité, la section dédiée plus bas est explicite. */}
            <a
              href={CHARIOW_EBOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 self-start font-bold text-(--accent) hover:text-(--accent-hover) border-b border-(--accent) pb-0.5 mt-1"
              style={{ fontSize: 'var(--text-body)' }}
            >
              J'ai écrit tout ce que j'ai appris en chemin
              <ArrowRight size={16} strokeWidth={2.5} />
            </a>
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
