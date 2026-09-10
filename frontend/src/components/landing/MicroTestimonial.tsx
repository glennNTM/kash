interface MicroTestimonialProps {
  quote: string
  author: string
}

/**
 * Micro-témoignage inséré entre les sections (sandwich de preuve sociale).
 *
 * ⚠️ PLACEHOLDER : `author` vaut « Témoignage à recueillir » partout. Ces blocs
 * doivent recevoir de vrais retours utilisateurs — ou disparaître — avant la
 * mise en ligne. Afficher un faux témoignage sur un site de finance
 * personnelle coûte plus cher que de ne rien afficher du tout.
 */
export default function MicroTestimonial({ quote, author }: MicroTestimonialProps) {
  return (
    <figure className="max-w-2xl mt-16 pt-8 border-t border-(--border-medium)">
      <blockquote
        className="text-(--t-1)"
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          fontSize: 'clamp(18px, 2.2vw, 23px)',
          lineHeight: 1.35,
          letterSpacing: '-0.02em',
        }}
      >
        « {quote} »
      </blockquote>
      <figcaption
        className="text-(--t-3) mt-4 uppercase"
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '10px',
          fontWeight: 700,
          letterSpacing: '0.14em',
        }}
      >
        {author}
      </figcaption>
    </figure>
  )
}
