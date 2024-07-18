// eslint-disable-next-line @typescript-eslint/no-unused-vars
import pool, {getTodosById} from '@/db/db-native-vercel'
import {Todo} from '@/lib/type'
import TodoItem from '../todos/todo-item'

export const dynamic = 'force-dynamic'
//invalidate cache : @vercel/postgres
export const fetchCache = 'force-no-store'

export default async function Page({params}: {params: {id: string}}) {
  const {rows} = await pool.sql<Todo>`SELECT id, 
      title, 
      iscompleted AS "isCompleted", 
      createdat AS "createdAt", 
      updatedat AS "updatedAt" from TODO where id=${params.id}`
  //const rows = await getTodosById(params.id)
  console.log('Page todo', rows)
  return (
    <div className="mx-auto max-w-4xl p-6 text-lg">
      <h1 className="mb-4 text-center text-3xl font-bold">
        Todo {rows[0].title}
      </h1>
      {rows.map((todo) => (
        <div key={todo.id}>
          <TodoItem key={todo.id} todo={todo} />
        </div>
      ))}
    </div>
  )
}
