import {revalidatePath} from 'next/cache'
import {asc, eq} from 'drizzle-orm'
import db from '@/db/schema'

export async function getUsersWithGroups() {
  const resultQuery = await db.query.users.findMany({
    with: {
      usersToGroups: {
        with: {
          group: true,
        },
      },
    },
    orderBy: (users, {asc}) => [asc(users.id)],
  })

  return resultQuery
}

export async function getGroupsWithUsers() {
  const resultQuery = await db.query.groups.findMany({
    with: {
      usersToGroups: {
        with: {
          user: true,
        },
      },
    },
    orderBy: (groups, {asc}) => [asc(groups.id)],
  })

  return resultQuery
}

export async function getGroupsWithUsersFilter(groupName: string) {
  const resultQuery = await db.query.groups.findMany({
    with: {
      usersToGroups: {
        with: {
          user: {
            with: {
              usersToGroups: {
                with: {
                  group: true,
                },
              },
            },
          },
        },
      },
    },
    where: (groups, {eq}) => eq(groups.name, groupName),
  })

  const usersByGroup = resultQuery.flatMap((group) =>
    group.usersToGroups.map((userToGroup) => userToGroup.user)
  )

  return resultQuery
}
