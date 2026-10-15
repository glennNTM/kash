import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import LandingPillars from '../../src/components/landing/LandingPillars'

describe('LandingPillars', () => {
  it('rend trois piliers, chacun avec son accordéon de détail', () => {
    render(<LandingPillars />)

    expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(3)
    expect(screen.getAllByRole('button', { name: /voir le détail/i })).toHaveLength(3)
  })

  it('révèle le détail d’un pilier au clic, sans ouvrir les autres', async () => {
    const user = userEvent.setup()
    render(<LandingPillars />)

    const [first, second] = screen.getAllByRole('button', { name: /voir le détail/i })
    await user.click(first)

    expect(first).toHaveAttribute('aria-expanded', 'true')
    expect(second).toHaveAttribute('aria-expanded', 'false')
  })
})
