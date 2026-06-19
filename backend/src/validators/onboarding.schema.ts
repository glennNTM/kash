import { z } from 'zod'
import { sectionTypeEnum } from './sections.schema.js'
import { expenseStatusEnum } from './expenses.schema.js'

// Tolérance sur la somme des pourcentages (flottants) — alignée sur le service sections.
const EPSILON = 0.0001

/**
 * Payload complet de l'onboarding (3 étapes en une opération atomique) :
 *  1. revenu unique → totalIncome du mois
 *  2. répartition des sections (somme = 100%, chaque part ≥ 10%)
 *  3. première dépense, rattachée à une section par son index dans `allocation`
 */
export const onboardingSchema = z
  .object({
    month: z
      .number()
      .int()
      .min(1, 'Le mois doit être entre 1 et 12.')
      .max(12, 'Le mois doit être entre 1 et 12.'),
    year: z.number().int().min(2000).max(2100),
    // Revenu unique simple (un salaire). Reporté au mois suivant (isFavorite côté service).
    income: z.object({
      name: z.string().trim().min(1, 'Le nom du revenu est requis.').max(255),
      amount: z.number().positive('Le revenu doit être supérieur à 0.'),
    }),
    allocation: z
      .array(
        z.object({
          name: z.string().trim().min(1, 'Le nom est requis.').max(255),
          type: sectionTypeEnum,
          // percentage en fraction : 0.5 = 50%.
          percentage: z
            .number()
            .min(0.1, 'Une section ne peut pas être sous 10%.')
            .max(1, 'Le pourcentage ne peut pas dépasser 100%.'),
        })
      )
      .min(1, 'Au moins une section est requise.'),
    firstExpense: z.object({
      // Index de la section cible dans `allocation` (les sections n'ont pas encore d'ID).
      sectionIndex: z.number().int().min(0),
      name: z
        .string()
        .trim()
        .min(1, 'Le nom de la dépense est requis.')
        .max(255),
      category: z.string().trim().max(255).optional(),
      amountPlanned: z
        .number()
        .positive('Le montant prévu doit être supérieur à 0.'),
      status: expenseStatusEnum.optional(),
    }),
  })
  .superRefine((data, ctx) => {
    const total = data.allocation.reduce((acc, a) => acc + a.percentage, 0)
    if (Math.abs(total - 1) > EPSILON) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['allocation'],
        message: 'La somme des pourcentages doit être égale à 100%.',
      })
    }
    if (data.firstExpense.sectionIndex >= data.allocation.length) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['firstExpense', 'sectionIndex'],
        message: 'La section de la première dépense est invalide.',
      })
    }
  })

export type OnboardingInput = z.infer<typeof onboardingSchema>
