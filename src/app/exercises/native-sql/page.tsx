import pool from '@/db/db-native-vercel'
import {Todo} from '@/lib/type'

export default async function Todos() {
  const {rows} = await pool.sql<Todo>`SELECT * from TODO `

  return (
    <div>
      {rows.map((row) => (
        <div key={row.id}>
          {row.id} - {row.title}
        </div>
      ))}
    </div>
  )
}
