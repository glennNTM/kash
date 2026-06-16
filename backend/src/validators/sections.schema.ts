import { z } from 'zod'

// Types de section alignés sur l'enum Drizzle (db/schema/app.ts).
export const sectionTypeEnum = z.enum(['charges', 'epargne', 'loisirs', 'custom'])

export const createSectionSchema = z.object({
  monthId: z.number().int().positive(),
  name: z.string().trim().min(1, 'Le nom est requis.').max(255),
  type: sectionTypeEnum,
  // percentage en fraction : 0.5 = 50%. Aucune part sous 10% (règle produit), 100% max.
  percentage: z
    .number()
    .min(0.1, 'Une section ne peut pas être sous 10%.')
    .max(1, 'Le pourcentage ne peut pas dépasser 100%.'),
  sortOrder: z.number().int().min(0).optional(),
})

// En mise à jour, tout est optionnel sauf le rattachement au mois (immuable).
export const updateSectionSchema = createSectionSchema.omit({ monthId: true }).partial()

// Mise à jour groupée des % d'un mois. La somme = 100% est validée côté service (transaction).
export const updatePercentagesSchema = z.object({
  percentages: z
    .array(
      z.object({
        id: z.number().int().positive(),
        percentage: z
          .number()
          .min(0.1, 'Une section ne peut pas être sous 10%.')
          .max(1, 'Le pourcentage ne peut pas dépasser 100%.'),
      })
    )
    .min(1, 'Au moins une section est requise.'),
})

export type CreateSectionInput = z.infer<typeof createSectionSchema>
export type UpdateSectionInput = z.infer<typeof updateSectionSchema>
export type UpdatePercentagesInput = z.infer<typeof updatePercentagesSchema>
