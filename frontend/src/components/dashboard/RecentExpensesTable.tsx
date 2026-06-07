import { formatAmount } from '../../lib/format'
import type { DashboardStats } from '../../types/budget'

interface RecentExpensesTableProps {
  expenses: DashboardStats['recentExpenses']
}

export default function RecentExpensesTable({ expenses }: RecentExpensesTableProps) {
  if (expenses.length === 0) {
    return (
      <div className="rounded-xl border border-(--border-subtle) bg-(--bg-2) p-6 text-center text-sm text-(--t-3)"
        style={{ boxShadow: 'var(--shadow-sm)' }}>
        Aucune dépense payée ce mois-ci.
      </div>
    )
  }

  return (
    <div
      className="rounded-xl border border-(--border-subtle) bg-(--bg-2) overflow-hidden"
      style={{ boxShadow: 'var(--shadow-sm)' }}
    >
      <div className="px-5 py-4 border-b border-(--border-subtle)">
        <h2
          className="font-bold text-(--t-1)"
          style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-heading-l)' }}
        >
          Dernières dépenses
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-(--border-subtle)">
              {['Libellé', 'Section', 'Catégorie', 'Date', 'Montant'].map((h) => (
                <th
                  key={h}
                  className="px-5 py-3 text-left text-xs font-semibold text-(--t-3) uppercase tracking-wider whitespace-nowrap last:text-right"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense, i) => (
              <tr
                key={expense.id}
                className={`border-b border-(--border-subtle) last:border-0 transition-colors hover:bg-(--bg-3) ${i % 2 === 1 ? 'bg-(--bg-1)' : ''}`}
              >
                <td className="px-5 py-3.5 font-medium text-(--t-1) whitespace-nowrap">
                  <span style={{ textDecoration: 'line-through', color: 'var(--t-3)' }}>
                    {expense.label}
                  </span>
                </td>
                <td className="px-5 py-3.5 text-(--t-2) whitespace-nowrap">
                  {expense.sectionName}
                </td>
                <td className="px-5 py-3.5 text-(--t-2) whitespace-nowrap">
                  {expense.category}
                </td>
                <td className="px-5 py-3.5 text-(--t-3) whitespace-nowrap" style={{ fontFamily: 'var(--font-mono)', fontSize: '12px' }}>
                  {expense.paidAt
                    ? new Date(expense.paidAt).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' })
                    : '—'}
                </td>
                <td className="px-5 py-3.5 text-right whitespace-nowrap font-semibold" style={{ fontFamily: 'var(--font-mono)', color: 'var(--success)' }}>
                  {formatAmount(expense.amountReal ?? expense.amountPlanned)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
