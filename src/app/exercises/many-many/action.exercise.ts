import {revalidatePath} from 'next/cache'
import {asc, eq} from 'drizzle-orm'
import db from '@/db/schema'

export async function getUsersWithGroups() {
  const resultQuery = await db.query.users.findMany({
    // 🐶 Fais en sorte de récupérer les groupes avec `with`
    // 🐶 Trie pas `id` asc avec `orderBy`
  })

  return resultQuery
}

export async function getGroupsWithUsers() {
  const resultQuery = await db.query.groups.findMany({
    // 🐶 Fais en sorte de récuperer les users avec `with`
    // 🐶 Trie pas `groupeId` asc avec `orderBy`
  })
  return resultQuery
}

//1. 🚀 getGroupsWithUsersFilter
export async function getGroupsWithUsersFilter(groupName: string) {
  const resultQuery = await db.query.groups.findMany({})
  return resultQuery
}
