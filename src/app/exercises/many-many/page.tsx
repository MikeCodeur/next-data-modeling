import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {getGroupsWithUsers, getUsersWithGroups} from './action'
import {Badge} from '@/components/ui/badge'
import Link from 'next/link'

export default async function Products() {
  return (
    <div className="mx-auto max-w-4xl p-6 text-lg">
      <h1 className="mb-4 text-center text-3xl font-bold">Users with Group</h1>
      <UsersGroupTable />

      <h1 className="mt-16 text-center text-3xl font-bold">
        Groups with Users
      </h1>
      <GroupsWithUserTable />
    </div>
  )
}

async function UsersGroupTable() {
  const users = await getUsersWithGroups()
  return (
    <Table>
      <TableCaption>
        A list of users with their IDs, names, and groups.
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Groups</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell className="font-medium">{user.id}</TableCell>
            <TableCell>{user.name}</TableCell>
            <TableCell>
              <div className="flex flex-wrap gap-1">
                {user?.usersToGroups?.map((usersToGroup, index) => (
                  <Badge key={index} variant="secondary">
                    <Link
                      href={`/exercises/many-many/${usersToGroup.group.name}`}
                    >
                      {usersToGroup.group.name}
                    </Link>
                  </Badge>
                ))}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

async function GroupsWithUserTable() {
  const groups = await getGroupsWithUsers()
  return (
    <Table>
      <TableCaption>
        A list of groups with their IDs, names, and users.
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">ID</TableHead>
          <TableHead>Group</TableHead>
          <TableHead>Users</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {groups.map((group) => (
          <TableRow key={group.id}>
            <TableCell className="font-medium">{group.id}</TableCell>
            <TableCell>
              <Link href={`/exercises/many-many/${group.name}`}>
                {group.name}
              </Link>
            </TableCell>
            <TableCell>
              <div className="flex flex-wrap gap-1">
                {group?.usersToGroups?.map((usersToGroup, index) => (
                  <Badge key={index} variant="secondary">
                    {usersToGroup.user.name}
                  </Badge>
                ))}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
