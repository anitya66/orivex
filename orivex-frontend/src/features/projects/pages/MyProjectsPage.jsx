import { useState } from "react";

import { useAuth } from "@/contexts/AuthContext";

import { useMyProjects } from "../hooks/useMyProjects";

import MyProjectCard from "../components/MyProjectCard";
import CreateProjectModal from "../components/CreateProjectModal";

export default function MyProjectsPage() {

  const { user } = useAuth();

  const { data, isLoading, isError } = useMyProjects();

  const [selectedProject, setSelectedProject] = useState(null);

  const [openCreateModal, setOpenCreateModal] = useState(false);

  if (isLoading) {
    return (
      <div className="p-6 text-white">
        Loading projects...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6 text-red-500">
        Failed to load projects.
      </div>
    );
  }

  const projects = data?.data ?? [];

  return (
    <div className="p-6">

      {/* Header */}

      <div className="mb-8 flex items-center justify-between">

        <h1 className="text-3xl font-bold text-white">
          My Projects
        </h1>

        {user?.role === "CLIENT" && (
          <button
            onClick={() => setOpenCreateModal(true)}
            className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            Create Project
          </button>
        )}

      </div>

      {/* Project List */}

      {projects.length === 0 ? (
        <div className="rounded-xl bg-slate-900 p-8 text-center text-slate-400">
          No projects found.
        </div>
      ) : (
        <div className="space-y-5">

          {projects.map((project) => (
            <MyProjectCard
              key={project.id}
              project={project}
              onEdit={() => setSelectedProject(project)}
            />
          ))}

        </div>
      )}

      {/* Edit Project */}

      {selectedProject && (
        <CreateProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}

      {/* Create Project */}

      {user?.role === "CLIENT" && openCreateModal && (
        <CreateProjectModal
          onClose={() => setOpenCreateModal(false)}
        />
      )}

    </div>
  );
}