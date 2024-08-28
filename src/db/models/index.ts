import {createPool} from '@vercel/postgres'
import {drizzle as drizzleVercel} from 'drizzle-orm/vercel-postgres'
import {drizzle} from 'drizzle-orm/node-postgres'
import * as todos from './todos'
import * as products from '@/db/models/products'
import * as categories from '@/db/models/categories'
import * as users from '@/db/models/users'
import * as accounts from '@/db/models/accounts'
import {Pool} from 'pg'

import {DefaultLogger, LogWriter} from 'drizzle-orm/logger'

class MyLogWriter implements LogWriter {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  write(message: string) {
    // Write to file, stdout, etc.
    //console.log('logger', message)
  }
}
const logger = new DefaultLogger({writer: new MyLogWriter()})

const pool = new Pool({
  connectionString: process.env.POSTGRES_NEXT_COURSE_URL_LOCAL,
})
const poolVercel = createPool({
  connectionString: process.env.POSTGRES_NEXT_COURSE_URL,
})

const dbPg = drizzle(pool, {
  schema: {...todos, ...products, ...categories, ...users, ...accounts},
  logger,
})
const dbVercel = drizzleVercel(poolVercel, {
  schema: {...todos, ...products, ...categories, ...users, ...accounts},
})

const isVercel = false
const db = dbVercel //isVercel ? dbVercel : dbPg
export default db
