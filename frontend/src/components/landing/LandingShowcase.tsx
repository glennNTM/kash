import { useEffect, useState, type ReactNode } from 'react'
import { useInView } from 'react-intersection-observer'
import { Wallet, PieChart, TrendingUp, Layers, ChevronLeft, ChevronRight } from '../../lib/icons'

/**
 * Section « aperçu produit » : reconstitue le tableau de bord de Kash en vrai
 * markup (pas une capture figée), centré à la façon d'une capture Notion / odoo.sh.
 *
 * Interaction : au survol (ou au focus clavier) d'une carte, celle-ci passe en
 * pleine lumière — les autres s'estompent — et une légende explicative apparaît
 * sous le cadre. Une visite guidée automatique enchaîne les cartes pour attirer
 * l'œil ; elle se met en pause au survol et se désactive sous prefers-reduced-motion.
 */

type Feature = {
  icon: typeof Wallet
  title: string
  desc: string
}

const FEATURES: Feature[] = [
  {
    icon: Wallet,
    title: "Ce qu'il te reste, en gros",
    desc: 'Le seul chiffre qui compte, au centre : ton salaire moins tes dépenses, recalculé à chaque paiement coché.',
  },
  {
    icon: PieChart,
    title: 'La règle 50/30/20, visible',
    desc: "Ton salaire réparti en trois enveloppes. D'un coup d'œil, tu vois si l'équilibre tient encore.",
  },
  {
    icon: TrendingUp,
    title: 'Tes dépenses se suivent seules',
    desc: 'Coche une dépense, le graphe bouge. Tu repères tout de suite où part vraiment ton argent.',
  },
  {
    icon: Layers,
    title: 'Chaque enveloppe sous contrôle',
    desc: 'Charges, épargne, loisirs : une barre par section te prévient avant que ça déborde.',
  },
]

/* Palette des graphes = celle du vrai dashboard (fidélité produit). */
const DONUT = [
  { label: 'Charges fixes', pct: '50', color: '#1A9E6E' },
  { label: 'Épargne', pct: '30', color: '#3B82F6' },
  { label: 'Loisirs', pct: '20', color: '#D97706' },
]

const TREND = [
  { label: 'Épargne', pct: 100, color: '#1A9E6E' },
  { label: 'Logement', pct: 74, color: '#3B82F6' },
  { label: 'Transport', pct: 40, color: '#D97706' },
  { label: 'Alimentation', pct: 54, color: '#8B5CF6' },
  { label: 'Loisirs', pct: 28, color: '#EC4899' },
]

const SECTIONS = [
  { name: 'Charges fixes', pct: 92, spent: '300 000', total: '325 000' },
  { name: 'Épargne & objectifs', pct: 100, spent: '195 000', total: '195 000' },
]

export default function LandingShowcase() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)

  const { ref: revealRef, inView: revealed } = useInView({ triggerOnce: true, threshold: 0.15 })
  const { ref: stageRef, inView: onStage } = useInView({ threshold: 0.35 })

  // Visite guidée automatique : enchaîne les cartes tant que la section est
  // visible et non survolée. Coupée si l'utilisateur préfère moins de mouvement.
  useEffect(() => {
    if (!onStage || paused) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = window.setInterval(() => {
      setActive((a) => (a + 1) % FEATURES.length)
    }, 2800)
    return () => window.clearInterval(id)
  }, [onStage, paused])

  // Sélection (survol / focus / tap) : illumine la carte et met la visite en pause.
  const select = (i: number) => {
    setActive(i)
    setPaused(true)
  }

  const feature = FEATURES[active]
  const CaptionIcon = feature.icon

  return (
    <section id="apercu" className="scroll-mt-20 pt-2 pb-16 md:pt-4 md:pb-24 bg-(--bg-1) overflow-hidden">
      <div ref={revealRef} className="max-w-4xl mx-auto px-6">
        <div
          ref={stageRef}
          className={`relative transition-all ${
            revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
          style={{ transitionDuration: 'var(--duration-cinematic)', transitionTimingFunction: 'var(--ease-apple)' }}
          onMouseLeave={() => setPaused(false)}
          onBlur={(e) => {
            // Reprend la visite quand le focus quitte tout le bloc.
            if (!e.currentTarget.contains(e.relatedTarget as Node)) setPaused(false)
          }}
        >
          {/* Halo d'accent derrière le cadre (profondeur, façon produit) */}
          <div
            aria-hidden
            className="absolute -inset-8 -z-10 rounded-[48px] blur-3xl"
            style={{ background: 'radial-gradient(55% 55% at 50% 25%, rgba(var(--accent-rgb), 0.16), transparent 70%)' }}
          />

          {/* Cadre navigateur */}
          <div
            className="rounded-2xl border border-(--border-subtle) bg-(--bg-2) overflow-hidden"
            style={{ boxShadow: 'var(--shadow-lg)' }}
          >
            {/* Chrome */}
            <div className="flex items-center gap-2 px-4 h-9 border-b border-(--border-subtle) bg-(--bg-1)">
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: '#EC6A5E' }} />
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: '#F4BF4F' }} />
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: '#61C554' }} />
            </div>

            {/* Contenu du dashboard */}
            <div className="p-3.5 md:p-5 bg-(--bg-1)">
              {/* Barre de titre */}
              <div className="flex items-center justify-between mb-3.5 md:mb-4">
                <span className="font-display font-bold text-(--t-1)" style={{ fontSize: 'clamp(20px, 4vw, 26px)' }}>
                  Tableau de bord
                </span>
                <span className="flex items-center gap-2 text-(--t-2)">
                  <ChevronLeft size={15} />
                  <span style={{ fontSize: 'var(--text-body-s)', fontWeight: 600 }}>Juillet 2026</span>
                  <ChevronRight size={15} />
                </span>
              </div>

              {/* Rangée du haut : Tendance · Restant · Répartition */}
              <div className="grid grid-cols-2 sm:grid-cols-[1fr_1.25fr_1fr] gap-2.5 md:gap-3">
                {/* 0 — Restant ce mois (centre, mis en avant) */}
                <SpotCard
                  index={0}
                  active={active}
                  onSelect={select}
                  title={FEATURES[0].title}
                  className="col-span-2 sm:col-span-1 sm:order-2 flex flex-col"
                >
                  <p className="text-(--t-2)" style={{ fontSize: 'var(--text-caption)' }}>
                    Restant ce mois
                  </p>
                  <p
                    className="text-(--t-1) mt-1"
                    style={{ fontSize: 'clamp(26px, 5vw, 32px)', fontWeight: 700, fontFamily: 'var(--font-mono)', letterSpacing: '-0.02em' }}
                  >
                    105 000 <span style={{ fontSize: '15px', color: 'var(--t-2)' }}>FCFA</span>
                  </p>
                  <div className="mt-auto pt-3 space-y-1.5">
                    <MoneyRow label="Revenus" value="650 000" tone="var(--accent)" />
                    <MoneyRow label="Dépensé" value="545 000" tone="var(--error)" />
                  </div>
                </SpotCard>

                {/* 2 — Tendance de paiement (barres) */}
                <SpotCard index={2} active={active} onSelect={select} title={FEATURES[2].title} className="sm:order-1">
                  <p className="text-(--t-2) mb-2.5" style={{ fontSize: 'var(--text-caption)' }}>
                    Tendance de paiement
                  </p>
                  <ul className="space-y-2">
                    {TREND.map((t) => (
                      <li key={t.label} className="flex items-center gap-2">
                        <span className="text-(--t-2) shrink-0 truncate" style={{ fontSize: '9px', width: 44 }}>
                          {t.label}
                        </span>
                        <span className="h-1.5 flex-1 rounded-full bg-(--bg-3) overflow-hidden">
                          <span
                            className="block h-full rounded-full transition-[width]"
                            style={{
                              width: active === 2 ? `${t.pct}%` : `${Math.max(t.pct - 12, 6)}%`,
                              background: t.color,
                              transitionDuration: 'var(--duration-slow)',
                              transitionTimingFunction: 'var(--ease-apple)',
                            }}
                          />
                        </span>
                      </li>
                    ))}
                  </ul>
                </SpotCard>

                {/* 1 — Répartition (donut) */}
                <SpotCard index={1} active={active} onSelect={select} title={FEATURES[1].title} className="sm:order-3">
                  <p className="text-(--t-2) mb-2" style={{ fontSize: 'var(--text-caption)' }}>
                    Répartition
                  </p>
                  <div className="flex items-center gap-3">
                    <span
                      className="relative shrink-0 rounded-full"
                      style={{
                        width: 52,
                        height: 52,
                        background: `conic-gradient(${DONUT[0].color} 0 50%, ${DONUT[1].color} 50% 80%, ${DONUT[2].color} 80% 100%)`,
                      }}
                    >
                      <span className="absolute rounded-full bg-(--bg-2)" style={{ inset: 8 }} />
                    </span>
                    <ul className="space-y-1 min-w-0">
                      {DONUT.map((d) => (
                        <li key={d.label} className="flex items-center gap-1.5">
                          <span className="h-2 w-2 rounded-full shrink-0" style={{ background: d.color }} />
                          <span className="text-(--t-2)" style={{ fontSize: '10px' }}>
                            {d.pct}%
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </SpotCard>
              </div>

              {/* Rangée du bas : Sections */}
              <SpotCard index={3} active={active} onSelect={select} title={FEATURES[3].title} className="mt-2.5 md:mt-3">
                <p className="text-(--t-2) mb-2.5" style={{ fontSize: 'var(--text-caption)' }}>
                  Sections
                </p>
                <div className="grid grid-cols-2 gap-4 md:gap-6">
                  {SECTIONS.map((s) => (
                    <div key={s.name}>
                      <div className="flex items-baseline justify-between mb-1.5">
                        <span className="text-(--t-1) truncate" style={{ fontSize: '11px', fontWeight: 600 }}>
                          {s.name}
                        </span>
                        <span className="text-(--t-2)" style={{ fontSize: '10px', fontFamily: 'var(--font-mono)' }}>
                          {s.pct}%
                        </span>
                      </div>
                      <span className="block h-2 rounded-full bg-(--bg-3) overflow-hidden">
                        <span
                          className="block h-full rounded-full transition-[width]"
                          style={{
                            width: active === 3 ? `${s.pct}%` : `${Math.max(s.pct - 15, 8)}%`,
                            background: 'var(--accent)',
                            transitionDuration: 'var(--duration-slow)',
                            transitionTimingFunction: 'var(--ease-apple)',
                          }}
                        />
                      </span>
                      <p className="text-(--t-3) mt-1.5" style={{ fontSize: '9px', fontFamily: 'var(--font-mono)' }}>
                        {s.spent} / {s.total}
                      </p>
                    </div>
                  ))}
                </div>
              </SpotCard>
            </div>
          </div>
        </div>

        {/* Légende : le descriptif de la carte survolée apparaît ici */}
        <div className="mt-7 md:mt-9 max-w-md mx-auto text-center min-h-[112px] md:min-h-[96px]">
          <div
            key={active}
            className="flex flex-col items-center gap-2"
            style={{ animation: 'kash-fade-up var(--duration-base) var(--ease-apple)' }}
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-(--accent-soft)">
              <CaptionIcon size={19} strokeWidth={1.9} className="text-(--accent)" />
            </span>
            <h3 className="font-semibold text-(--t-1)" style={{ fontSize: 'var(--text-heading-s)', fontFamily: 'var(--font-body)' }}>
              {feature.title}
            </h3>
            <p className="text-(--t-2)" style={{ fontSize: 'var(--text-body)', lineHeight: '1.6' }}>
              {feature.desc}
            </p>
          </div>
        </div>

        {/* Pastilles de navigation (rappel visuel + tap sur mobile) */}
        <div className="flex justify-center gap-2 mt-4">
          {FEATURES.map((f, i) => (
            <button
              key={f.title}
              type="button"
              aria-label={f.title}
              aria-pressed={active === i}
              onClick={() => select(i)}
              onMouseEnter={() => select(i)}
              className="h-2 rounded-full transition-all"
              style={{
                width: active === i ? 22 : 8,
                background: active === i ? 'var(--accent)' : 'var(--border-strong)',
                transitionDuration: 'var(--duration-base)',
                transitionTimingFunction: 'var(--ease-apple)',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Carte projecteur ─────────────────────────────────────────────
   Bouton (accessible clavier) qui s'illumine quand il est actif et
   s'estompe sinon. Le survol/focus déclenche la sélection. */
function SpotCard({
  index,
  active,
  onSelect,
  title,
  className,
  children,
}: {
  index: number
  active: number
  onSelect: (i: number) => void
  title: string
  className?: string
  children: ReactNode
}) {
  const on = active === index
  return (
    <button
      type="button"
      aria-label={title}
      aria-pressed={on}
      onMouseEnter={() => onSelect(index)}
      onFocus={() => onSelect(index)}
      onClick={() => onSelect(index)}
      className={`relative text-left rounded-xl bg-(--bg-2) p-3.5 border transition-all ${className ?? ''}`}
      style={{
        borderColor: on ? 'var(--accent)' : 'var(--border-subtle)',
        boxShadow: on ? 'var(--shadow-md), var(--shadow-glow)' : 'var(--shadow-sm)',
        opacity: on ? 1 : 0.5,
        transform: on ? 'scale(1.02)' : 'scale(1)',
        transitionDuration: 'var(--duration-base)',
        transitionTimingFunction: 'var(--ease-apple)',
      }}
    >
      {/* Pastille pulsée : le point qui accroche l'œil sur la carte active */}
      {on && (
        <span className="absolute -top-1.5 -right-1.5 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-(--accent) opacity-60" />
          <span className="relative inline-flex h-3 w-3 rounded-full bg-(--accent)" />
        </span>
      )}
      {children}
    </button>
  )
}

function MoneyRow({ label, value, tone }: { label: string; value: string; tone: string }) {
  return (
    <div className="flex items-center justify-between gap-2">
      <span className="text-(--t-3)" style={{ fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        {label}
      </span>
      <span style={{ fontSize: '13px', fontWeight: 700, fontFamily: 'var(--font-mono)', color: tone }}>
        {value}
      </span>
    </div>
  )
}
