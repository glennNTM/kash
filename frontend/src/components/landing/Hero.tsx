import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { CHARIOW_EBOOK_URL } from '../../lib/constants'

export default function Hero() {
  return (
    <section className="pt-16 pb-20 md:pt-24 md:pb-28 bg-(--bg-1)">
      <div className="max-w-6xl mx-auto px-6 md:px-10 lg:px-16 grid md:grid-cols-2 gap-16 lg:gap-24 items-center">

        {/* Bloc texte — gauche */}
        <div className="flex flex-col gap-8">
          <span
            className="self-start font-semibold uppercase tracking-widest text-(--accent) bg-(--accent-soft) px-3 py-1.5 rounded-full"
            style={{ fontSize: 'var(--text-eyebrow)' }}
          >
            Méthode 50 / 30 / 20
          </span>

          <h1
            className="font-display font-bold text-(--t-1)"
            style={{
              fontSize: 'clamp(40px, 5.5vw, 64px)',
              lineHeight: '1.1',
              letterSpacing: 'normal',
            }}
          >
            Prenez le contrôle de<br />
            <span
              className="text-(--accent) box-decoration-clone px-1 whitespace-nowrap"
              style={{
                background:
                  'linear-gradient(transparent 62%, rgba(var(--accent-rgb), 0.18) 62%)',
              }}
            >
              votre argent
            </span>
          </h1>

          <p
            className="text-(--t-2)"
            style={{ fontSize: 'var(--text-heading-s)', lineHeight: '1.7', maxWidth: '480px' }}
          >
            Kash vous aide à répartir vos revenus, suivre vos dépenses et
            atteindre vos objectifs — avec une méthode simple et aprouvée.
          </p>

          <div className="flex gap-3 pt-1">
            <Link
              to="/login"
              className="inline-flex items-center gap-2 whitespace-nowrap bg-(--accent) text-white font-semibold px-6 py-3 rounded-full hover:bg-(--accent-hover) transition-colors active:scale-97"
              style={{ transitionDuration: 'var(--duration-fast)', fontSize: 'var(--text-body)' }}
            >
              Commencer gratuitement
              <ArrowRight size={16} strokeWidth={2.5} />
            </Link>
            <a
              href={CHARIOW_EBOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 whitespace-nowrap bg-(--bg-2) text-(--t-1) font-semibold px-6 py-3 rounded-full hover:bg-(--bg-3) transition-colors border border-(--border-medium)"
              style={{ transitionDuration: 'var(--duration-fast)', fontSize: 'var(--text-body)' }}
            >
              Lire l&apos;ebook gratuit
            </a>
          </div>

          <p className="text-(--t-3)" style={{ fontSize: 'var(--text-body-s)' }}>
            Gratuit · Aucune carte requise
          </p>
        </div>

        {/* Mockup dashboard — droite */}
        <div className="hidden md:block">
          <div
            className="rounded-2xl overflow-hidden border border-(--border-medium) bg-(--bg-2)"
            style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.10), 0 4px 16px rgba(0,0,0,0.06)' }}
          >
            {/* Barre navigateur */}
            <div className="flex items-center gap-1.5 px-4 py-3 bg-(--bg-3) border-b border-(--border-subtle)">
              <span className="w-3 h-3 rounded-full" style={{ background: '#FF5F57' }} />
              <span className="w-3 h-3 rounded-full" style={{ background: '#FFBD2E' }} />
              <span className="w-3 h-3 rounded-full" style={{ background: '#28CA42' }} />
              <div className="mx-auto w-40 h-5 rounded-md bg-(--bg-4)" />
            </div>

            {/* Contenu skeleton dashboard */}
            <div className="p-6 flex flex-col gap-4">
              {/* Carte héro verte */}
              <div className="rounded-xl p-5" style={{ background: 'var(--gradient-stat)' }}>
                <div className="h-3 w-20 rounded-full bg-white/30 mb-3" />
                <div className="h-7 w-32 rounded-full bg-white/60 mb-1" />
                <div className="flex gap-6 mt-3">
                  <div>
                    <div className="h-2 w-12 rounded bg-white/25 mb-1.5" />
                    <div className="h-4 w-16 rounded bg-white/50" />
                  </div>
                  <div>
                    <div className="h-2 w-12 rounded bg-white/25 mb-1.5" />
                    <div className="h-4 w-16 rounded bg-white/50" />
                  </div>
                </div>
              </div>

              {/* 3 section tiles */}
              <div className="grid grid-cols-3 gap-3">
                {[85, 40, 62].map((pct, i) => (
                  <div key={i} className="rounded-xl p-3 bg-(--bg-1) border border-(--border-subtle)">
                    <div className="h-2 w-10 rounded-full bg-(--bg-4) mb-2" />
                    <div className="h-3 w-12 rounded-full bg-(--bg-3) mb-2" />
                    <div className="h-1.5 w-full rounded-full bg-(--bg-3) overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${pct}%`,
                          background: pct > 80 ? 'var(--warning)' : 'var(--accent)',
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Liste dépenses */}
              <div className="flex flex-col gap-2">
                {[70, 55, 85].map((w, i) => (
                  <div key={i} className="flex items-center justify-between py-1.5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-(--accent-soft)" />
                      <div className="h-2.5 rounded-full bg-(--bg-3)" style={{ width: `${w}px` }} />
                    </div>
                    <div className="h-2.5 w-12 rounded-full bg-(--bg-3)" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
