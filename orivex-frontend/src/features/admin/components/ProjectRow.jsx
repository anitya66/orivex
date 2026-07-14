import {
  Eye,
  Trash2,
  FolderOpen,
} from "lucide-react";

import ProjectStatusBadge from "./ProjectStatusBadge";

function ProjectRow({
  project,
  onView,
  onToggleStatus,
  onDelete,
}) {
  return (
    <tr className="border-b border-slate-800 transition-all duration-200 hover:bg-slate-800/40">

      <td className="px-6 py-5 font-medium text-slate-400">
        #{project.id}
      </td>

      <td className="px-6 py-5">

        <div className="flex items-center gap-3">

          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-600/20">

            <FolderOpen
              size={18}
              className="text-blue-400"
            />

          </div>

          <div>

            <p className="font-semibold text-white">
              {project.title}
            </p>

            <p className="text-xs text-slate-500">
              Project
            </p>

          </div>

        </div>

      </td>

      <td className="px-6 py-5 text-slate-300">
        {project.clientName}
      </td>

      <td className="px-6 py-5">

        <span className="font-semibold text-emerald-400">
          ₹{project.budget}
        </span>

      </td>

      <td className="px-6 py-5">

        <ProjectStatusBadge
          status={project.status}
        />

      </td>

      <td className="px-6 py-5 text-slate-300">
        {project.deadline}
      </td>

      <td className="px-6 py-5">

        <div className="flex justify-center gap-3">

          <button
            onClick={() => onView(project)}
            className="rounded-xl bg-blue-600 p-2.5 text-white transition hover:bg-blue-700"
          >
            <Eye size={18} />
          </button>

          <button
            onClick={() => onToggleStatus(project)}
            className={`rounded-xl px-4 py-2 text-sm font-semibold text-white transition ${
              project.status === "SUSPENDED"
                ? "bg-green-600 hover:bg-green-700"
                : "bg-yellow-600 hover:bg-yellow-700"
            }`}
          >
            {project.status === "SUSPENDED"
              ? "Resume"
              : "Suspend"}
          </button>

          <button
            onClick={() => onDelete(project)}
            className="rounded-xl bg-red-600 p-2.5 text-white transition hover:bg-red-700"
          >
            <Trash2 size={18} />
          </button>

        </div>

      </td>

    </tr>
  );
}

export default ProjectRow;