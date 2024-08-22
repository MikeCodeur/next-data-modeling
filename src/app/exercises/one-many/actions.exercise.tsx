'use server'

import db from '@/db/schema'

export async function getCategories() {
  const resultQuery = await db.query.categories.findMany({
    orderBy: (categories, {asc}) => [asc(categories.id)],
  })
  return resultQuery
}
// 🐶 Utilise les relation pour recuperer
// - Les categories avec les produits (contenant eux meme les catégories de produit)
export async function getCategoriesByIdWithProducts(catId: number) {
  const resultQuery = await db.query.categories.findFirst({
    // 🐶 utilise 'with' pour récupérer les produits
    // 🐶 - utilise 'with' (imbriqué) pour récupérer les catégories
    where: catId ? (categories, {eq}) => eq(categories.id, catId) : undefined,
    orderBy: (categories, {asc}) => [asc(categories.id)],
  })

  return resultQuery
}
