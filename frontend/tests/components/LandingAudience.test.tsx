import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import LandingAudience from '../../src/components/landing/LandingAudience'

describe('LandingAudience', () => {
  it('oppose deux listes titrées : pour toi / pas encore pour toi', () => {
    render(<LandingAudience />)

    expect(screen.getByRole('heading', { level: 3, name: /c’est pour toi si/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 3, name: /pas encore pour toi si/i })).toBeInTheDocument()
    expect(screen.getAllByRole('list')).toHaveLength(2)
  })
})
