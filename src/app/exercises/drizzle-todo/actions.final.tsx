'use server'

import {AddTodo, Todo, todos} from '@/db/schema/todos.final'
import {revalidatePath} from 'next/cache'
import {createPool} from '@vercel/postgres'

import {asc, eq} from 'drizzle-orm'

import db from '@/db/schema'

const pool = createPool({
  connectionString: process.env.POSTGRES_URL,
})

export async function getTodos(): Promise<Todo[]> {
  const result = await db.select().from(todos).orderBy(asc(todos.id))
  return result
}

export async function addTodoDao(todo: AddTodo): Promise<void> {
  const {title, isCompleted} = todo
  await pool.sql`
    INSERT INTO Todo (title, isCompleted, createdAt, updatedAt)
    VALUES (${title}, ${isCompleted}, NOW(), NOW())
  `
}

export async function updateTodoDao(todo: Todo): Promise<void> {
  const {id, title, isCompleted} = todo
  await pool.sql`
    UPDATE Todo
    SET
      title = ${title},
      isCompleted = ${isCompleted},
      updatedAt = NOW()
    WHERE id = ${id}
  `
}

export const addTodo = async (todo: AddTodo) => {
  console.log('add todo action', todo)
  try {
    await addTodoDao(todo)
  } catch (error) {
    console.error('Failed to add todo', error)
    throw error
  } finally {
    revalidatePath('/exercises/native-todo')
  }
}

export const updateTodo = async (todo: Todo) => {
  try {
    await updateTodoDao(todo)
  } catch (error) {
    console.error('Failed to update todo', error)
    throw error
  } finally {
    revalidatePath('/exercises/native-todo')
  }
}
