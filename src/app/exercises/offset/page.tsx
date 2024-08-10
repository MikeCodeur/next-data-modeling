import {getProductPagination} from '@/db/db-drizzle-query'

export default async function Products() {
  const products = await getProductPagination(5, 0)
  const productsSuite = await getProductPagination(5, 5)
  console.log('rows', products)
  return (
    <div className="mx-auto max-w-4xl p-6 text-lg">
      <h1 className="mb-4 text-center text-3xl font-bold">5 premier produit</h1>

      {products.map((product) => (
        <div key={product.id}>
          <p>
            Product Title {product.id} - {product.title}
          </p>

          <div>
            <p>Category Name {product?.category?.name}</p>
          </div>
        </div>
      ))}
      <h1 className="mb-4 text-center text-3xl font-bold">5 produit suivant</h1>
      {productsSuite.map((product) => (
        <div key={product.id}>
          <p>
            Product Title {product.id} - {product.title}
          </p>

          <div>
            <p>Category Name {product?.category?.name}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
