#!/usr/bin/env node

import pg from 'pg'

// 🐶 importe 'initDotEnv' la fonction d'initialisation des varialbes d'environement
//import initDotEnv from './env'

// 🐶 Execute la fonction
//initDotEnv()

const seed = async () => {
  if (!process.env.POSTGRES_URL) {
    throw new Error('POSTGRES_URL is not defined')
  }
  const client = new pg.Client({
    connectionString: process.env.POSTGRES_URL,
  })

  console.log('⏳ Checking connexion ...')
  console.log(`🗄️  URL : ${process.env.POSTGRES_URL}`)

  await client.connect()

  const start = Date.now()

  // ⛏️ Suprime cette requête et remplace la par une requête d'insertion des données. (db/scripts/sql/seed.sql)
  await client.query(` SELECT 1`)

  const end = Date.now()

  console.log('✅ Data inserted in', end - start, 'ms')

  process.exit(0)
}

export default seed

try {
  await seed()
} catch (error) {
  console.error('❌ Connexion failed')
  console.error(error)
  process.exit(1)
}
