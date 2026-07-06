import { useNavigate } from "react-router-dom";

function FreelancerProjectCard({ project }) {
  const navigate = useNavigate();

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:border-blue-500">

      <div className="flex items-start justify-between">

        <div>

          <h2 className="text-2xl font-bold text-white">
            {project.title}
          </h2>

          <p className="mt-2 line-clamp-3 text-slate-400">
            {project.description}
          </p>

        </div>

        <span className="rounded-full bg-green-900 px-3 py-1 text-sm font-semibold text-green-400">
          {project.status}
        </span>

      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-2">

        <div>

          <p className="text-sm text-slate-500">
            Budget
          </p>

          <p className="font-semibold text-white">
            ₹{project.budget}
          </p>

        </div>

        <div>

          <p className="text-sm text-slate-500">
            Deadline
          </p>

          <p className="font-semibold text-white">
            {project.deadline}
          </p>

        </div>

        <div>

          <p className="text-sm text-slate-500">
            Category
          </p>

          <p className="font-semibold text-white">
            {project.category}
          </p>

        </div>

        <div>

          <p className="text-sm text-slate-500">
            Experience
          </p>

          <p className="font-semibold text-white">
            {project.experienceLevel}
          </p>

        </div>

      </div>

      <div className="mt-8">

        <button
          onClick={() =>
           navigate(`/dashboard/browse-projects/${project.id}`)
          }
          className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          View Details
        </button>

      </div>

    </div>
  );
}

export default FreelancerProjectCard;