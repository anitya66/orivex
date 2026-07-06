function ProjectCard({ project }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:border-blue-500">

      <div className="flex items-start justify-between">

        <div>

          <h2 className="text-2xl font-semibold text-white">
            {project.title}
          </h2>

          <p className="mt-2 text-slate-400">
            {project.description}
          </p>

        </div>

        <span className="rounded-full bg-green-500/20 px-4 py-2 text-sm font-semibold text-green-400">
          {project.status}
        </span>

      </div>

      <div className="mt-6 flex flex-wrap gap-3">

        <span className="rounded-lg bg-slate-800 px-3 py-2 text-sm text-slate-300">
          {project.category}
        </span>

        <span className="rounded-lg bg-slate-800 px-3 py-2 text-sm text-slate-300">
          {project.projectType}
        </span>

        <span className="rounded-lg bg-slate-800 px-3 py-2 text-sm text-slate-300">
          {project.experienceLevel}
        </span>

      </div>

      <div className="mt-8 flex items-center justify-between">

        <div>

          <p className="text-sm text-slate-400">
            Budget
          </p>

          <h2 className="text-2xl font-bold text-blue-500">
            ₹{project.budget}
          </h2>

        </div>

        <div className="text-right">

          <p className="text-sm text-slate-400">
            Deadline
          </p>

          <h2 className="text-white">
            {project.deadline}
          </h2>

        </div>

      </div>

    </div>
  );
}

export default ProjectCard;