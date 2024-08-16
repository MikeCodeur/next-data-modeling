#!/usr/bin/env node

import * as dotenv from 'dotenv'

import {drizzle} from 'drizzle-orm/node-postgres'
import pg from 'pg'
import {sql} from 'drizzle-orm'

import fs from 'node:fs'
import path from 'node:path'

export const readSQLFile = (filePath: string): string => {
  try {
    const absolutePath = path.resolve(filePath)
    const fileContent = fs.readFileSync(absolutePath, 'utf8')
    return fileContent
  } catch (error) {
    console.error('Error reading the SQL file:', error)
    throw error
  }
}

dotenv.config()

const runClean = async () => {
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

  const SQLContent = fs
    .readFileSync('./src/db/scripts/seed.sql', 'utf8')
    .replaceAll(/[\n\r]+/g, ' ') // Remplace les retours à la ligne par un espace
    .trim() // Enlève les espaces blancs en début et fin de fichier
  // console.log('SQLContent', SQLContent)
  // Drop tables
  //await db.execute(sql`${SQLContent.trim()}`)

  const queries = SQLContent.split(';').filter((query) => query.trim() !== '')
  for (const query of queries) {
    console.log('execute', query)
    //await db.execute(sql`${query}`)
  }
  await db.execute(sql`

 

   
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


INSERT INTO Category (name) VALUES
('Electronics'),
('Books'),
('Clothing'),
('Home Appliances'),
('Sports Equipment');

INSERT INTO Product (title, price, description, image, category_id, quantity, createdat, updatedat) VALUES
('Product 1', 19.99, 'Description for Product 1', 'image1.png', 1, 10, '2024-01-01 10:00:00', '2024-01-01 10:00:00'),
('Product 2', 29.99, 'Description for Product 2', 'image2.png', 1, 20, '2024-01-02 11:00:00', '2024-01-02 11:00:00'),
('Product 3', 39.99, 'Description for Product 3', 'image3.png', 2, 30, '2024-01-03 12:00:00', '2024-01-03 12:00:00'),
('Product 4', 49.99, 'Description for Product 4', 'image4.png', 2, 40, '2024-01-04 13:00:00', '2024-01-04 13:00:00'),
('Product 5', 59.99, 'Description for Product 5', 'image5.png', 3, 50, '2024-01-05 14:00:00', '2024-01-05 14:00:00'),
('Product 6', 69.99, 'Description for Product 6', 'image6.png', 3, 60, '2024-01-06 15:00:00', '2024-01-06 15:00:00'),
('Product 7', 79.99, 'Description for Product 7', 'image7.png', 4, 70, '2024-01-07 16:00:00', '2024-01-07 16:00:00'),
('Product 8', 89.99, 'Description for Product 8', 'image8.png', 4, 80, '2024-01-08 17:00:00', '2024-01-08 17:00:00'),
('Product 9', 99.99, 'Description for Product 9', 'image9.png', 5, 90, '2024-01-09 18:00:00', '2024-01-09 18:00:00'),
('Product 10', 109.99, 'Description for Product 10', 'image10.png', 5, 100, '2024-01-10 19:00:00', '2024-01-10 19:00:00');

-- Insérer des utilisateurs
INSERT INTO users (name) VALUES
('Alice'),
('Bob'),
('Blocked');

-- Récupérer les IDs des utilisateurs nouvellement créés
WITH user_ids AS (
  SELECT id FROM users WHERE name IN ('Alice', 'Bob', 'Blocked')
)

-- Insérer des informations de profil pour chaque utilisateur
INSERT INTO profile_info (user_id, metadata) VALUES
((SELECT id FROM users WHERE name = 'Alice'), '{"age": 25, "city": "New York"}'),
((SELECT id FROM users WHERE name = 'Bob'), '{"age": 30, "city": "San Francisco"}');

INSERT INTO groups (name) VALUES
('Admin'),
('User');

-- Établir les relations entre les utilisateurs et les groupes
INSERT INTO users_to_groups (user_id, group_id) VALUES
((SELECT id FROM users WHERE name = 'Alice'), (SELECT id FROM groups WHERE name = 'Admin')),
((SELECT id FROM users WHERE name = 'Alice'), (SELECT id FROM groups WHERE name = 'User')),
((SELECT id FROM users WHERE name = 'Bob'), (SELECT id FROM groups WHERE name = 'User'));


-- Insérer des comptes liés aux utilisateurs


INSERT INTO accounts (user_id, balance, blocked) VALUES
((SELECT id FROM users WHERE name = 'Alice'), 10000.00, false),
((SELECT id FROM users WHERE name = 'Bob'), 15000.00, false),
((SELECT id FROM users WHERE name = 'Blocked'), 15000.00, true);



      `)

  const end = Date.now()

  console.log('✅ Clean completed in', end - start, 'ms')

  process.exit(0)
}

try {
  await runClean()
} catch (error) {
  console.error('❌ Clean failed')
  console.error(error)
  process.exit(1)
}
