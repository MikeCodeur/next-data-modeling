'use server'

import {AddTodo, Todo} from '@/lib/type'
import {revalidatePath} from 'next/cache'
// 🐶 Importe createPool
// 🤖 import {createPool} from '@vercel/postgres'

// 🐶 Crée une instance de pool
// 🤖 const pool = createPool ...

export const addTodo = async (todo: AddTodo) => {
  console.log('add todo action', todo)
  try {
    // 🐶 va dans 'addTodoDao' pour implementer la fonction
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
    // 🐶 va dans 'updateTodoDao' pour implementer la fonction
    await updateTodoDao(todo)
  } catch (error) {
    console.error('Failed to update todo', error)
    throw error
  } finally {
    revalidatePath('/exercises/native-todo')
  }
}

export async function addTodoDao(todo: AddTodo): Promise<void> {
  console.log('addTodoDao', todo)
  // 🐶 Implemente la fonction
  //
  /* La requete SQL
    INSERT INTO Todo (title, isCompleted, createdAt, updatedAt) VALUES ('Un Todo', false, NOW(), NOW())
  */

  // 🐶 utilise 'pool.sql' pour executer la requete
  // 🤖 await pool.sql`...`
}

export async function updateTodoDao(todo: Todo): Promise<void> {
  console.log('updateTodoDao', todo)
  // 🐶 Implemente la fonction
  //
  /* La requete SQL
   UPDATE Todo
    SET
      title = 'Todo updated',
      isCompleted = true,
      updatedAt = NOW()
    WHERE id = 10
  */

  // 🐶 utilise 'pool.sql' pour executer la requete
  // 🤖 await pool.sql`...`
}

export async function getTodos(): Promise<Todo[]> {
  // ⛏️ Supprime ces fausses données
  return [
    {
      id: 1,
      title: 'Fake',
      isCompleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]
  // 🐶 Implemente la fonction

  /* La requete SQL
  SELECT id,
  title,
  iscompleted AS "isCompleted",
  createdat AS "createdAt",
  updatedat AS "updatedAt" from TODO order by createdAt asc limit 100`
  */
}
