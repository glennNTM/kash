import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import BackgroundRippleEffect from '../../src/components/ui/BackgroundRippleEffect'

describe('BackgroundRippleEffect', () => {
  it('est purement décoratif : aria-hidden et pointer-events-none', () => {
    const { container } = render(<BackgroundRippleEffect />)
    const root = container.firstElementChild as HTMLElement
    expect(root).toHaveAttribute('aria-hidden')
    expect(root.className).toContain('pointer-events-none')
  })
})
