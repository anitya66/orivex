import {
  X,
  FolderOpen,
  Building2,
  Calendar,
  IndianRupee,
  Briefcase,
  Layers,
  Code2,
} from "lucide-react";

import ProjectStatusBadge from "./ProjectStatusBadge";
import { useProjectDetails } from "../hooks/useProjectDetails";

function Info({
  title,
  value,
  icon,
}) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5">

      <div className="mb-3 flex items-center gap-2">

        {icon}

        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          {title}
        </p>

      </div>

      <p className="break-words text-white">
        {value || "-"}
      </p>

    </div>
  );
}

function ProjectDetailsModal({
  projectId,
  onClose,
}) {
  const {
    data,
    isLoading,
  } = useProjectDetails(projectId);

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">

        <div className="rounded-3xl border border-slate-800 bg-slate-900 px-10 py-8 text-white">

          Loading project...

        </div>

      </div>
    );
  }

  const project = data.data;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 p-6 backdrop-blur-sm">

      <div className="mx-auto my-10 w-full max-w-6xl rounded-3xl border border-slate-800 bg-slate-900 shadow-2xl">

        {/* Header */}

        <div className="flex items-center justify-between border-b border-slate-800 p-8">

          <div>

            <h2 className="text-3xl font-bold text-white">
              Project Details
            </h2>

            <p className="mt-2 text-slate-400">
              Complete information about this project.
            </p>

          </div>

          <button
            onClick={onClose}
            className="rounded-xl bg-slate-800 p-3 transition hover:bg-slate-700"
          >
            <X
              size={22}
              className="text-white"
            />
          </button>

        </div>

        {/* Body */}

        <div className="space-y-8 p-8">

          {/* Project Header */}

          <div className="flex items-center gap-5">

            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-600/20">

              <FolderOpen
                size={34}
                className="text-blue-400"
              />

            </div>

            <div>

              <h3 className="text-3xl font-bold text-white">
                {project.title}
              </h3>

              <p className="mt-2 text-slate-400">
                {project.clientName}
              </p>

            </div>

          </div>

          {/* Status */}

          <ProjectStatusBadge
            status={project.status}
          />

          {/* Information */}

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

            <Info
              title="Client"
              value={project.clientName}
              icon={
                <Building2
                  size={18}
                  className="text-blue-400"
                />
              }
            />

            <Info
              title="Budget"
              value={`₹${project.budget}`}
              icon={
                <IndianRupee
                  size={18}
                  className="text-emerald-400"
                />
              }
            />

            <Info
              title="Deadline"
              value={project.deadline}
              icon={
                <Calendar
                  size={18}
                  className="text-orange-400"
                />
              }
            />

            <Info
              title="Category"
              value={project.category}
              icon={
                <Layers
                  size={18}
                  className="text-purple-400"
                />
              }
            />

            <Info
              title="Project Type"
              value={project.projectType}
              icon={
                <Briefcase
                  size={18}
                  className="text-cyan-400"
                />
              }
            />

            <Info
              title="Experience Level"
              value={project.experienceLevel}
              icon={
                <Code2
                  size={18}
                  className="text-pink-400"
                />
              }
            />

          </div>

          {/* Description */}

          <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6">

            <h3 className="mb-4 text-xl font-semibold text-white">
              Description
            </h3>

            <p className="leading-8 text-slate-300 whitespace-pre-wrap">
              {project.description}
            </p>

          </div>

          {/* Skills */}

          <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6">

            <h3 className="mb-4 text-xl font-semibold text-white">
              Required Skills
            </h3>

            <div className="flex flex-wrap gap-3">

              {(project.requiredSkills ?? "")
                .split(",")
                .filter(Boolean)
                .map((skill) => (

                  <span
                    key={skill}
                    className="rounded-full bg-blue-600/20 px-4 py-2 text-sm font-medium text-blue-400"
                  >
                    {skill.trim()}
                  </span>

                ))}

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default ProjectDetailsModal;