'use server'

import db from '@/db/schema'
import {formSchema, FormSchemaType} from './schema'
import {revalidatePath} from 'next/cache'
import {Product, products, ProductWithCategory} from '@/db/schema/products'
import {asc, count, eq} from 'drizzle-orm'
// 🐶 Importe le type 'PgSelect' de 'drizzle-orm/pg-core/query-builders'

// 🤖 import {PgSelect} from 'drizzle-orm/pg-core/query-builders'
import {categories, Category} from '@/db/schema/categories'

// 🐶 le type générique 'T' doit étendre 'PgSelect'
function withPagination<T>(
  qb: T
  // 🐶 Ajoute une 'page' et une 'pageSize' en paramètres
) {
  // 🐶 Implémente une 'limit' et un 'offset' pour gérer la pagination
  return qb
}
// 🐶 Transfome cette fonction en utilisant les Dynamic Query
export async function getProductsPagination(nbElement: number, start: number) {
  // 🐶 Transforme cette requete 'Query' en 'PgSelect'
  // 🤖 const query = db.select().from(products) ...
  // 🐶 pense a utiliser une jointure vers category
  // 🤖 .leftJoin(categories, eq(categories.id, products.category))
  const query = await db.query.products.findMany({
    offset: start,
    limit: nbElement,
    with: {
      category: true,
    },
    orderBy: (product, {asc}) => [asc(product.id)],
  })

  // 🐶 Rend cette requete dynamique avec '$dynamic'
  // 🤖 const dynamicQuery = query.$dynamic()

  // 🐶 Utilise 'withPagination'
  // 🤖 const resultQuery = ...

  const rows = await db.select({count: count()}).from(products)

  // 🐶 Transforme les données 'product' pour les rendre plus lisibles grace à
  // 🤖 transformFlattenedData(resultQuery as FlattenedData[]),
  return {
    products: query, //transformFlattenedData(resultQuery as FlattenedData[]),
    totalProducts: rows[0].count,
  }
}

interface FlattenedData {
  product: Product
  category: Category | null | number
}

function transformFlattenedData(
  flattenedData: FlattenedData[]
): ProductWithCategory[] {
  return flattenedData.map((item) => {
    const productWithCategory: ProductWithCategory = {
      ...item.product,
      // @ts-ignore
      category: item.category as Category | null | number,
    }
    return productWithCategory
  })
}

export async function getProducts(catId?: number) {
  const resultQuery = await db.query.products.findMany({
    with: {
      category: true,
    },
    where: catId ? (categories, {eq}) => eq(categories.id, catId) : undefined,
    orderBy: (categories, {asc}) => [asc(categories.id)],
    limit: 20,
  })

  return resultQuery
}

export async function getCategories() {
  const resultQuery = await db.query.categories.findMany({
    orderBy: (categories, {asc}) => [asc(categories.id)],
  })
  return resultQuery
}

export async function getProductByName(name: string) {
  const resultQuery = await db.query.products.findMany({
    with: {
      category: true,
    },
    where: (products, {eq}) => eq(products.title, name),
    orderBy: (categories, {asc}) => [asc(categories.id)],
  })

  return resultQuery
}

export async function deleteProductDao(id: number) {
  const rows = await db
    .delete(products)
    .where(eq(products.id, Number(id)))
    .returning()
  return rows[0]
}

export async function persistProductDao(product: Product) {
  const rows = await db
    .insert(products)
    .values(product)
    .onConflictDoUpdate({target: products.id, set: product})
  return rows
}

export const persistProduct = async (product: Product) => {
  await persistProductDao(product)
  revalidatePath('/exercises/crud')
}

export const deleteProduct = async (product: Product) => {
  await deleteProductDao(product.id)
  revalidatePath('/exercises/crud')
}

type ValidationError = {
  field: keyof FormSchemaType
  message: string
}

export type FormState = {
  success: boolean
  errors?: ValidationError[]
  message?: string
}
export async function onSubmitAction(
  prevState: FormState,
  data: FormData
): Promise<FormState> {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  const formData = Object.fromEntries(data)

  const parsed = formSchema.safeParse(formData)

  if (!parsed.success) {
    logZodError(data)
    const validationErrors: ValidationError[] = parsed.error.errors.map(
      (err) => ({
        field: err.path[0] as keyof FormSchemaType,
        message: `zod server error ${err.message}`,
      })
    )
    return {
      success: false,
      errors: validationErrors,
      message: 'Server Error',
    }
  }

  const prod = await getProductByName(data.get('title')?.toString() ?? '')
  console.log('prod getProductByName', prod)
  if (prod && prod.length > 0 && prod[0].id < 0) {
    return {
      success: false,
      errors: [
        {
          field: 'title',
          message: 'Product allready exists',
        },
      ],
      message: 'Server Error',
    }
  }

  try {
    await persistProductDao(parsed.data as Product)
    revalidatePath('/exercises/crud')
    return {
      success: true,
      message: 'Product Saved',
    }
  } catch (error) {
    return {
      success: false,
      message: `Unkown Server Error ${error}`,
    }
  }
}

function logZodError(data: FormData) {
  const formData = Object.fromEntries(data)
  const parsed = formSchema.safeParse(formData)
  const errorMessages = parsed?.error?.errors
    .map((err) => `${err.path} ${err.message}`)
    .join(', ')
  console.error('Zod errorMessages', errorMessages)
}
