import { z } from 'zod'

export const createMonthSchema = z.object({
  name: z.string().trim().min(1, 'Le nom est requis.').max(255),
  month: z.number().int().min(1, 'Le mois doit être entre 1 et 12.').max(12, 'Le mois doit être entre 1 et 12.'),
  year: z.number().int().min(2000).max(2100),
  totalIncome: z.number().min(0, 'Le revenu total ne peut pas être négatif.').optional(),
})

export const updateMonthSchema = createMonthSchema.partial()

export type CreateMonthInput = z.infer<typeof createMonthSchema>
export type UpdateMonthInput = z.infer<typeof updateMonthSchema>
