import ProjectRow from "./ProjectRow";

function ProjectTable({

  projects,

  onView,

  onToggleStatus,

  onDelete,

}) {

  if (!projects.length) {

    return (

      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-10 text-center text-slate-400">

        No projects found.

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

              Title

            </th>

            <th className="px-6 py-4">

              Client

            </th>

            <th className="px-6 py-4">

              Budget

            </th>

            <th className="px-6 py-4">

              Status

            </th>

            <th className="px-6 py-4">

              Deadline

            </th>

            <th className="px-6 py-4 text-center">

              Actions

            </th>

          </tr>

        </thead>

        <tbody className="bg-slate-950">

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

  );

}

export default ProjectTable;