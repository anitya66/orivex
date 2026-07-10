import UserRow from "./UserRow";

function UserTable({

  users,

  onView,

  onToggleStatus,

  onDelete,

}) {

  if (!users.length) {

    return (

      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-10 text-center text-slate-400">

        No users found.

      </div>

    );

  }

  return (

    <div className="overflow-hidden rounded-2xl border border-slate-800">

      <table className="min-w-full">

        <thead className="bg-slate-900">

          <tr className="text-left text-slate-300">

            <th className="px-6 py-4">
              ID
            </th>

            <th className="px-6 py-4">
              Name
            </th>

            <th className="px-6 py-4">
              Email
            </th>

            <th className="px-6 py-4">
              Role
            </th>

            <th className="px-6 py-4">
              Status
            </th>

            <th className="px-6 py-4 text-center">
              Actions
            </th>

          </tr>

        </thead>

        <tbody className="bg-slate-950">

          {users.map((user) => (

            <UserRow

              key={user.id}

              user={user}

              onView={onView}

              onToggleStatus={onToggleStatus}

              onDelete={onDelete}

            />

          ))}

        </tbody>

      </table>

    </div>

  );

}

export default UserTable;