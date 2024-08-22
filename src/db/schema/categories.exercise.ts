import {pgTable, serial, text} from 'drizzle-orm/pg-core'
import {relations} from 'drizzle-orm'
import {products} from './products'

export const categories = pgTable('category', {
  id: serial('id').primaryKey(),
  name: text('name'),
})

// 🐶 créé la relation 'categoriesRelations' de type 'many'
// puisque 1 categorie est associé à N produits
// 📑 https://orm.drizzle.team/docs/rqb#one-to-many
// 🤖 export const categoriesRelations = relations ...

export type Category = typeof categories.$inferSelect // return type when queried
