import { useNavigate } from "react-router-dom";
import { useDeleteProject } from "../hooks/useDeleteProject";

function MyProjectCard({
  project,
  onEdit,
}) {
  const navigate = useNavigate();

  const {
    mutate: deleteProject,
    isPending,
  } = useDeleteProject();

  function handleDelete() {
    const confirmed = window.confirm(
      "Are you sure you want to delete this project?"
    );

    if (!confirmed) {
      return;
    }

    deleteProject(project.id);
  }

  return (
    <div className="rounded-xl border border-slate-700 bg-slate-900 p-6">

      {/* Header */}
      <div className="flex items-start justify-between">

        <div>

          <h2 className="text-2xl font-bold text-white">
            {project.title}
          </h2>

          <p className="mt-2 text-slate-400">
            {project.description}
          </p>

        </div>

        <span
          className={`rounded-full px-4 py-2 text-sm font-semibold ${
            project.status === "OPEN"
              ? "bg-green-900 text-green-400"
              : project.status === "IN_PROGRESS"
              ? "bg-yellow-900 text-yellow-400"
              : project.status === "COMPLETED"
              ? "bg-blue-900 text-blue-400"
              : "bg-red-900 text-red-400"
          }`}
        >
          {project.status}
        </span>

      </div>

      {/* Project Info */}
      <div className="mt-6 flex flex-wrap gap-8 text-slate-300">

        <div>
          <p className="font-semibold text-white">Budget</p>
          <p>₹{project.budget}</p>
        </div>

        <div>
          <p className="font-semibold text-white">Category</p>
          <p>{project.category}</p>
        </div>

        <div>
          <p className="font-semibold text-white">Type</p>
          <p>{project.projectType}</p>
        </div>

        <div>
          <p className="font-semibold text-white">Deadline</p>
          <p>{project.deadline}</p>
        </div>

      </div>

      {/* Action Buttons */}
      <div className="mt-8 flex flex-wrap gap-3">

        <button
          onClick={() =>
            navigate(`/dashboard/projects/${project.id}`)
          }
          className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700"
        >
          View
        </button>

        <button
          onClick={onEdit}
          className="rounded-lg bg-yellow-600 px-4 py-2 font-medium text-white transition hover:bg-yellow-700"
        >
          Edit
        </button>

        <button
          onClick={handleDelete}
          disabled={isPending}
          className="rounded-lg bg-red-600 px-4 py-2 font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? "Deleting..." : "Delete"}
        </button>

        <button
          className="rounded-lg bg-slate-700 px-4 py-2 font-medium text-white transition hover:bg-slate-600"
        >
          Close
        </button>

      </div>

    </div>
  );
}

export default MyProjectCard;