import { describe, it, expect, beforeEach, vi } from 'vitest'
import type { ReactNode } from 'react'
import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useDashboard } from '../../src/hooks/useDashboard'
import type { Month } from '../../src/types/budget'

// On mocke la couche API mais on garde le vrai computeStats (logique métier testée ailleurs).
vi.mock('../../src/api/dashboard', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../../src/api/dashboard')>()
  return { ...actual, getMonth: vi.fn() }
})

const { getMonth } = await import('../../src/api/dashboard')

const sampleMonth: Month = {
  id: 1,
  userId: 'u1',
  month: 6,
  year: 2026,
  totalIncome: 300000,
  sections: [
    {
      id: 1,
      monthId: 1,
      name: 'Charges',
      type: 'charges',
      percentage: 0.5,
      expenses: [],
    },
  ],
}

// Wrapper QueryClient neuf par test (pas de retry pour des échecs déterministes).
function wrapper({ children }: { children: ReactNode }) {
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  })
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>
}

describe('useDashboard', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renvoie le mois et les stats calculées quand un budget existe', async () => {
    vi.mocked(getMonth).mockResolvedValue({ data: sampleMonth })

    const { result } = renderHook(() => useDashboard(2026, 6), { wrapper })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    expect(result.current.data?.month).toEqual(sampleMonth)
    expect(result.current.data?.stats?.totalIncome).toBe(300000)
  })

  it('renvoie un état vide (month null) quand aucun budget (404)', async () => {
    vi.mocked(getMonth).mockResolvedValue({ data: null })

    const { result } = renderHook(() => useDashboard(2026, 6), { wrapper })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    expect(result.current.data).toEqual({ month: null, stats: null })
  })

  it('passe en erreur quand l’API renvoie une erreur', async () => {
    vi.mocked(getMonth).mockResolvedValue({ error: 'Boom' })

    const { result } = renderHook(() => useDashboard(2026, 6), { wrapper })

    await waitFor(() => expect(result.current.isError).toBe(true))
    expect(result.current.error?.message).toBe('Boom')
  })
})
