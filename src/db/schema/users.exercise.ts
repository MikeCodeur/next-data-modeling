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
  // ⛏️ Modifie `userId` pour ajouter une référence à la table `users`
  //.references(() => users.id), permet de créer une relation entre les deux tables
  userId: integer('user_id'),
  note: varchar('note', {length: 255}),
  metadata: jsonb('metadata'),
})

// 🐶 Crée la relation `usersRelations` entre `user` et `profileInfo`
const usersRelations = relations(users, ({one}) => ({
  // profileInfo: one(profileInfo, {
  //   fields: [users.id],
  //   references: [profileInfo.userId],
  // }),
}))

// 🐶 Crée la relation `profileInfoRelations` entre `profileInfo` et `user`
const profileInfoRelations = relations(profileInfo, ({one}) => ({
  // user: one(users, {
  //   fields: [profileInfo.userId],
  //   references: [users.id],
  // }),
}))

// 🐶 Pourquoi nous devons référencer dans les 2 sens ?
//https://github.com/drizzle-team/drizzle-orm-docs/issues/335
//https://github.com/drizzle-team/drizzle-orm-docs/pull/336
