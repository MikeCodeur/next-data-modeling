import Todos from './todos-view'
import {getTodos} from '@/db/db-drizzle-query'

//export const revalidate = 0
const Page = async () => {
  const todos = await getTodos()
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
