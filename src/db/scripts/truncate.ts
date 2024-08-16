#!/usr/bin/env node

import * as dotenv from 'dotenv'

import {drizzle} from 'drizzle-orm/node-postgres'
import pg from 'pg'
import {sql} from 'drizzle-orm'

dotenv.config()

const runTruncate = async () => {
  if (!process.env.POSTGRES_NEXT_COURSE_URL) {
    throw new Error('POSTGRES_NEXT_COURSE_URL is not defined')
  }

  const client = new pg.Client({
    connectionString: process.env.POSTGRES_NEXT_COURSE_URL,
  })

  await client.connect()
  const db = drizzle(client)

  console.log('⏳ Running cleanning...')

  const start = Date.now()

  try {
    // Désactiver temporairement les contraintes de clé étrangère
    await db.execute(sql`SET session_replication_role = 'replica';`)

    // Troncature des tables
    await db.execute(sql`TRUNCATE TABLE users_to_groups;`)
    await db.execute(sql`TRUNCATE TABLE profile_info;`)
    await db.execute(sql`TRUNCATE TABLE accounts;`)
    await db.execute(sql`TRUNCATE TABLE products;`)
    await db.execute(sql`TRUNCATE TABLE categories;`)
    await db.execute(sql`TRUNCATE TABLE todos;`)
    await db.execute(sql`TRUNCATE TABLE users;`)
    await db.execute(sql`TRUNCATE TABLE groups;`)

    // Réactiver les contraintes de clé étrangère
    await db.execute(sql`SET session_replication_role = 'origin';`)

    console.log('Tables truncated successfully')
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`Failed to truncate tables: ${error.message}`)
    } else {
      console.error('Failed to truncate tables: Unknown error')
    }
    throw error
  }
  const end = Date.now()

  console.log('✅ Clean completed in', end - start, 'ms')

  process.exit(0)
}

try {
  await runTruncate()
} catch (error) {
  console.error('❌ Clean failed')
  console.error(error)
  process.exit(1)
}
