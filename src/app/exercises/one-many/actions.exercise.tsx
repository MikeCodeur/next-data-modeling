'use server'

import db from '@/db/schema'

export async function getCategories() {
  const resultQuery = await db.query.categories.findMany({
    orderBy: (categories, {asc}) => [asc(categories.id)],
  })
  return resultQuery
}
// 🐶 Utilise les relations pour récupérer
// - Les categories avec les produits (contenant eux même les catégories de produit)
export async function getCategoriesByIdWithProducts(catId: number) {
  const resultQuery = await db.query.categories.findFirst({
    // 🐶 Utilise `with` pour récupérer les produits
    // 🐶 - Utilise `with` (imbriqué) pour récupérer les catégories
    where: catId ? (categories, {eq}) => eq(categories.id, catId) : undefined,
    orderBy: (categories, {asc}) => [asc(categories.id)],
  })

  return resultQuery
}
