import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import StoreBadges from '../../src/components/ui/StoreBadges'

describe('StoreBadges', () => {
  it('expose un lien par store, nommé pour les lecteurs d’écran', () => {
    render(<StoreBadges />)

    expect(screen.getByRole('link', { name: /App Store/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Google Play/i })).toBeInTheDocument()
  })

  it('ouvre les stores dans un onglet isolé (pas d’accès à window.opener)', () => {
    render(<StoreBadges />)

    for (const link of screen.getAllByRole('link')) {
      expect(link).toHaveAttribute('target', '_blank')
      expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    }
  })
})
