#!/usr/bin/env node

import {drizzle} from 'drizzle-orm/node-postgres'
import pg from 'pg'
import {sql} from 'drizzle-orm'
import initDotEnv from './env'

initDotEnv()

const checkConnexion = async () => {
  if (!process.env.POSTGRES_NEXT_COURSE_URL_LOCAL) {
    throw new Error('POSTGRES_NEXT_COURSE_URL is not defined')
  }
  const client = new pg.Client({
    connectionString: process.env.POSTGRES_NEXT_COURSE_URL_LOCAL,
  })

  console.log('⏳ Checking connexion ...')
  console.log(`🗄️  URL : ${process.env.POSTGRES_NEXT_COURSE_URL_LOCAL}`)

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
