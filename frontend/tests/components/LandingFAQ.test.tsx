import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import LandingFAQ from '../../src/components/landing/LandingFAQ'
import { FAQ_ITEMS } from '../../src/lib/constants'

describe('LandingFAQ', () => {
  it('rend une question par entrée', () => {
    render(<LandingFAQ />)

    for (const { q } of FAQ_ITEMS) {
      expect(screen.getByRole('button', { name: q })).toBeInTheDocument()
    }
  })

  it('révèle la réponse au clic sur la question', async () => {
    const user = userEvent.setup()
    render(<LandingFAQ />)

    const [{ q, a }] = FAQ_ITEMS
    expect(screen.queryByText(a)).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: q }))
    expect(screen.getByText(a)).toBeInTheDocument()
  })
})
