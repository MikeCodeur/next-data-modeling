import {
  date,
  pgTable,
  serial,
  varchar,
  boolean,
  timestamp,
} from 'drizzle-orm/pg-core'

export const todos = pgTable('todo', {
  id: serial('id').primaryKey(),
  title: varchar('title', {length: 256}),
  isCompleted: boolean('iscompleted'),
  updatedAt: date('updatedat'),
  createdAt: timestamp('createdat'),
})
export type Todo = typeof todos.$inferSelect // return type when queried
export type AddTodo = Partial<Pick<Todo, 'id'>> & Omit<Todo, 'id'>
