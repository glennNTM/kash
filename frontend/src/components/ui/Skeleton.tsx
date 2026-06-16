interface SkeletonProps {
  className?: string
  /** Rendu circulaire (icônes, avatars, donuts). */
  circle?: boolean
}

/**
 * Brique de chargement « formée ». Applique le shimmer global (.skeleton).
 * À dimensionner via className (h-/w-/rounded-). Purement décoratif (aria-hidden) :
 * l'annonce d'attente est portée par le conteneur (role="status").
 */
export default function Skeleton({ className = '', circle = false }: SkeletonProps) {
  return <div aria-hidden className={`skeleton ${circle ? 'rounded-full' : ''} ${className}`} />
}
