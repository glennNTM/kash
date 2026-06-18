import type { ReactNode } from 'react'

interface OnboardingLayoutProps {
  step: number
  totalSteps: number
  title: string
  subtitle: string
  children: ReactNode
}

/**
 * Coquille du parcours d'onboarding : plein écran centré, logo Kash,
 * barre de progression par étape, titre/sous-titre, puis le contenu de l'étape.
 */
export default function OnboardingLayout({
  step,
  totalSteps,
  title,
  subtitle,
  children,
}: OnboardingLayoutProps) {
  return (
    <div className="min-h-dvh bg-(--bg-1) flex flex-col items-center px-4 py-10">
      <span className="font-display text-3xl text-(--accent) font-bold mb-8">Kash</span>

      <div
        className="w-full max-w-md bg-(--bg-2) rounded-2xl border border-(--border-medium) p-8"
        style={{ boxShadow: 'var(--shadow-md)' }}
      >
        {/* Progression par étape */}
        <div className="flex items-center gap-2 mb-7">
          {Array.from({ length: totalSteps }, (_, i) => {
            const index = i + 1
            const reached = index <= step
            return (
              <span
                key={index}
                className="h-1.5 flex-1 rounded-full transition-colors duration-(--duration-base)"
                style={{ background: reached ? 'var(--accent)' : 'var(--bg-3)' }}
              />
            )
          })}
        </div>

        <p className="text-xs font-semibold text-(--accent) mb-1.5">
          Étape {step} sur {totalSteps}
        </p>
        <h1
          className="font-bold text-(--t-1) mb-1.5"
          style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-display-m)' }}
        >
          {title}
        </h1>
        <p className="text-sm text-(--t-2) mb-7">{subtitle}</p>

        {children}
      </div>
    </div>
  )
}
