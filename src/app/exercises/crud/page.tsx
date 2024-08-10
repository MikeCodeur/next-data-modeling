import {
  deleteProduct,
  getProductById,
  insertProduct,
  insertProducts,
  updateProduct,
} from '@/db/db-drizzle-query'

export default async function Products() {
  const productCreated = await insertProduct({
    title: 'Fake Product',
    description: 'des',
  })
  console.log('CREATE : productCreated', productCreated)
  const productsCreated = await insertProducts([
    {
      title: 'Fake Product',
      description: 'des',
    },
    {
      title: 'Fake Product2',
      description: 'des',
    },
  ])
  console.log('CREATE MULTIPLE  : productCreated', productsCreated)
  const product = await getProductById(productCreated.id)
  console.log('READ', productCreated)
  if (product) {
    const updatedProduct = await updateProduct(product)
    console.log('UPDATE', updatedProduct)
    const deletedProduct = await deleteProduct(updatedProduct.id)
    console.log('DELETE', deletedProduct)
    const shouldBeNUll = await getProductById(deletedProduct.id)
    console.log('getAfterDelete', shouldBeNUll)
  }

  return (
    <div className="mx-auto max-w-4xl p-6 text-lg">
      <h1 className="mb-4 text-center text-3xl font-bold">CRUD </h1>

      <div key={product?.id}>
        <p>
          Product Title {product?.id} - {product?.title}
        </p>

        <div>
          <p>Category Name {product?.category}</p>
        </div>
      </div>
    </div>
  )
}
