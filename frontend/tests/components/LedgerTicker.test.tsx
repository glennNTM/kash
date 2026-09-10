import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import LedgerTicker from '../../src/components/ui/LedgerTicker'

// Intl 'fr-FR' insère des espaces insécables comme séparateur de milliers ;
// on normalise pour des assertions stables (cf. tests/unit/format.test.ts).
function normalized(text: string) {
  return (content: string) => content.replace(/\s/g, ' ') === text
}

describe('LedgerTicker', () => {
  it('formate les montants numériques en FCFA', () => {
    render(<LedgerTicker entries={[{ label: 'Salaire', value: 450_000 }]} />)

    expect(screen.getByText(normalized('450 000 FCFA'))).toBeInTheDocument()
    expect(screen.getByText('Salaire')).toBeInTheDocument()
  })

  it('laisse passer une valeur déjà mise en forme', () => {
    render(<LedgerTicker entries={[{ label: 'Épargne suivie', value: '412 M' }]} />)

    expect(screen.getByText('412 M')).toBeInTheDocument()
  })

  it('met la valeur en accent quand elle est mise en avant', () => {
    render(
      <LedgerTicker
        entries={[
          { label: 'Salaire', value: 450_000 },
          { label: 'Reste à vivre', value: 90_000, highlight: true },
        ]}
      />
    )

    expect(screen.getByText(normalized('90 000 FCFA'))).toHaveStyle({ color: 'var(--accent)' })
    expect(screen.getByText(normalized('450 000 FCFA'))).toHaveStyle({ color: 'var(--t-1)' })
  })
})
