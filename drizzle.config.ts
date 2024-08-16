import * as dotenv from 'dotenv'

import {defineConfig} from 'drizzle-kit'

dotenv.config()
export default defineConfig({
  schema: './src/db/models/*',
  out: './drizzle/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.POSTGRES_NEXT_COURSE_URL as string,
  },
  verbose: true,
  strict: true,
  introspect: {
    casing: 'camel',
  },
})
