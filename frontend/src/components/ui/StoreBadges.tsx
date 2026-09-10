import { APP_STORE_URL, PLAY_STORE_URL } from '../../lib/constants'

/**
 * Badges de téléchargement — CTA principal de toute la landing.
 *
 * ⚠️ PLACEHOLDER : « App Store » et « Google Play » sont des marques déposées.
 * Apple et Google imposent leurs propres badges, dans leurs formats et avec
 * des règles de taille et de zone de protection. Ceux-ci tiennent la place et
 * respectent l'anatomie officielle (marque + « Télécharger sur » + nom du
 * store) ; ils doivent être remplacés par les fichiers officiels avant la
 * mise en ligne.
 *
 * Le fond du badge est `--t-1` : dans une section claire il est sombre, et
 * dans un bloc `data-tone="ink"` le remappage des tokens l'inverse tout seul
 * — soit exactement les deux variantes que fournissent les stores.
 */

function AppleMark({ size = 22 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <rect x="10.23" y="10.23" width="43.55" height="43.55" rx="10.31" />
      <line x1="24.03" y1="39.07" x2="22.37" y2="41.97" />
      <line x1="34.86" y1="20.12" x2="26.05" y2="35.53" />
      <line x1="34.19" y1="28.31" x2="42.17" y2="41.97" />
      <line x1="29.39" y1="20.12" x2="32.16" y2="24.84" />
      <line x1="19.54" y1="35.53" x2="34.39" y2="35.53" />
      <line x1="44.71" y1="35.53" x2="38.41" y2="35.53" />
    </svg>
  )
}

function PlayMark({ size = 22 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 456 512"
      aria-hidden="true"
      focusable="false"
    >
      <path fill="#3A9BC8" d="M225.656,256.052L14.016,485.451l-6.442,7.052c-4.005-5.919-6.704-12.972-7.313-20.806C0.087,470.305,0,468.91,0,467.518V44.499c0-9.488,2.873-18.02,7.574-24.987L225.656,256.052z" />
      <path fill="#9BCD83" d="M320.811,152.8l-95.155,103.253L7.574,19.512C19.936,1.405,45.183-6.342,66.6,6.02L320.811,152.8z" />
      <path fill="#EEB84C" d="M455.056,257.27c-0.348,14.453-7.748,28.904-22.113,37.174l-112.132,64.771l-95.155-103.163L320.811,152.8l70.518,40.745l41.614,24.026C448.178,226.366,455.579,241.861,455.056,257.27z" />
      <path fill="#B43F70" d="M7.591,492.492c12.368,18.116,37.599,25.838,58.976,13.496L320.775,359.22l-95.156-103.209L7.591,492.492z" />
    </svg>
  )
}

type BadgeProps = {
  href: string
  /** Petite ligne du haut, ex. « Télécharger sur ». */
  kicker: string
  /** Nom du store, en gros. */
  store: string
  children: React.ReactNode
}

function Badge({ href, kicker, store, children }: BadgeProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${kicker} ${store}`}
      className="inline-flex items-center gap-3 bg-(--t-1) text-(--bg-2) px-4 py-2.5 rounded-(--radius-md) transition-opacity hover:opacity-88"
      style={{ transitionDuration: 'var(--duration-fast)' }}
    >
      {children}
      <span className="flex flex-col leading-none text-left">
        <span style={{ fontSize: '10px', letterSpacing: '0.04em' }} className="opacity-80">
          {kicker}
        </span>
        <span style={{ fontSize: '15px', fontWeight: 700, letterSpacing: '-0.02em', marginTop: '3px' }}>
          {store}
        </span>
      </span>
    </a>
  )
}

export default function StoreBadges({ className = '' }: { className?: string }) {
  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      <Badge href={APP_STORE_URL} kicker="Télécharger sur" store="App Store">
        <AppleMark />
      </Badge>
      <Badge href={PLAY_STORE_URL} kicker="Disponible sur" store="Google Play">
        <PlayMark />
      </Badge>
    </div>
  )
}
