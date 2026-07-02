interface MicroTestimonialProps {
  quote: string
  author: string
}

/**
 * Micro-témoignage inséré entre les sections (sandwich de preuve sociale).
 * PLACEHOLDER : remplace `quote`/`author` par de vrais retours utilisateurs.
 */
export default function MicroTestimonial({ quote, author }: MicroTestimonialProps) {
  return (
    <div className="max-w-2xl mx-auto px-6 py-10 text-center">
      <p
        className="text-(--t-1) italic"
        style={{ fontSize: 'var(--text-heading-s)', lineHeight: '1.6' }}
      >
        « {quote} »
      </p>
      <p className="text-(--t-3) mt-3" style={{ fontSize: 'var(--text-body-s)' }}>
        — {author}
      </p>
    </div>
  )
}
