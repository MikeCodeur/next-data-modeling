import {createPool} from '@vercel/postgres'
import {drizzle as drizzleVercel} from 'drizzle-orm/vercel-postgres'
import * as todos from './todos'
import * as products from '@/db/models/products'
import * as categories from '@/db/models/categories'
import * as users from '@/db/models/users'
import {Pool} from 'pg'
import {drizzle} from 'drizzle-orm/node-postgres'

const pool = new Pool({
  connectionString: process.env.POSTGRES_NEXT_COURSE_URL_LOCAL,
})
const poolVercel = createPool({
  connectionString: process.env.POSTGRES_NEXT_COURSE_URL_LOCAL,
})

const dbVercel = drizzle(pool, {
  schema: {...todos, ...products, ...categories, ...users},
})
const dbPg = drizzleVercel(poolVercel, {
  schema: {...todos, ...products, ...categories, ...users},
})

const isVercel = true
const db = isVercel ? dbVercel : dbPg
export default db
