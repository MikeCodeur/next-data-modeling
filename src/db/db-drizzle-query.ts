/* eslint-disable @typescript-eslint/no-shadow */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {asc, eq} from 'drizzle-orm'
import db from './models'
import {AddTodo, Todo, todos} from '@/db/models/todos'

export async function getTodos(): Promise<Todo[]> {
  const resultQuery = await db.query.todos.findMany({
    // with: {
    //   posts: true,
    // },
    orderBy: (todos, {asc}) => [asc(todos.id)],
  })

  return resultQuery
}

export async function getTodosById(id: string): Promise<Todo[]> {
  const result = await db
    .select()
    .from(todos)
    .where(eq(todos.id, Number(id)))
  return result
}

export async function addTodo(todo: AddTodo): Promise<Todo> {
  const rows = await db.insert(todos).values(todo).returning()
  return rows[0]
}

export async function updateTodo(todo: Todo): Promise<Todo> {
  const rows = await db
    .update(todos)
    .set(todo)
    .where(eq(todos.id, todo.id))
    .returning()
  return rows[0]
}

//PRODUCT
export async function getProductWithCategory() {
  const resultQuery = await db.query.products.findMany({
    with: {
      category: true,
    },
    orderBy: (products, {asc}) => [asc(products.id)],
  })

  return resultQuery
}

export async function getCategoriesWithProducts() {
  const resultQuery = await db.query.categories.findMany({
    with: {
      products: true,
    },
    orderBy: (categories, {asc}) => [asc(categories.id)],
  })

  return resultQuery
}

export async function getUserWithProfiles(name?: string) {
  const resultQuery = await db.query.users.findFirst({
    // with: {
    //   profileInfo: true,
    // },
    where: name ? (users, {eq}) => eq(users.name, name) : undefined,
    orderBy: (users, {asc}) => [asc(users.id)],
  })

  return resultQuery
}

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

  // const groupsWithUsers = resultQuery.map((group) => ({
  //   ...group,
  //   users: group.usersToGroups.map((userToGroup) => userToGroup.user),
  // }))

  return resultQuery
}

export async function getUsersByGroup(groupName: string) {
  const resultQuery = await db.query.groups.findMany({
    with: {
      usersToGroups: {
        with: {
          user: true,
        },
      },
    },
    where: (groups, {eq}) => eq(groups.name, groupName),
  })

  const usersByGroup = resultQuery.flatMap((group) =>
    group.usersToGroups.map((userToGroup) => userToGroup.user)
  )

  return usersByGroup
}
