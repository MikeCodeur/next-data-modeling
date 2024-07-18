'use server'

import {
  addTodo as addTodoDao,
  updateTodo as updateTodoDao,
} from '@/db/db-native-vercel'
import {AddTodo, Todo} from '@/lib/type'
import {revalidatePath} from 'next/cache'

export const addTodo = async (todo: AddTodo) => {
  console.log('add todo action', todo)
  try {
    await addTodoDao(todo)
  } catch (error) {
    console.error('Failed to add todo', error)
    throw error
  } finally {
    revalidatePath('/exercises/native-sql/todos')
  }
}

export const updateTodo = async (todo: Todo) => {
  try {
    await updateTodoDao(todo)
  } catch (error) {
    console.error('Failed to update todo', error)
    throw error
  } finally {
    revalidatePath('/exercises/native-sql/todos')
  }
}
