import {ProductWithCategory} from '@/db/schema/products'
import {getCategoriesByIdWithProducts} from '../actions'
import {ProductsTable} from './product-table'

export default async function Page(props: {params: Promise<{id: string}>}) {
  const params = await props.params
  const category = await getCategoriesByIdWithProducts(Number(params.id))
  const products = category?.products
  console.log('products', products)
  return (
    <div className="mx-auto max-w-4xl p-6 text-lg">
      <h1 className="mb-4 text-center text-3xl font-bold">
        Category : {category?.name}
      </h1>

      <div className="flex flex-col ">
        <div className="rounded-lg border shadow-sm">
          <ProductsTable products={products} />
        </div>
      </div>
    </div>
  )
}
