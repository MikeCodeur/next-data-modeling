// 🐶 Modelise 'Todo' grace à Drizzle
import {pgTable, serial, varchar, boolean, timestamp} from 'drizzle-orm/pg-core'

export const todos = pgTable('todo', {
  id: serial('id').primaryKey(),

  // 🐶 Utilise 'varchar' pour créer la colonnes 'title'

  // 🐶 Utilise 'boolean' pour créer la colonnes 'iscompleted'

  // 🐶 Utilise 'timestamp' pour créer les colonnes 'updatedAt' 'createdat'

  // defaultNow() permet de définir la valeur par défaut de la colonne
})
// 🐶 exporte  les type 'Todo' et 'AddTodo'

// 🤖 export type Todo = typeof todos.$inferSelect // return type when queried
// 🤖 export type AddTodo = typeof todos.$inferInsert // input type when inserting
