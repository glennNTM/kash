import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import SiteHeader from '../../src/components/layout/Header'

function renderHeader() {
  return render(
    <MemoryRouter initialEntries={['/']}>
      <SiteHeader />
    </MemoryRouter>
  )
}

describe('SiteHeader', () => {
  /**
   * Garde-fou du repositionnement : le compte utilisateur vit désormais dans
   * l'app mobile. Si une route de connexion réapparaît dans le header, c'est
   * une régression, pas une évolution.
   */
  it('n’expose plus aucun lien de compte', () => {
    const { container } = renderHeader()

    const hrefs = [...container.querySelectorAll('a')].map((a) => a.getAttribute('href'))
    expect(hrefs).not.toContain('/login')
    expect(hrefs).not.toContain('/sign-up')

    expect(screen.queryByText(/se connecter/i)).not.toBeInTheDocument()
  })

  it('propose un lien d’évitement vers le contenu principal', () => {
    renderHeader()

    expect(screen.getByRole('link', { name: /aller au contenu/i })).toHaveAttribute('href', '#contenu')
  })

  it('renvoie le CTA vers la section de téléchargement, pas vers un store précis', () => {
    renderHeader()

    const cta = screen.getAllByRole('link', { name: /télécharger l’app/i })[0]
    expect(cta).toHaveAttribute('href', '#telecharger')
  })
})
