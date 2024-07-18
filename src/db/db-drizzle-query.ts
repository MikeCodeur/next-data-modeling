// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {asc, eq} from 'drizzle-orm'
import db from './schema'
import {AddTodo, Todo, todos} from '@/db/schema/todos'

export async function getTodos(): Promise<Todo[]> {
  const resultQuery = await db.query.todos.findMany({
    // with: {
    //   posts: true,
    // },
    // eslint-disable-next-line @typescript-eslint/no-shadow
    orderBy: (todos, {asc}) => [asc(todos.id)],
  })

  return resultQuery
}

export async function getTodosById(id: string): Promise<Todo[]> {
  const result = await db
    .select()
    .from(todos)
    .where(eq(todos.id, Number(id)))
  return result
}

export async function addTodo(todo: AddTodo): Promise<Todo> {
  const rows = await db.insert(todos).values(todo).returning()
  return rows[0]
}

export async function updateTodo(todo: Todo): Promise<Todo> {
  const rows = await db
    .update(todos)
    .set(todo)
    .where(eq(todos.id, todo.id))
    .returning()
  return rows[0]
}