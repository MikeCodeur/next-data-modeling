import {Todo} from '@/lib/type'
import {createPool} from '@vercel/postgres'

const pool = createPool({
  connectionString:
    // 🐶 Remplace les informations de connexion par celles de ton compte Vercel
    'postgres://default:27GtXRLmyOCW@ep-still-meadow-a14b6hj3-pooler.ap-southeast-1.aws.neon.tech:5432/verceldb?sslmode=require',
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
