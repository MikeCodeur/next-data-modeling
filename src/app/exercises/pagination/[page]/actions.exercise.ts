'use server'

import db from '@/db/schema'
import {formSchema, FormSchemaType} from './schema'
import {revalidatePath} from 'next/cache'
import {InsertProduct, Product, products} from '@/db/schema/products'
import {count, eq} from 'drizzle-orm'

export async function getProductsPagination(nbElement: number, start: number) {
  const resultQuery = await db.query.products.findMany({
    // 🐶 Implémente la requete avec les caractéristiques suivantes :
    // offset: start,
    // limit: nbElement,
    // avec les categories
    // trier par id ascendant
  })

  // 🐶 Utilise : db.select({count: count()} pour recuperer le nombre de produits
  const rows = [{count: 10}] // Remplacer par le resultat de la requete

  return {
    products: resultQuery,
    totalProducts: rows[0].count,
  }
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
