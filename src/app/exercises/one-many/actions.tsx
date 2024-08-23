'use server'

import db from '@/db/schema'

export async function getCategories() {
  const resultQuery = await db.query.categories.findMany({
    orderBy: (categories, {asc}) => [asc(categories.id)],
  })
  return resultQuery
}

export async function getCategoriesByIdWithProducts(catId: number) {
  const resultQuery = await db.query.categories.findFirst({
    with: {
      products: {
        with: {
          category: true,
        },
      },
    },
    where: catId ? (categories, {eq}) => eq(categories.id, catId) : undefined,
    orderBy: (categories, {asc}) => [asc(categories.id)],
  })

  return resultQuery
}
