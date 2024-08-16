#!/usr/bin/env node

import * as dotenv from 'dotenv'

import {drizzle} from 'drizzle-orm/node-postgres'
import pg from 'pg'
import {sql} from 'drizzle-orm'

dotenv.config()

const checkConnexion = async () => {
  if (!process.env.POSTGRES_NEXT_COURSE_URL) {
    throw new Error('POSTGRES_NEXT_COURSE_URL is not defined')
  }
  const client = new pg.Client({
    connectionString: process.env.POSTGRES_NEXT_COURSE_URL,
  })

  console.log('⏳ Checking connexion ...')
  console.log(`🗄️  URL : ${process.env.POSTGRES_NEXT_COURSE_URL}`)

  await client.connect()
  const db = drizzle(client)

  const start = Date.now()
  await db.execute(sql`SELECT 1`)

  const end = Date.now()

  console.log('✅ Connexion checked in', end - start, 'ms')

  process.exit(0)
}

export default checkConnexion

try {
  await checkConnexion()
} catch (error) {
  console.error('❌ Connexion failed')
  console.error(error)
  process.exit(1)
}
