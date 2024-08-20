'use server'

import {AddTodo, Todo} from '@/lib/type'
import {revalidatePath} from 'next/cache'
import {createPool} from '@vercel/postgres'

const pool = createPool({
  connectionString: process.env.POSTGRES_URL,
})

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

export async function getTodos(): Promise<Todo[]> {
  const {rows} = await pool.sql<Todo>`SELECT id, 
      title, 
      iscompleted AS "isCompleted", 
      createdat AS "createdAt", 
      updatedat AS "updatedAt" from TODO order by createdAt asc limit 100`
  return rows
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
