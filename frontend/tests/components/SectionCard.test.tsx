import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SectionCard from '../../src/components/dashboard/SectionCard'
import type { Section, SectionStats } from '../../src/types/budget'

const section: Section = {
  id: 1,
  monthId: 1,
  name: 'Charges fixes',
  type: 'charges',
  percentage: 0.5,
  expenses: [],
}

function stats(ratio: number): SectionStats {
  return { sectionId: 1, allocated: 150000, spent: 150000 * ratio, remaining: 0, ratio }
}

describe('SectionCard', () => {
  it('affiche le nom de la section et le montant dépensé', () => {
    render(<SectionCard section={section} stats={stats(0.5)} onClick={() => {}} />)
    expect(screen.getByText('Charges fixes')).toBeInTheDocument()
    // spent = 150 000 × 0.5 = 75 000 (le séparateur de milliers est un espace insécable)
    expect(screen.getByText(/75.?000 FCFA/)).toBeInTheDocument()
  })

  it('affiche une alerte de dépassement quand ratio > 1', () => {
    render(<SectionCard section={section} stats={stats(1.2)} onClick={() => {}} />)
    expect(screen.getByText(/Dépassement/)).toBeInTheDocument()
  })

  it("n'affiche aucune alerte sous le seuil de 0.8", () => {
    render(<SectionCard section={section} stats={stats(0.5)} onClick={() => {}} />)
    expect(screen.queryByText(/plafond|Dépassement/)).not.toBeInTheDocument()
  })

  it('appelle onClick avec la section au clic', async () => {
    const onClick = vi.fn()
    render(<SectionCard section={section} stats={stats(0.5)} onClick={onClick} />)
    await userEvent.click(screen.getByRole('button'))
    expect(onClick).toHaveBeenCalledWith(section)
  })
})
