import { Component, type ErrorInfo, type ReactNode } from 'react'
import { TriangleAlert, RotateCw } from '../../lib/icons'

interface ErrorBoundaryProps {
  children: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
}

/**
 * Garde-fou global. Capture les erreurs de rendu React (qui sinon laissent
 * un écran blanc) et affiche un écran rassurant « On a buggé, pas toi »
 * avec une porte de sortie. L'erreur technique est loggée, jamais affichée.
 */
export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // TODO: brancher un service de reporting (Sentry…) quand il existera.
    console.error('Erreur de rendu capturée par ErrorBoundary :', error, info)
  }

  handleReload = () => {
    window.location.assign('/')
  }

  render() {
    if (!this.state.hasError) return this.props.children

    return (
      <div className="min-h-dvh flex flex-col items-center justify-center text-center px-6 bg-(--bg-1)">
        <span
          className="grid place-items-center size-20 rounded-full mb-6"
          style={{ background: 'rgba(217,119,6,0.10)' }}
        >
          <TriangleAlert size={34} strokeWidth={1.5} style={{ color: 'var(--warning)' }} />
        </span>

        <h1
          className="font-display font-bold text-(--t-1) mb-2"
          style={{ fontSize: 'var(--text-heading-l)' }}
        >
          On a buggé, pas toi
        </h1>

        <p className="text-(--t-2) max-w-sm mb-7" style={{ fontSize: 'var(--text-body-l)', lineHeight: '1.6' }}>
          Une erreur inattendue s’est produite de notre côté. Tes données sont en sécurité —
          recharge la page pour repartir du bon pied.
        </p>

        <button
          type="button"
          onClick={this.handleReload}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-(--accent) text-white font-semibold transition-colors hover:bg-(--accent-hover) active:scale-97"
          style={{ fontSize: 'var(--text-body-l)', transitionDuration: 'var(--duration-fast)' }}
        >
          <RotateCw size={18} />
          Recharger Kash
        </button>
      </div>
    )
  }
}
