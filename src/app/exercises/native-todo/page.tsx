//import pool from '@/db/db-native-vercel'
import {getTodos} from './actions'
import Todos from './todos-view'

export const fetchCache = 'force-no-store'
const Page = async () => {
  const todos = await getTodos()
  return (
    <div className="mx-auto max-w-4xl p-6 text-lg">
      <h1 className="mb-4 text-center text-3xl font-bold">Todo</h1>
      <Todos todos={todos ?? []} />
    </div>
  )
}

export default Page
