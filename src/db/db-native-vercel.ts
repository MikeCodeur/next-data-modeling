import {AddTodo, Todo} from '@/lib/type'
import {createPool} from '@vercel/postgres'

const pool = createPool({
  connectionString: process.env.POSTGRES_NEXT_COURSE_URL,
})
export default pool

export async function getTodos(): Promise<Todo[]> {
  const {rows} = await pool.sql<Todo>`SELECT id, 
      title, 
      iscompleted AS "isCompleted", 
      createdat AS "createdAt", 
      updatedat AS "updatedAt" from TODO order by createdAt asc limit 100`
  return rows
}

export async function getTodosById(id: string): Promise<Todo[]> {
  const {rows} = await pool.sql<Todo>`SELECT id, 
      title, 
      iscompleted AS "isCompleted", 
      createdat AS "createdAt", 
      updatedat AS "updatedAt" from TODO where id=${id}`
  return rows
}
export async function addTodo(todo: AddTodo): Promise<void> {
  const {title, isCompleted} = todo
  await pool.sql`
    INSERT INTO Todo (title, isCompleted, createdAt, updatedAt)
    VALUES (${title}, ${isCompleted}, NOW(), NOW())
  `
}

export async function updateTodo(todo: Todo): Promise<void> {
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
