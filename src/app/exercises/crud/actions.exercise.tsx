'use server'

import db from '@/db/schema'
import {formSchema, FormSchemaType} from './schema'
import {revalidatePath} from 'next/cache'
import {InsertProduct, Product, products} from '@/db/schema/products'
import {eq} from 'drizzle-orm'

export async function getProducts(catId?: number) {
  const resultQuery = await db.query.products.findMany({
    // 🐶 Implémente la requête avec les caractéristiques suivantes :
    // - avec les categories
    // - où la catégorie est égale à catId
    // - trié par id ascendant
    // - limité à 20
  })

  return resultQuery
}

export async function getCategories() {
  const resultQuery = await db.query.categories.findMany({
    // 🐶 Implémente la requête avec les caractéristiques suivantes :
    // - trié par id ascendant
  })
  return resultQuery
}

export async function getProductByName(name: string) {
  const resultQuery = await db.query.products.findMany({
    // 🐶 Implémente la requête avec les caractéristiques suivantes :
    // - avec les categories
    // - où le titre est égal à name
    // - trié par id ascendant
  })

  return resultQuery
}

export async function deleteProductDao(id: number) {
  // 🐶 Implémente la requête avec les caractéristiques suivantes :
  // - supprime le produit où l'id est égal à id
  // - retourne le résultat
}

export async function insertProductDao(product: InsertProduct) {
  // 🐶 Implémente la requête avec les caractéristiques suivantes :
  // - insère le produit dans la table products
  // - retourne le résultat
}
export async function updateProductDao(product: Product) {
  // 🐶 Implémente la requête avec les caractéristiques suivantes :
  // - met à jour le produit dans la table products
  // - où l'id est égal à product.id
  // - retourne le résultat
}

export async function persistProductDao(product: Product) {
  await (product.id > 0 ? updateProductDao(product) : insertProductDao(product))
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
  success?: boolean
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
