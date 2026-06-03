import type { Month } from '../types/budget'

export const MOCK_MONTHS: Month[] = [
  {
    id: 'month-2026-04',
    userId: 'user-1',
    month: 4,
    year: 2026,
    totalIncome: 420_000,
    sections: [
      {
        id: 'sec-apr-charges',
        monthId: 'month-2026-04',
        name: 'Charges',
        type: 'charges',
        percentage: 0.5,
        expenses: [
          { id: 'e1', sectionId: 'sec-apr-charges', label: 'Loyer', category: 'Logement', amountPlanned: 120_000, amountReal: 120_000, status: 'paid', paidAt: '2026-04-01', isRecurring: true },
          { id: 'e2', sectionId: 'sec-apr-charges', label: 'Électricité', category: 'Factures', amountPlanned: 18_000, amountReal: 17_500, status: 'paid', paidAt: '2026-04-05', isRecurring: true },
          { id: 'e3', sectionId: 'sec-apr-charges', label: 'Internet', category: 'Factures', amountPlanned: 15_000, amountReal: 15_000, status: 'paid', paidAt: '2026-04-05', isRecurring: true },
          { id: 'e4', sectionId: 'sec-apr-charges', label: 'Courses alimentaires', category: 'Alimentation', amountPlanned: 50_000, amountReal: 48_000, status: 'paid', paidAt: '2026-04-10', isRecurring: false },
        ],
      },
      {
        id: 'sec-apr-epargne',
        monthId: 'month-2026-04',
        name: 'Épargne',
        type: 'epargne',
        percentage: 0.3,
        expenses: [
          { id: 'e5', sectionId: 'sec-apr-epargne', label: 'Fonds urgence', category: 'Épargne', amountPlanned: 50_000, amountReal: 50_000, status: 'paid', paidAt: '2026-04-02', isRecurring: true },
          { id: 'e6', sectionId: 'sec-apr-epargne', label: 'Investissement', category: 'Épargne', amountPlanned: 76_000, amountReal: 76_000, status: 'paid', paidAt: '2026-04-02', isRecurring: true },
        ],
      },
      {
        id: 'sec-apr-loisirs',
        monthId: 'month-2026-04',
        name: 'Loisirs',
        type: 'loisirs',
        percentage: 0.2,
        expenses: [
          { id: 'e7', sectionId: 'sec-apr-loisirs', label: 'Restaurant', category: 'Alimentation', amountPlanned: 20_000, amountReal: 22_000, status: 'paid', paidAt: '2026-04-15', isRecurring: false },
          { id: 'e8', sectionId: 'sec-apr-loisirs', label: 'Sortie ciné', category: 'Loisirs', amountPlanned: 8_000, amountReal: 8_000, status: 'paid', paidAt: '2026-04-20', isRecurring: false },
        ],
      },
    ],
  },
  {
    id: 'month-2026-05',
    userId: 'user-1',
    month: 5,
    year: 2026,
    totalIncome: 450_000,
    sections: [
      {
        id: 'sec-may-charges',
        monthId: 'month-2026-05',
        name: 'Charges',
        type: 'charges',
        percentage: 0.5,
        expenses: [
          { id: 'e9', sectionId: 'sec-may-charges', label: 'Loyer', category: 'Logement', amountPlanned: 120_000, amountReal: 120_000, status: 'paid', paidAt: '2026-05-01', isRecurring: true },
          { id: 'e10', sectionId: 'sec-may-charges', label: 'Électricité', category: 'Factures', amountPlanned: 18_000, amountReal: 19_200, status: 'paid', paidAt: '2026-05-05', isRecurring: true },
          { id: 'e11', sectionId: 'sec-may-charges', label: 'Internet', category: 'Factures', amountPlanned: 15_000, amountReal: 15_000, status: 'paid', paidAt: '2026-05-05', isRecurring: true },
        ],
      },
      {
        id: 'sec-may-epargne',
        monthId: 'month-2026-05',
        name: 'Épargne',
        type: 'epargne',
        percentage: 0.3,
        expenses: [
          { id: 'e12', sectionId: 'sec-may-epargne', label: 'Fonds urgence', category: 'Épargne', amountPlanned: 50_000, amountReal: 50_000, status: 'paid', paidAt: '2026-05-02', isRecurring: true },
          { id: 'e13', sectionId: 'sec-may-epargne', label: 'Investissement', category: 'Épargne', amountPlanned: 85_000, amountReal: 85_000, status: 'paid', paidAt: '2026-05-02', isRecurring: true },
        ],
      },
      {
        id: 'sec-may-loisirs',
        monthId: 'month-2026-05',
        name: 'Loisirs',
        type: 'loisirs',
        percentage: 0.2,
        expenses: [
          { id: 'e14', sectionId: 'sec-may-loisirs', label: 'Vêtements', category: 'Vêtements', amountPlanned: 30_000, amountReal: 30_000, status: 'paid', paidAt: '2026-05-12', isRecurring: false },
          { id: 'e15', sectionId: 'sec-may-loisirs', label: 'Sortie', category: 'Loisirs', amountPlanned: 15_000, amountReal: 15_000, status: 'paid', paidAt: '2026-05-18', isRecurring: false },
        ],
      },
    ],
  },
  {
    id: 'month-2026-06',
    userId: 'user-1',
    month: 6,
    year: 2026,
    totalIncome: 450_000,
    sections: [
      {
        id: 'sec-jun-charges',
        monthId: 'month-2026-06',
        name: 'Charges',
        type: 'charges',
        percentage: 0.5,
        expenses: [
          { id: 'e16', sectionId: 'sec-jun-charges', label: 'Loyer', category: 'Logement', amountPlanned: 120_000, amountReal: 120_000, status: 'paid', paidAt: '2026-06-01', isRecurring: true },
          { id: 'e17', sectionId: 'sec-jun-charges', label: 'Électricité', category: 'Factures', amountPlanned: 18_000, amountReal: null, status: 'planned', paidAt: null, isRecurring: true },
          { id: 'e18', sectionId: 'sec-jun-charges', label: 'Internet', category: 'Factures', amountPlanned: 15_000, amountReal: 15_000, status: 'paid', paidAt: '2026-06-05', isRecurring: true },
          { id: 'e19', sectionId: 'sec-jun-charges', label: 'Transport', category: 'Transport', amountPlanned: 25_000, amountReal: 25_000, status: 'paid', paidAt: '2026-06-03', isRecurring: false },
        ],
      },
      {
        id: 'sec-jun-epargne',
        monthId: 'month-2026-06',
        name: 'Épargne',
        type: 'epargne',
        percentage: 0.3,
        expenses: [
          { id: 'e20', sectionId: 'sec-jun-epargne', label: 'Fonds urgence', category: 'Épargne', amountPlanned: 50_000, amountReal: 50_000, status: 'paid', paidAt: '2026-06-02', isRecurring: true },
          { id: 'e21', sectionId: 'sec-jun-epargne', label: 'Investissement', category: 'Épargne', amountPlanned: 85_000, amountReal: null, status: 'planned', paidAt: null, isRecurring: true },
        ],
      },
      {
        id: 'sec-jun-loisirs',
        monthId: 'month-2026-06',
        name: 'Loisirs',
        type: 'loisirs',
        percentage: 0.2,
        expenses: [
          { id: 'e22', sectionId: 'sec-jun-loisirs', label: 'Restaurant', category: 'Alimentation', amountPlanned: 20_000, amountReal: 12_000, status: 'paid', paidAt: '2026-06-08', isRecurring: false },
          { id: 'e23', sectionId: 'sec-jun-loisirs', label: 'Sortie sport', category: 'Loisirs', amountPlanned: 10_000, amountReal: null, status: 'planned', paidAt: null, isRecurring: false },
        ],
      },
    ],
  },
]
