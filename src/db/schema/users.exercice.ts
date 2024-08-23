import {
  integer,
  jsonb,
  pgTable,
  serial,
  text,
  varchar,
} from 'drizzle-orm/pg-core'
import {relations} from 'drizzle-orm'

export const groups = pgTable('groups', {
  id: serial('id').primaryKey(),
  name: text('name'),
})

// 🐶 Creer la table 'users_to_groups' avec 'userId','groupId'
// 🤖 export const usersToGroups = pgTable(...
// Pense a ajouter les FK (references)
// Pense a ajouter une primaryKey qui les la colonne userId et groupId
// 🤖
// (t) => ({
//   pk: primaryKey({columns: [t.userId, t.groupId]}),
// })

// 🐶 Créé la relation 'groupsRelations' (many)
// 🤖 export const groupsRelations = relations(groups, ({many}) => ({

// 🐶 Créé la relation 'usersToGroupsRelations' (one)
// 🤖
// group: one(groups, {
//   fields: [usersToGroups.groupId],
//   references: [groups.id],
// }),
// user: one(users, {
//   fields: [usersToGroups.userId],
//   references: [users.id],
// }),

// 🐶 pense à editer 'usersRelations' plus bas

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

export const usersRelations = relations(users, ({one}) => ({
  profileInfo: one(profileInfo, {
    fields: [users.id],
    references: [profileInfo.userId],
  }),
  // 🐶 Ajoute la relation vers 'usersToGroups' de type 'many'
}))

export const profileInfoRelations = relations(profileInfo, ({one}) => ({
  user: one(users, {
    fields: [profileInfo.userId],
    references: [users.id],
  }),
}))
