import {
  date,
  pgTable,
  serial,
  varchar,
  real,
  text,
  integer,
} from 'drizzle-orm/pg-core'

import {categories, Category} from './categories'
import {relations} from 'drizzle-orm'

// 🐶 adapte product pour prendre en compte la clef etrangère lié à la category
export const products = pgTable('product', {
  id: serial('id').primaryKey(),
  title: varchar('title', {length: 256}),
  price: real('price'),
  description: text('description'),
  image: varchar('image', {length: 256}),
  // 🐶 Ajoute la FK category
  // 📑 https://orm.drizzle.team/docs/rqb#foreign-keys
  category: integer('category_id'),
  quantity: integer('quantity'),
  createdAt: date('createdat'),
  updatedAt: date('updatedat'),
})

// 🐶 créé la relation 'productsRelations' de type 'one'
// puisque 1 produit est associé à 1 catégorie
// 📑 https://orm.drizzle.team/docs/rqb#one-to-many
// 🤖 export const productsRelations = relations ...

// export const productsRelations = relations(products, ({one}) => ({
//   category: one(categories, {
//     fields: [products.category],
//     references: [categories.id],
//   }),
// }))

export type Product = typeof products.$inferSelect // return type when queried
export type InsertProduct = typeof products.$inferInsert // return type when queried

// 🐶 Definis 'ProductWithCategory' un type qui contient 'Produit' et 'Category'
// export type ProductWithCategory = Product & {
//   category: Category | null | number
// }
