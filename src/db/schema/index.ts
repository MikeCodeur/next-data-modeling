import {createPool} from '@vercel/postgres'
import {drizzle as drizzleVercel} from 'drizzle-orm/vercel-postgres'
import * as todos from './todos'
import {Pool} from 'pg'
import {drizzle} from 'drizzle-orm/node-postgres'

const pool = new Pool({
  connectionString: process.env.POSTGRES_NEXT_COURSE_URL,
})
const poolVercel = createPool({
  connectionString: process.env.POSTGRES_NEXT_COURSE_URL,
})

const dbVercel = drizzle(pool, {schema: {...todos}})
const dbPg = drizzleVercel(poolVercel, {schema: {...todos}})

const isVercel = true
const db = isVercel ? dbVercel : dbPg
export default db
