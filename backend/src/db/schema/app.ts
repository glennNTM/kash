import {
  pgTable,
  pgEnum,
  text,
  integer,
  boolean,
  numeric,
  timestamp,
  uniqueIndex,
} from 'drizzle-orm/pg-core';
import { createId } from '@paralleldrive/cuid2';
import { users } from './auth.js';
import { timestamps } from './helpers.js';

// ── Enums ────────────────────────────────────────────────────
export const sectionType = pgEnum('section_type', ['charges', 'epargne', 'loisirs', 'custom']);
export const expenseStatus = pgEnum('expense_status', ['planned', 'paid']);

// ── Mois ─────────────────────────────────────────────────────
export const months = pgTable(
  'months',
  {
    id: text('id').primaryKey().$defaultFn(createId),
    userId: text('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    month: integer('month').notNull(), // 1–12
    year: integer('year').notNull(),
    totalIncome: numeric('total_income', { precision: 15, scale: 2 }).notNull().default('0'),
    ...timestamps,
  },
  (t) => [uniqueIndex('months_user_month_year_unique').on(t.userId, t.month, t.year)],
);

// ── Revenu ───────────────────────────────────────────────────
export const incomes = pgTable('incomes', {
  id: text('id').primaryKey().$defaultFn(createId),
  monthId: text('month_id')
    .notNull()
    .references(() => months.id, { onDelete: 'cascade' }),
  label: text('label').notNull(),
  amount: numeric('amount', { precision: 15, scale: 2 }).notNull(),
  isFavorite: boolean('is_favorite').notNull().default(false),
  ...timestamps,
});

// ── Section ──────────────────────────────────────────────────
export const sections = pgTable('sections', {
  id: text('id').primaryKey().$defaultFn(createId),
  monthId: text('month_id')
    .notNull()
    .references(() => months.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  type: sectionType('type').notNull(),
  percentage: numeric('percentage', { precision: 5, scale: 4 }).notNull(), // 0.5000 = 50%
  sortOrder: integer('sort_order').notNull().default(0),
  ...timestamps,
});

// ── Dépense ──────────────────────────────────────────────────
export const expenses = pgTable('expenses', {
  id: text('id').primaryKey().$defaultFn(createId),
  sectionId: text('section_id')
    .notNull()
    .references(() => sections.id, { onDelete: 'cascade' }),
  label: text('label').notNull(),
  category: text('category'),
  amountPlanned: numeric('amount_planned', { precision: 15, scale: 2 }).notNull(),
  amountReal: numeric('amount_real', { precision: 15, scale: 2 }),
  status: expenseStatus('status').notNull().default('planned'),
  paidAt: timestamp('paid_at', { withTimezone: true }),
  isRecurring: boolean('is_recurring').notNull().default(false),
  sortOrder: integer('sort_order').notNull().default(0),
  ...timestamps,
});

// ── Objectif ─────────────────────────────────────────────────
export const goals = pgTable('goals', {
  id: text('id').primaryKey().$defaultFn(createId),
  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  targetAmount: numeric('target_amount', { precision: 15, scale: 2 }).notNull(),
  deadline: timestamp('deadline', { withTimezone: true }),
  isCompleted: boolean('is_completed').notNull().default(false),
  sortOrder: integer('sort_order').notNull().default(0),
  ...timestamps,
});

// ── Contribution à un objectif ───────────────────────────────
export const goalContributions = pgTable(
  'goal_contributions',
  {
    id: text('id').primaryKey().$defaultFn(createId),
    goalId: text('goal_id')
      .notNull()
      .references(() => goals.id, { onDelete: 'cascade' }),
    monthId: text('month_id')
      .notNull()
      .references(() => months.id, { onDelete: 'cascade' }),
    amount: numeric('amount', { precision: 15, scale: 2 }).notNull(),
    ...timestamps,
  },
  (t) => [uniqueIndex('goal_contributions_goal_month_unique').on(t.goalId, t.monthId)],
);
