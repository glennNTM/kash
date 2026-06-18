import { z } from 'zod'

/**
 * Schémas Zod par étape de l'onboarding — miroir front des règles backend.
 * La validation cross-étapes (somme des % = 100, part ≥ 10 %) est gérée
 * dans `StepAllocation` (logique sliders), pas ici.
 */

// Étape 1 — revenu unique (un salaire).
export const incomeSchema = z.object({
  name: z.string().trim().min(1, 'Le nom du revenu est requis').max(255),
  amount: z
    .number({ error: 'Montant requis' })
    .int('Montant entier')
    .positive('Le revenu doit être supérieur à 0'),
})
export type IncomeForm = z.infer<typeof incomeSchema>

// Étape 3 — première dépense, rattachée à une section par son index.
export const firstExpenseSchema = z.object({
  sectionIndex: z.number().int().min(0),
  name: z.string().trim().min(1, 'Le nom de la dépense est requis').max(255),
  category: z.string().min(1, 'Catégorie requise'),
  amountPlanned: z
    .number({ error: 'Montant requis' })
    .int('Montant entier')
    .positive('Le montant doit être supérieur à 0'),
  status: z.enum(['planned', 'paid']),
})
export type FirstExpenseForm = z.infer<typeof firstExpenseSchema>
