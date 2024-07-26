import {getTodos} from '@/db/db-drizzle-query'

export default async function Todos() {
  const rows = await getTodos()

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
