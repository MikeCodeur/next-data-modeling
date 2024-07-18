import pool from '@/db/db-native-vercel'
import Todos from './todos-view'
import {Todo} from '@/lib/type'

//export const revalidate = 0
const Page = async () => {
  const {rows} = await pool.sql<Todo>`SELECT id, 
      title, 
      iscompleted AS "isCompleted", 
      createdat AS "createdAt", 
      updatedat AS "updatedAt" from TODO order by createdAt asc limit 100`
  const todos = rows
  console.log('todos length', todos.length)
  console.log('todos', todos)
  return (
    <div className="mx-auto max-w-4xl p-6 text-lg">
      <h1 className="mb-4 text-center text-3xl font-bold">Todo</h1>
      <Todos todos={todos ?? []} />
    </div>
  )
}

export default Page
