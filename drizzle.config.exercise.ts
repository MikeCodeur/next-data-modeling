import {defineConfig} from 'drizzle-kit'
// 🐶 Initialise les variables d'environement `.env`
// 🤖 import initDotEnv from './src/db/scripts/env'

// 🤖 initDotEnv()

export default defineConfig({
  // 🐶 Spécifie le dossier contenant les schemas
  // 🤖 schema: './src/db/schema/*',

  // 🐶 Spécifie le dossier de sortie des script générés
  // ps : Pense à ajouter dans `.gitignore`
  // 🤖 out: './drizzle/migrations',

  // 🐶 Spécifie le dialect
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.POSTGRES_URL as string,
  },
  verbose: true,
  strict: true,
  introspect: {
    casing: 'camel',
  },
})
