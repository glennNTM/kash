import { z } from 'zod'

export const createGoalContributionSchema = z.object({
  goalId: z.number().int().positive(),
  monthId: z.number().int().positive(),
  name: z.string().trim().min(1, 'Le nom est requis.').max(255),
  amount: z.number().positive('Le montant doit être supérieur à 0.'),
})

// Le rattachement (goal + month) est immuable ; seuls le nom et le montant changent.
export const updateGoalContributionSchema = createGoalContributionSchema
  .omit({ goalId: true, monthId: true })
  .partial()

export type CreateGoalContributionInput = z.infer<typeof createGoalContributionSchema>
export type UpdateGoalContributionInput = z.infer<typeof updateGoalContributionSchema>
