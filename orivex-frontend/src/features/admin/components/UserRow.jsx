import { Eye, Trash2 } from "lucide-react";

import UserStatusBadge from "./UserStatusBadge";

function UserRow({

  user,

  onView,

  onToggleStatus,

  onDelete,

}) {

  return (

    <tr className="border-b border-slate-800 transition hover:bg-slate-900">

      <td className="px-6 py-4 text-slate-300">

        {user.id}

      </td>

      <td className="px-6 py-4 font-medium text-white">

        {user.name}

      </td>

      <td className="px-6 py-4 text-slate-300">

        {user.email}

      </td>

      <td className="px-6 py-4">

        <span className="rounded-lg bg-slate-800 px-3 py-1 text-sm text-white">

          {user.role}

        </span>

      </td>

      <td className="px-6 py-4">

        <UserStatusBadge
          status={user.accountStatus}
        />

      </td>

      <td className="px-6 py-4">

        <div className="flex justify-center gap-2">

          <button

            onClick={() => onView(user)}

            className="rounded-lg bg-blue-600 p-2 text-white hover:bg-blue-700"

          >

            <Eye size={18} />

          </button>

          <button

            onClick={() => onToggleStatus(user)}

            className={`rounded-lg px-3 py-2 text-sm font-semibold text-white

              ${
                user.accountStatus === "ACTIVE"

                  ? "bg-red-600 hover:bg-red-700"

                  : "bg-green-600 hover:bg-green-700"

              }`}

          >

            {

              user.accountStatus === "ACTIVE"

                ? "Suspend"

                : "Activate"

            }

          </button>

          <button

  onClick={() => onDelete(user)}

  className="rounded-lg bg-red-600 p-2 text-white hover:bg-red-700"

>

  <Trash2 size={18} />

</button>

        </div>

      </td>

    </tr>

  );

}

export default UserRow;