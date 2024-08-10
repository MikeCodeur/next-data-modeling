/* eslint-disable @typescript-eslint/no-shadow */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {asc, eq, lt, gt} from 'drizzle-orm'
import db from './models'
import {AddTodo, Todo, todos} from '@/db/models/todos'
import {InsertProduct, Product, products} from './models/products'

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

//partial field

export async function getProductTiteCategoryName() {
  const resultQuery = await db.query.products.findMany({
    columns: {
      id: true,
      title: true,
    },
    with: {
      category: {
        columns: {
          id: true,
          name: true,
        },
      },
    },
    orderBy: (products, {asc}) => [asc(products.id)],
  })

  return resultQuery
}

//filter
export async function getProductFilterName(name: string) {
  const resultQuery = await db.query.products.findMany({
    where: (products, {eq}) => eq(products.title, name),
    with: {
      category: true,
    },
  })

  return resultQuery
}
//offset
export async function getProductPagination(nbElement: number, start: number) {
  const resultQuery = await db.query.products.findMany({
    where: (products, {gt}) => gt(products.id, 1),
    limit: nbElement,
    offset: start,
    with: {
      category: true,
    },
    orderBy: (product, {asc}) => [asc(product.id)],
  })

  return resultQuery
}

//INSERT
export async function insertProduct(product: InsertProduct) {
  const rows = await db.insert(products).values(product).returning()
  return rows[0]
}
export async function insertProducts(productArray: InsertProduct[]) {
  const rows = await db.insert(products).values(productArray).returning()
  return rows
}
export async function updateProduct(product: Product): Promise<Product> {
  const rows = await db
    .update(products)
    .set(product)
    .where(eq(products.id, product.id))
    .returning()
  return rows[0]
}

export async function getProductById(id: number): Promise<Product | null> {
  const rows = await db
    .select()
    .from(products)
    .where(eq(products.id, Number(id)))
  return rows[0]
}

export async function deleteProduct(id: number) {
  const rows = await db
    .delete(products)
    .where(eq(products.id, Number(id)))
    .returning()
  return rows[0]
}
