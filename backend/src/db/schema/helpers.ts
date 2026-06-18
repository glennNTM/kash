import { timestamp } from 'drizzle-orm/pg-core'

/**
 * Colonnes timestamp partagées par toutes les tables métier.
 * `createdAt` figé à la création, `updatedAt` rafraîchi côté Drizzle à chaque update.
 */
export const timestamps = {
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
}
