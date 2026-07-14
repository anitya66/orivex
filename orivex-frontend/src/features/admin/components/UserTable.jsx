import UserRow from "./UserRow";

function UserTable({
  users,
  onView,
  onToggleStatus,
  onDelete,
}) {
  if (!users.length) {
    return (
      <div className="rounded-3xl border border-slate-800 bg-slate-900 p-14 text-center text-slate-400">
        No users found.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 shadow-xl">

      <div className="overflow-x-auto">

        <table className="min-w-full">

          <thead className="border-b border-slate-800 bg-slate-950">

            <tr>

              <th className="px-6 py-5 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                ID
              </th>

              <th className="px-6 py-5 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                User
              </th>

              <th className="px-6 py-5 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                Email
              </th>

              <th className="px-6 py-5 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                Role
              </th>

              <th className="px-6 py-5 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                Status
              </th>

              <th className="px-6 py-5 text-center text-xs font-semibold uppercase tracking-wider text-slate-400">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

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

    </div>
  );
}

export default UserTable;