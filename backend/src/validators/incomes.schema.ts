import { z } from 'zod'

export const createIncomeSchema = z.object({
  monthId: z.number().int().positive(),
  name: z.string().trim().min(1, 'Le nom est requis.').max(255),
  amount: z.number().positive('Le montant doit être supérieur à 0.'),
  isFavorite: z.boolean().optional(),
})

// En mise à jour, tout est optionnel sauf le rattachement au mois (immuable).
export const updateIncomeSchema = createIncomeSchema
  .omit({ monthId: true })
  .partial()

export type CreateIncomeInput = z.infer<typeof createIncomeSchema>
export type UpdateIncomeInput = z.infer<typeof updateIncomeSchema>
