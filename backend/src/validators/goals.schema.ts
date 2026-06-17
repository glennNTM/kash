import { z } from 'zod'

export const createGoalSchema = z.object({
  name: z.string().trim().min(1, 'Le nom est requis.').max(255),
  targetAmount: z
    .number()
    .positive('Le montant cible doit être supérieur à 0.'),
  // Le client envoie une date ISO ; coerce la transforme en Date pour Drizzle.
  deadline: z.coerce.date().optional(),
  isCompleted: z.boolean().optional(),
  sortOrder: z.number().int().min(0).optional(),
})

export const updateGoalSchema = createGoalSchema.partial()

export type CreateGoalInput = z.infer<typeof createGoalSchema>
export type UpdateGoalInput = z.infer<typeof updateGoalSchema>
