import ProjectCard from "./ProjectCard";

function ProjectGrid({
  data,
  loading,
  error,
}) {
  if (loading) {
    return (
      <h2 className="text-white">
        Loading...
      </h2>
    );
  }

  if (error) {
    return (
      <h2 className="text-red-500">
        Failed to load projects.
      </h2>
    );
  }

  const projects = data.data.content;

  if (projects.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-700 p-16 text-center">
        <h2 className="text-2xl font-semibold text-white">
          No Projects Found
        </h2>

        <p className="mt-3 text-slate-400">
          Create your first project.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6">

      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
        />
      ))}

    </div>
  );
}

export default ProjectGrid;