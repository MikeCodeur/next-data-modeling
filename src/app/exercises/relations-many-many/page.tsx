import {getGroupsWithUsers, getUsersWithGroups} from '@/db/db-drizzle-query'

export default async function Products() {
  const users = await getUsersWithGroups()
  console.log('rows', users)
  return (
    <div className="mx-auto max-w-4xl p-6 text-lg">
      <h1 className="mb-4 text-center text-3xl font-bold">User with Group</h1>

      <UserWithGroups />
      <h1 className="mb-4 text-center text-3xl font-bold">User By Group</h1>
      <UserByGroup />
    </div>
  )
}

async function UserWithGroups() {
  const users = await getUsersWithGroups()
  console.log('rows', users)
  return (
    <div>
      {users.map((user) => (
        <div key={user.id}>
          <p>
            USER {user.id} - {user.name}
          </p>
          <h3>Groupes</h3>
          {user.usersToGroups.map((groupUser) => (
            <div key={user.id}>
              <p>-- {groupUser.group.name}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

async function UserByGroup() {
  const groups = await getGroupsWithUsers()

  console.log('rows', groups)
  return (
    <div>
      {groups.map((group) => (
        <div key={group.id}>
          <p>
            Group {group.id} - {group.name}
          </p>
          <h3>Users</h3>
          {group.usersToGroups.map((userGroup) => (
            <div key={userGroup.user.id}>
              <p>-- {userGroup.user.name}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
