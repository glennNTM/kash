import { db } from '../db/index.js'
import { months, incomes, sections, expenses } from '../db/schema/index.js'
import { findByDateWithDetails } from './months.service.js'
import type { MonthWithDetails } from './months.service.js'
import type { OnboardingInput } from '../validators/onboarding.schema.js'

const MONTH_NAMES = [
  'Janvier',
  'Février',
  'Mars',
  'Avril',
  'Mai',
  'Juin',
  'Juillet',
  'Août',
  'Septembre',
  'Octobre',
  'Novembre',
  'Décembre',
]

/**
 * Crée le budget initial d'un utilisateur en une seule transaction :
 * mois + revenu + sections (répartition) + première dépense.
 *
 * Atomique : si une insertion échoue (ex. mois déjà existant → contrainte unique
 * (userId, month, year) → 409), tout est annulé. Aucun budget partiel ne subsiste.
 */
export async function createOnboarding(
  userId: string,
  input: OnboardingInput
): Promise<MonthWithDetails> {
  await db.transaction(async tx => {
    // 1. Mois — totalIncome = revenu unique saisi.
    const [month] = await tx
      .insert(months)
      .values({
        userId,
        name: `${MONTH_NAMES[input.month - 1]} ${input.year}`,
        month: input.month,
        year: input.year,
        totalIncome: String(input.income.amount),
      })
      .returning()

    // 2. Revenu — isFavorite: true (un salaire est récurrent → reporté au mois suivant).
    await tx.insert(incomes).values({
      monthId: month!.id,
      name: input.income.name,
      amount: String(input.income.amount),
      isFavorite: true,
    })

    // 3. Sections — dans l'ordre fourni, sortOrder = index.
    const insertedSections = await tx
      .insert(sections)
      .values(
        input.allocation.map((a, i) => ({
          monthId: month!.id,
          name: a.name,
          type: a.type,
          percentage: String(a.percentage),
          sortOrder: i,
        }))
      )
      .returning()

    // 4. Première dépense — rattachée à la section choisie (par index).
    const targetSection = insertedSections[input.firstExpense.sectionIndex]!
    const isPaid = input.firstExpense.status === 'paid'
    await tx.insert(expenses).values({
      sectionId: targetSection.id,
      name: input.firstExpense.name,
      ...(input.firstExpense.category !== undefined && {
        category: input.firstExpense.category,
      }),
      amountPlanned: String(input.firstExpense.amountPlanned),
      // Dépense déjà payée : le réel vaut le prévu et la date de paiement est posée.
      ...(isPaid && {
        amountReal: String(input.firstExpense.amountPlanned),
        paidAt: new Date(),
      }),
      status: isPaid ? 'paid' : 'planned',
      isRecurring: false,
      sortOrder: 0,
    })
  })

  // Le mois vient d'être créé pour l'utilisateur → jamais null.
  const created = await findByDateWithDetails(userId, input.year, input.month)
  return created!
}
