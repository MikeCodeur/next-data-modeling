import db from '@/db/schema'

export async function getUserWithProfiles(name?: string) {
  const resultQuery = await db.query.users.findFirst({
    where: name ? (users, {eq}) => eq(users.name, name) : undefined,
    orderBy: (users, {asc}) => [asc(users.id)],
  })
  return resultQuery
}
export default async function AccountWithProfil() {
  const user = await getUserWithProfiles('Alice')
  console.log('user', user)
  return (
    <div className="mx-auto max-w-4xl p-6 text-lg">
      <h1 className="mb-4 text-center text-3xl font-bold">
        Relation One-To-One
      </h1>
      <p>{user?.name}</p>
    </div>
  )
}
