import {
  getProductWithCategory,
  getUserWithProfiles,
} from '@/db/db-drizzle-query'

export default async function Products() {
  const rows = await getProductWithCategory()
  const user = await getUserWithProfiles('Alice')
  console.log('rows', rows)
  return (
    <div>
      <p>
        {user?.name} - option {user?.profileInfo?.metadata as string}
      </p>
      {rows.map((row) => (
        <div key={row.id}>
          <p>
            {row.id} - {row.title} - Category {row?.category?.name}
          </p>
        </div>
      ))}
    </div>
  )
}
