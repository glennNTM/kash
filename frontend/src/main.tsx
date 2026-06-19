import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'
import './index.css'
import App from './App.tsx'
import ErrorBoundary from './components/ui/ErrorBoundary.tsx'
import { initTheme } from './stores/themeStore.ts'

// Applique le thème (persisté ou préférence OS) avant le rendu de l'app.
initTheme()

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60,
      retry: 1,
    },
  },
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            fontFamily: 'var(--font-body)',
            fontSize: '14px',
            borderRadius: 'var(--radius-lg)',
            background: 'var(--bg-2)',
            color: 'var(--t-1)',
            border: '1px solid var(--border-subtle)',
            boxShadow: 'var(--shadow-md)',
          },
          success: {
            iconTheme: { primary: 'var(--accent)', secondary: '#fff' },
            style: { borderLeft: '3px solid var(--accent)' },
          },
          error: {
            iconTheme: { primary: 'var(--error)', secondary: '#fff' },
            style: { borderLeft: '3px solid var(--error)' },
          },
        }}
      />
    </QueryClientProvider>
  </StrictMode>,
)
