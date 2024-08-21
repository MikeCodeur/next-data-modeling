import {createPool} from '@vercel/postgres'
import {Pool} from 'pg'
import {drizzle} from 'drizzle-orm/node-postgres'
import {drizzle as drizzleVercel} from 'drizzle-orm/vercel-postgres'

import * as todos from './todos'

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL_LOCAL,
})
const poolVercel = createPool({
  connectionString: process.env.POSTGRES_URL,
})

const dbPg = drizzle(pool, {
  schema: {...todos},
})
const dbVercel = drizzleVercel(poolVercel, {
  schema: {...todos},
})

const isVercel = true
const db = isVercel ? dbVercel : dbPg
export default db
