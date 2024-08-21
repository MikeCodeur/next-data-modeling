#!/usr/bin/env node

import pg from 'pg'
import initDotEnv from './env'

initDotEnv()

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

  await client.query(` 
  INSERT INTO Todo (title, isCompleted, createdAt, updatedAt) VALUES
  ('Learn TypeScript', false, '2024-01-01 10:00:00', '2024-01-01 10:00:00'),
  ('Build a Next.js App', false, '2024-01-02 11:00:00', '2024-01-02 11:00:00'),
  ('Write a Blog Post', true, '2024-01-03 09:00:00', '2024-01-03 09:00:00'),
  ('Create a YouTube Video', false, '2024-01-04 14:00:00', '2024-01-04 14:00:00'),
  ('Read a Technical Book', true, '2024-01-05 08:00:00', '2024-01-05 08:00:00'),
  ('Update Portfolio', false, '2024-01-06 15:00:00', '2024-01-06 15:00:00'),
  ('Attend a Webinar', true, '2024-01-07 12:00:00', '2024-01-07 12:00:00'),
  ('Practice Coding Challenges', false, '2024-01-08 17:00:00', '2024-01-08 17:00:00'),
  ('Network with Peers', false, '2024-01-09 13:00:00', '2024-01-09 13:00:00'),
  ('Plan Next Month’s Goals', true, '2024-01-10 18:00:00', '2024-01-10 18:00:00');

    `)

  await client.query(` 
      INSERT INTO users (name) VALUES
      ('Alice'),
      ('Bob'),
      ('Blocked');

      INSERT INTO profile_info (user_id, note, metadata) VALUES
((SELECT id FROM users WHERE name = 'Alice'),'Note Alice', '{"age": 25, "city": "New York"}'),
((SELECT id FROM users WHERE name = 'Bob'), 'Note Bob', '{"age": 30, "city": "San Francisco"}');
    
        `)

  const end = Date.now()

  console.log('✅ Connexion checked in', end - start, 'ms')

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
