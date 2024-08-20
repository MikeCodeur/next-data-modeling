import {Todo} from '@/lib/type'
import {Pool} from 'pg'

async function getTodos() {
  const pool = new Pool({
    connectionString:
      // 🐶 Remplace les informations de connexion par celles de ton compte Local
      'postgres://postgres:admin@192.168.68.100:5432/postgres?sslmode=disable',
  })

  const {rows} = await pool.query<Todo>(`SELECT id,
         title,
         iscompleted AS "isCompleted",
         createdat AS "createdAt",
         updatedat AS "updatedAt" from Todo `)

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
