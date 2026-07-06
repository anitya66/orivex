function ProjectInfoCard({ project }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

      <h2 className="mb-6 text-xl font-bold text-white">
        Project Information
      </h2>

      <div className="grid gap-6 md:grid-cols-2">

        <Info title="Budget" value={`₹${project.budget}`} />

        <Info title="Category" value={project.category} />

        <Info title="Project Type" value={project.projectType} />

        <Info title="Experience Level" value={project.experienceLevel} />

        <Info
          title="Minimum Experience"
          value={`${project.minimumExperienceYears} Years`}
        />

        <Info title="Deadline" value={project.deadline} />

        <Info title="Status" value={project.status} />

      </div>

    </div>
  );
}

function Info({ title, value }) {
  return (
    <div>
      <p className="text-sm text-slate-400">
        {title}
      </p>

      <p className="mt-1 text-lg font-semibold text-white">
        {value}
      </p>
    </div>
  );
}

export default ProjectInfoCard;