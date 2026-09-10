import type { ReactNode } from 'react'

/**
 * Cadre de téléphone — support de toutes les démonstrations produit.
 *
 * PLACEHOLDER : le contenu est aujourd'hui reconstruit en markup (pas une
 * capture figée), ce qui garde le texte sélectionnable et net sur tous les
 * écrans. Quand les captures de l'app mobile seront disponibles, il suffira de
 * passer une `<img>` en `children` — le cadre, lui, ne bouge pas.
 *
 * Le rayon marqué est assumé : c'est le seul objet de la page qui en porte un,
 * parce qu'un téléphone est physiquement arrondi. Tout le reste tranche net.
 */

type PhoneMockupProps = {
  children: ReactNode
  /** Description lue par les lecteurs d'écran (ce que montre l'écran). */
  label: string
  className?: string
}

export default function PhoneMockup({ children, label, className = '' }: PhoneMockupProps) {
  return (
    <div
      role="img"
      aria-label={label}
      className={`relative w-[248px] shrink-0 bg-(--bg-2) border border-(--border-medium) p-2 ${className}`}
      style={{ borderRadius: '28px', boxShadow: 'var(--shadow-md)' }}
    >
      {/* Encoche : discrète, juste assez pour lire « téléphone » */}
      <span
        aria-hidden
        className="absolute left-1/2 -translate-x-1/2 top-3.5 h-1 w-10 bg-(--border-medium)"
        style={{ borderRadius: '2px' }}
      />
      <div
        className="bg-(--bg-1) px-4 pt-8 pb-5 flex flex-col gap-4"
        style={{ borderRadius: '22px' }}
      >
        {children}
      </div>
    </div>
  )
}
