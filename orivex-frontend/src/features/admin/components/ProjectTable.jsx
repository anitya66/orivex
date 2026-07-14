import ProjectRow from "./ProjectRow";

function ProjectTable({
  projects,
  onView,
  onToggleStatus,
  onDelete,
}) {
  if (!projects.length) {
    return (
      <div className="rounded-3xl border border-slate-800 bg-slate-900 p-14 text-center text-slate-400">
        No projects found.
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
                Project
              </th>

              <th className="px-6 py-5 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                Client
              </th>

              <th className="px-6 py-5 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                Budget
              </th>

              <th className="px-6 py-5 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                Status
              </th>

              <th className="px-6 py-5 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                Deadline
              </th>

              <th className="px-6 py-5 text-center text-xs font-semibold uppercase tracking-wider text-slate-400">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {projects.map((project) => (

              <ProjectRow
                key={project.id}
                project={project}
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

export default ProjectTable;