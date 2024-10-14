'use server'

// ⛏️ Supprime ces types `deprecated`
import {AddTodo, Todo} from '@/lib/type'
// 🐶 Utilise les types venant du schéma `Todo`
// 🤖 import {AddTodo, Todo, todos} from '@/db/schema/todos'
import {revalidatePath} from 'next/cache'

// 🐶 Importe `db` de `drizzle`, car nous allons migrer sous `dirzzle`
// 🤖 import db from '@/db/schema'

// 🐶 Nous gardons le `pool` pour le moment mais il ne sera plus utile
import {createPool} from '@vercel/postgres'

const pool = createPool({
  connectionString: process.env.POSTGRES_URL,
})

// 🐶 Nous allons migrer cette fonction sous `drizzle`
export async function getTodos(): Promise<Todo[]> {
  //⛏️ Supprime ce code
  const {rows} = await pool.sql<Todo>`SELECT id, 
      title, 
      iscompleted AS "isCompleted", 
      createdat AS "createdAt", 
      updatedat AS "updatedAt" from TODO order by createdAt asc limit 100`
  return rows

  // 🐶 Fais un `SELECT FROM` en utilisant `Drizzle`
  // 📑 doc : https://orm.drizzle.team/docs/select
  // 🤖 const result = await db.select ...

  // 🐶 Pense à trier par `id` descendant
  // 📑 doc :https://orm.drizzle.team/docs/select#order-by
}

//1. 🚀 Insérer des données
export async function addTodoDao(todo: AddTodo): Promise<void> {
  // 📑 Le lien vers la doc : https://orm.drizzle.team/docs/insert
  const {title, isCompleted} = todo
  await pool.sql`
    INSERT INTO Todo (title, isCompleted, createdAt, updatedAt)
    VALUES (${title}, ${isCompleted}, NOW(), NOW())
  `
}

//2. 🚀 Mettre à jour les données
export async function updateTodoDao(todo: Todo): Promise<void> {
  // 📑 Le lien vers la doc : https://orm.drizzle.team/docs/update
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
    revalidatePath('/exercises/drizzle-todo')
  }
}

export const updateTodo = async (todo: Todo) => {
  try {
    await updateTodoDao(todo)
  } catch (error) {
    console.error('Failed to update todo', error)
    throw error
  } finally {
    revalidatePath('/exercises/drizzle-todo')
  }
}
