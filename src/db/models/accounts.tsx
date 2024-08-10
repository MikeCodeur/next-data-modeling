import {integer, pgTable, serial, numeric} from 'drizzle-orm/pg-core'

import {relations} from 'drizzle-orm'
import {users} from './users'

export const accounts = pgTable('accounts', {
  id: serial('id').primaryKey(),
  userId: integer('user_id')
    .references(() => users.id)
    .notNull(), // Clé étrangère vers users
  balance: numeric('balance', {precision: 10, scale: 2}).default('0').notNull(),
})

export const accountRelations = relations(accounts, ({one}) => ({
  user: one(users, {
    fields: [accounts.userId],
    references: [users.id],
  }),
}))
