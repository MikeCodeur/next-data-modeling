import {Todo} from '@/lib/type'
import {createPool} from '@vercel/postgres'

export const revalidate = 0

const pool = createPool({
  connectionString:
    // 🐶 Remplace les informations de connexion par celles de ton compte `Vercel`
    process.env.POSTGRES_URL,
})

async function getTodos() {
  const {rows} = await pool.sql<Todo>`SELECT id,
         title,
         iscompleted AS "isCompleted",
         createdat AS "createdAt",
         updatedat AS "updatedAt" from Todo `
  return rows
}

export default async function Page() {
  const rows = await getTodos()

  return (
    <div className="mx-auto max-w-2xl p-6 text-lg">
      <h1 className="mb-4 text-center text-3xl font-bold">Todo List</h1>
      {rows.map((todo) => (
        <div key={todo.id}>
          <input
            type="checkbox"
            id={todo.id.toString()}
            name={todo.title}
            defaultChecked={todo.isCompleted}
          ></input>
          <label htmlFor={todo.id.toString()}>{todo.title}</label>
        </div>
      ))}
    </div>
  )
}
