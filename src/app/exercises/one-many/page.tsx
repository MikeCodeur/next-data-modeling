import Link from 'next/link'
import {getCategories} from './actions'

export default async function Page() {
  const categories = await getCategories()
  return (
    <div className="mx-auto max-w-2xl p-6 text-lg">
      <h1 className="mb-4 text-center text-3xl font-bold">
        Administration de la boutique
      </h1>

      <div className="flex flex-col ">
        <div className="">
          <ul className="list-disc space-y-2 pl-5">
            {categories.map((category) => (
              <li
                key={category.id}
                className="transition-colors hover:text-red-400"
              >
                <Link href={`/exercises/one-many/${category.id}`}>
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
