import {
  integer,
  jsonb,
  pgTable,
  primaryKey,
  serial,
  text,
} from 'drizzle-orm/pg-core'
import {relations} from 'drizzle-orm'
import {accounts} from './accounts'

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: text('name'),
})

export const profileInfo = pgTable('profile_info', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id),
  metadata: jsonb('metadata'),
})

//https://github.com/drizzle-team/drizzle-orm-docs/issues/335
// export const usersRelations = relations(users, ({one}) => ({
//   profileInfo: one(profileInfo),
// }))

export const usersRelations = relations(users, ({many}) => ({
  usersToGroups: many(usersToGroups),
  accounts: many(accounts),
}))
export const groups = pgTable('groups', {
  id: serial('id').primaryKey(),
  name: text('name'),
})
export const groupsRelations = relations(groups, ({many}) => ({
  usersToGroups: many(usersToGroups),
}))
export const usersToGroups = pgTable(
  'users_to_groups',
  {
    userId: integer('user_id')
      .notNull()
      .references(() => users.id),
    groupId: integer('group_id')
      .notNull()
      .references(() => groups.id),
  },
  (t) => ({
    pk: primaryKey({columns: [t.userId, t.groupId]}),
  })
)
export const usersToGroupsRelations = relations(usersToGroups, ({one}) => ({
  group: one(groups, {
    fields: [usersToGroups.groupId],
    references: [groups.id],
  }),
  user: one(users, {
    fields: [usersToGroups.userId],
    references: [users.id],
  }),
}))
