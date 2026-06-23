import { TESTIMONIALS } from '../../lib/constants'

// Initiales décoratives (pas d'avatars réels tant que pas de vrais témoignages).
function initials(name: string): string {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? '')
    .join('')
}

export default function LandingTestimonials() {
  return (
    <section id="avis" className="scroll-mt-20 py-20 md:py-28 bg-(--bg-2)">
      <div className="max-w-6xl mx-auto px-6 md:px-10 lg:px-16">
        <div className="text-center mb-12">
          <span
            className="inline-block font-semibold uppercase tracking-widest text-(--accent) bg-(--accent-soft) px-3 py-1 rounded-full mb-4"
            style={{ fontSize: 'var(--text-eyebrow)' }}
          >
            Ils reprennent le contrôle
          </span>
          <h2
            className="font-display font-bold text-(--t-1)"
            style={{ fontSize: 'var(--text-display-m)' }}
          >
            Le mur des premiers utilisateurs
          </h2>
          {/* Note honnête tant que les retours ne sont pas réels. */}
          <p className="text-(--t-3) mt-3" style={{ fontSize: 'var(--text-body-s)' }}>
            Structure prête — à remplir avec de vrais retours utilisateurs.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t, i) => (
            <figure
              key={i}
              className="rounded-2xl border border-(--border-subtle) bg-(--bg-1) p-6 flex flex-col gap-4"
              style={{ boxShadow: 'var(--shadow-sm)' }}
            >
              <blockquote
                className="text-(--t-1) flex-1"
                style={{ fontSize: 'var(--text-body)', lineHeight: '1.6' }}
              >
                « {t.quote} »
              </blockquote>
              <figcaption className="flex items-center gap-3">
                <span
                  className="size-9 rounded-full flex items-center justify-center text-white font-semibold shrink-0"
                  style={{ background: 'var(--gradient-stat)', fontSize: 'var(--text-body-s)' }}
                  aria-hidden
                >
                  {initials(t.name)}
                </span>
                <span className="min-w-0">
                  <span className="block font-semibold text-(--t-1) truncate" style={{ fontSize: 'var(--text-body-s)' }}>
                    {t.name}
                  </span>
                  <span className="block text-(--t-3) truncate" style={{ fontSize: 'var(--text-caption)' }}>
                    {t.context}
                  </span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
