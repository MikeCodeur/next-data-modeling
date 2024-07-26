import {getCategoriesWithProducts} from '@/db/db-drizzle-query'

export default async function Products() {
  const categories = await getCategoriesWithProducts()
  console.log('rows', categories)
  return (
    <div>
      {categories.map((category) => (
        <div key={category.id}>
          <p>
            Categorey {category.id} - {category.name}
          </p>
          {category.products.map((product) => (
            <div key={category.id}>
              <p>
                {product.id} - {product.title} - Category id {product?.category}
              </p>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
