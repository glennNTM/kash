import { useRef } from 'react'

/**
 * Fond décoratif : grille discrète + halo radial qui suit le pointeur.
 * Purement visuel (aria-hidden, pointer-events-none) — n'intercepte jamais
 * les clics des éléments posés au-dessus. Écrit directement dans le style
 * du DOM via une ref pour éviter un re-render à chaque déplacement de souris.
 * L'animation de pulsation (kash-ripple-pulse, index.css) est neutralisée
 * sous prefers-reduced-motion par la règle globale.
 */
export default function BackgroundRippleEffect() {
  const haloRef = useRef<HTMLDivElement>(null)

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const bounds = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - bounds.left) / bounds.width) * 100
    const y = ((e.clientY - bounds.top) / bounds.height) * 100
    if (haloRef.current) {
      haloRef.current.style.setProperty('--x', `${x}%`)
      haloRef.current.style.setProperty('--y', `${y}%`)
    }
  }

  return (
    <div
      aria-hidden
      onPointerMove={handlePointerMove}
      className="absolute inset-0 overflow-hidden pointer-events-none"
    >
      {/* Grille discrète */}
      <div className="absolute inset-0 kash-ripple-grid" />
      {/* Halo radial qui suit le pointeur */}
      <div ref={haloRef} className="absolute inset-0 kash-ripple-halo" />
    </div>
  )
}
