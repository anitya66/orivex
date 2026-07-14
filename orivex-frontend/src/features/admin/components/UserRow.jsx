import {
  Eye,
  Trash2,
  Shield,
  User,
} from "lucide-react";

import UserStatusBadge from "./UserStatusBadge";

function UserRow({
  user,
  onView,
  onToggleStatus,
  onDelete,
}) {
  return (
    <tr className="border-b border-slate-800 transition-all duration-200 hover:bg-slate-800/40">

      <td className="px-6 py-5 font-medium text-slate-400">
        #{user.id}
      </td>

      <td className="px-6 py-5">

        <div className="flex items-center gap-3">

          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-600/20">

            <User
              size={18}
              className="text-blue-400"
            />

          </div>

          <div>

            <p className="font-semibold text-white">
              {user.name}
            </p>

            <p className="text-xs text-slate-500">
              ORIVEX User
            </p>

          </div>

        </div>

      </td>

      <td className="px-6 py-5 text-slate-300">
        {user.email}
      </td>

      <td className="px-6 py-5">

        <span className="inline-flex items-center gap-2 rounded-full bg-slate-800 px-4 py-2 text-sm font-medium text-white">

          <Shield size={15} />

          {user.role}

        </span>

      </td>

      <td className="px-6 py-5">

        <UserStatusBadge
          status={user.accountStatus}
        />

      </td>

      <td className="px-6 py-5">

        <div className="flex justify-center gap-3">

          <button
            onClick={() => onView(user)}
            className="rounded-xl bg-blue-600 p-2.5 text-white transition hover:bg-blue-700"
          >
            <Eye size={18} />
          </button>

          <button
            onClick={() => onToggleStatus(user)}
            className={`rounded-xl px-4 py-2 text-sm font-semibold text-white transition ${
              user.accountStatus === "ACTIVE"
                ? "bg-yellow-600 hover:bg-yellow-700"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {user.accountStatus === "ACTIVE"
              ? "Suspend"
              : "Activate"}
          </button>

          <button
            onClick={() => onDelete(user)}
            className="rounded-xl bg-red-600 p-2.5 text-white transition hover:bg-red-700"
          >
            <Trash2 size={18} />
          </button>

        </div>

      </td>

    </tr>
  );
}

export default UserRow;