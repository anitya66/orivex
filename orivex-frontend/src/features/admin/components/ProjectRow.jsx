import { Eye, Trash2 } from "lucide-react";

import ProjectStatusBadge from "./ProjectStatusBadge";

function ProjectRow({

  project,

  onView,

  onToggleStatus,

  onDelete,

}) {

  return (

    <tr className="border-b border-slate-800 hover:bg-slate-900 transition">

      <td className="px-6 py-4">

        {project.id}

      </td>

      <td className="px-6 py-4 font-medium text-white">

        {project.title}

      </td>

      <td className="px-6 py-4">

        {project.clientName}

      </td>

      <td className="px-6 py-4">

        ₹{project.budget}

      </td>

      <td className="px-6 py-4">

        <ProjectStatusBadge
          status={project.status}
        />

      </td>

      <td className="px-6 py-4">

        {project.deadline}

      </td>

      <td className="px-6 py-4">

  <div className="flex justify-center gap-2">

    <button

      onClick={() => onView(project)}

      className="rounded-lg bg-blue-600 p-2 text-white hover:bg-blue-700"

    >

      <Eye size={18} />

    </button>

    <button

      onClick={() => onToggleStatus(project)}

      className={`rounded-lg px-3 py-2 text-sm font-semibold text-white

        ${
          project.status === "SUSPENDED"

            ? "bg-green-600 hover:bg-green-700"

            : "bg-yellow-600 hover:bg-yellow-700"

        }`}

    >

      {

        project.status === "SUSPENDED"

          ? "Resume"

          : "Suspend"

      }

    </button>

    <button

      onClick={() => onDelete(project)}

      className="rounded-lg bg-red-600 p-2 text-white hover:bg-red-700"

    >

      <Trash2 size={18} />

    </button>

  </div>

</td>

    </tr>

  );

}

export default ProjectRow;