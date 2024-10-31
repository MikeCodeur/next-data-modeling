import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {getGroupsWithUsersFilter} from '../action'
import {Badge} from '@/components/ui/badge'
import Link from 'next/link'
import {Label} from '@/components/ui/label'

export default async function Page(props: {params: Promise<{group: string}>}) {
  const params = await props.params
  return (
    <div className="mx-auto max-w-4xl p-6 text-lg">
      <h1 className="mb-4 text-center text-3xl font-bold">
        Users in Group ({params.group})
      </h1>
      <UsersGroupTable group={params.group}></UsersGroupTable>
    </div>
  )
}

async function UsersGroupTable({group}: {group: string}) {
  const groups = await getGroupsWithUsersFilter(group)
  const users = groups[0]?.usersToGroups?.map((userToGroup) => userToGroup.user)
  if (!users) return <Label>No user found</Label>
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
        {users?.map((user) => (
          <TableRow key={user.id}>
            <TableCell className="font-medium">{user.id}</TableCell>
            <TableCell>{user.name}</TableCell>
            <TableCell>
              <div className="flex flex-wrap gap-1">
                {user.usersToGroups.map((usersToGroup, index) => (
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
