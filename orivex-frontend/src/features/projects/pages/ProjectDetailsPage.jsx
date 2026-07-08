import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { useProject } from "../hooks/useProject";
import { useProjectProposals } from "@/features/proposals/hooks/useProjectProposals";

import { useDeleteProject } from "../hooks/useDeleteProject";
import { useCloseProject } from "../hooks/useCloseProject";

import CreateProjectModal from "../components/CreateProjectModal";
import ProposalCard from "@/features/proposals/components/ProposalCard";
import ProjectInfoCard from "../components/ProjectInfoCard";
import SkillsCard from "../components/SkillsCard";
import ClientCard from "../components/ClientCard";
import ActionButtons from "../components/ActionButtons";

export default function ProjectDetailsPage() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [openEditModal, setOpenEditModal] = useState(false);

  const {
    data,
    isLoading,
    isError,
  } = useProject(id);

  const {
    data: proposalsData,
    isLoading: proposalsLoading,
  } = useProjectProposals(id);

  const {
    mutate: deleteProject,
    isPending: deleting,
  } = useDeleteProject();

  const {
    mutate: closeProject,
    isPending: closing,
  } = useCloseProject();

  if (isLoading) {
    return (
      <div className="p-10 text-white">
        Loading...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-10 text-red-500">
        Failed to load project.
      </div>
    );
  }

  const project = data.data;

  const proposals = proposalsData?.data ?? [];

  function handleDelete() {

    if (!window.confirm("Delete this project?")) return;

    deleteProject(project.id, {

      onSuccess: () => {

        toast.success("Project deleted successfully.");

        navigate("/dashboard/my-projects");

      },

      onError: (error) => {

        toast.error(
          error.response?.data?.message ??
          "Failed to delete project."
        );

      },

    });

  }

  function handleClose() {

    if (!window.confirm("Close this project?")) return;

    closeProject(project.id, {

      onSuccess: () => {

        toast.success("Project closed successfully.");

      },

      onError: (error) => {

        toast.error(
          error.response?.data?.message ??
          "Failed to close project."
        );

      },

    });

  }

  return (

    <div className="mx-auto max-w-7xl space-y-8 p-8">

      {/* Header */}

      <div>

        <h1 className="text-4xl font-bold text-white">
          {project.title}
        </h1>

        <p className="mt-3 text-slate-400">
          {project.description}
        </p>

      </div>

      {/* Project Info */}

      <ProjectInfoCard project={project} />

      {/* Skills */}

      <SkillsCard
        skills={project.requiredSkills}
      />

      {/* Client */}

      <ClientCard
        project={project}
      />

      {/* Proposals */}

      <div className="space-y-6">

        <h2 className="text-3xl font-bold text-white">
          Proposals ({proposals.length})
        </h2>

        {proposalsLoading ? (

          <div className="text-slate-400">
            Loading proposals...
          </div>

        ) : proposals.length === 0 ? (

          <div className="rounded-xl bg-slate-900 p-6 text-slate-400">
            No proposals received yet.
          </div>

        ) : (

          <div className="space-y-6">

            {proposals.map((proposal) => (

              <ProposalCard
                key={proposal.id}
                proposal={proposal}
              />

            ))}

          </div>

        )}

      </div>

      {/* Actions */}

      <ActionButtons
        isOwner={true}
        onEdit={() => setOpenEditModal(true)}
        onDelete={handleDelete}
        onClose={handleClose}
      />

      {/* Edit Modal */}

      {openEditModal && (

        <CreateProjectModal
          project={project}
          onClose={() => setOpenEditModal(false)}
        />

      )}

    </div>

  );

}