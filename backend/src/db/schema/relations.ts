import { relations } from 'drizzle-orm'
import { users, sessions, accounts } from './auth.js'
import { months, incomes, sections, expenses, goals, goalContributions } from './app.js'

// ── Auth ─────────────────────────────────────────────────────
export const usersRelations = relations(users, ({ many }) => ({
  sessions: many(sessions),
  accounts: many(accounts),
  months: many(months),
  goals: many(goals),
}))

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}))

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
}))

// ── Métier ───────────────────────────────────────────────────
export const monthsRelations = relations(months, ({ one, many }) => ({
  user: one(users, { fields: [months.userId], references: [users.id] }),
  incomes: many(incomes),
  sections: many(sections),
  goalContributions: many(goalContributions),
}))

export const incomesRelations = relations(incomes, ({ one }) => ({
  month: one(months, { fields: [incomes.monthId], references: [months.id] }),
}))

export const sectionsRelations = relations(sections, ({ one, many }) => ({
  month: one(months, { fields: [sections.monthId], references: [months.id] }),
  expenses: many(expenses),
}))

export const expensesRelations = relations(expenses, ({ one }) => ({
  section: one(sections, { fields: [expenses.sectionId], references: [sections.id] }),
}))

export const goalsRelations = relations(goals, ({ one, many }) => ({
  user: one(users, { fields: [goals.userId], references: [users.id] }),
  goalContributions: many(goalContributions),
}))

export const goalContributionsRelations = relations(goalContributions, ({ one }) => ({
  goal: one(goals, { fields: [goalContributions.goalId], references: [goals.id] }),
  month: one(months, { fields: [goalContributions.monthId], references: [months.id] }),
}))
