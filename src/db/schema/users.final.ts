import {
  integer,
  jsonb,
  pgTable,
  serial,
  text,
  varchar,
} from 'drizzle-orm/pg-core'
import {relations} from 'drizzle-orm'

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: text('name'),
})

export const profileInfo = pgTable('profile_info', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id),
  note: varchar('note', {length: 255}),
  metadata: jsonb('metadata'),
})

//https://github.com/drizzle-team/drizzle-orm-docs/issues/335
//https://github.com/drizzle-team/drizzle-orm-docs/pull/336
export const usersRelations = relations(users, ({one}) => ({
  profileInfo: one(profileInfo, {
    fields: [users.id],
    references: [profileInfo.userId],
  }),
}))

export const profileInfoRelations = relations(profileInfo, ({one}) => ({
  user: one(users, {
    fields: [profileInfo.userId],
    references: [users.id],
  }),
}))
