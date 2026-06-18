import {
  pgTable,
  pgEnum,
  text,
  varchar,
  integer,
  boolean,
  numeric,
  timestamp,
  uniqueIndex,
} from 'drizzle-orm/pg-core'
import { users } from './auth.js'
import { timestamps } from './helpers.js'

// ── Enums ────────────────────────────────────────────────────
export const sectionType = pgEnum('section_type', [
  'charges',
  'epargne',
  'loisirs',
  'custom',
])
export const expenseStatus = pgEnum('expense_status', ['planned', 'paid'])

// ── Mois ─────────────────────────────────────────────────────
export const months = pgTable(
  'months',
  {
    id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
    userId: text('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    name: varchar('name', { length: 255 }).notNull(),
    month: integer('month').notNull(), // 1–12
    year: integer('year').notNull(),
    totalIncome: numeric('total_income', { precision: 15, scale: 2 })
      .notNull()
      .default('0'),
    ...timestamps,
  },
  t => [
    uniqueIndex('months_user_month_year_unique').on(t.userId, t.month, t.year),
  ]
)

export type Month = typeof months.$inferSelect
export type NewMonth = typeof months.$inferInsert

// ── Revenu ───────────────────────────────────────────────────
export const incomes = pgTable('incomes', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  monthId: integer('month_id')
    .notNull()
    .references(() => months.id, { onDelete: 'cascade' }),
  name: varchar('name', { length: 255 }).notNull(),
  amount: numeric('amount', { precision: 15, scale: 2 }).notNull(),
  isFavorite: boolean('is_favorite').notNull().default(false),
  ...timestamps,
})

export type Income = typeof incomes.$inferSelect
export type NewIncome = typeof incomes.$inferInsert

// ── Section ──────────────────────────────────────────────────
export const sections = pgTable('sections', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  monthId: integer('month_id')
    .notNull()
    .references(() => months.id, { onDelete: 'cascade' }),
  name: varchar('name', { length: 255 }).notNull(),
  type: sectionType('type').notNull(),
  percentage: numeric('percentage', { precision: 5, scale: 4 }).notNull(), // 0.5000 = 50%
  sortOrder: integer('sort_order').notNull().default(0),
  ...timestamps,
})

export type Section = typeof sections.$inferSelect
export type NewSection = typeof sections.$inferInsert

// ── Dépense ──────────────────────────────────────────────────
export const expenses = pgTable('expenses', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  sectionId: integer('section_id')
    .notNull()
    .references(() => sections.id, { onDelete: 'cascade' }),
  name: varchar('name', { length: 255 }).notNull(),
  category: text('category'),
  amountPlanned: numeric('amount_planned', {
    precision: 15,
    scale: 2,
  }).notNull(),
  amountReal: numeric('amount_real', { precision: 15, scale: 2 }),
  status: expenseStatus('status').notNull().default('planned'),
  paidAt: timestamp('paid_at', { withTimezone: true }),
  isRecurring: boolean('is_recurring').notNull().default(false),
  sortOrder: integer('sort_order').notNull().default(0),
  ...timestamps,
})

export type Expense = typeof expenses.$inferSelect
export type NewExpense = typeof expenses.$inferInsert

// ── Objectif ─────────────────────────────────────────────────
export const goals = pgTable('goals', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  name: varchar('name', { length: 255 }).notNull(),
  targetAmount: numeric('target_amount', { precision: 15, scale: 2 }).notNull(),
  deadline: timestamp('deadline', { withTimezone: true }),
  isCompleted: boolean('is_completed').notNull().default(false),
  sortOrder: integer('sort_order').notNull().default(0),
  ...timestamps,
})

export type Goal = typeof goals.$inferSelect
export type NewGoal = typeof goals.$inferInsert

// ── Contribution à un objectif ───────────────────────────────
export const goalContributions = pgTable(
  'goal_contributions',
  {
    id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
    goalId: integer('goal_id')
      .notNull()
      .references(() => goals.id, { onDelete: 'cascade' }),
    monthId: integer('month_id')
      .notNull()
      .references(() => months.id, { onDelete: 'cascade' }),
    name: varchar('name', { length: 255 }).notNull(),
    amount: numeric('amount', { precision: 15, scale: 2 }).notNull(),
    ...timestamps,
  },
  t => [
    uniqueIndex('goal_contributions_goal_month_unique').on(t.goalId, t.monthId),
  ]
)

export type GoalContribution = typeof goalContributions.$inferSelect
export type NewGoalContribution = typeof goalContributions.$inferInsert
