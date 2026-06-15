import { z } from 'zod'

// Statuts alignés sur l'enum Drizzle (db/schema/app.ts).
export const expenseStatusEnum = z.enum(['planned', 'paid'])

export const createExpenseSchema = z.object({
  sectionId: z.number().int().positive(),
  name: z.string().trim().min(1, 'Le nom est requis.').max(255),
  category: z.string().trim().max(255).optional(),
  amountPlanned: z.number().positive('Le montant prévu doit être supérieur à 0.'),
  amountReal: z.number().nonnegative('Le montant réel ne peut pas être négatif.').optional(),
  status: expenseStatusEnum.optional(),
  isRecurring: z.boolean().optional(),
  sortOrder: z.number().int().min(0).optional(),
})

// En mise à jour, tout est optionnel sauf le rattachement à la section (immuable).
export const updateExpenseSchema = createExpenseSchema.omit({ sectionId: true }).partial()

export type CreateExpenseInput = z.infer<typeof createExpenseSchema>
export type UpdateExpenseInput = z.infer<typeof updateExpenseSchema>
