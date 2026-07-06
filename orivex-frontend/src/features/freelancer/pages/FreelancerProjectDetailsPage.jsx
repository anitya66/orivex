import { useState } from "react";
import { useParams } from "react-router-dom";

import { useProject } from "../hooks/useProject";

import ProjectInfoCard from "@/features/projects/components/ProjectInfoCard";
import SkillsCard from "@/features/projects/components/SkillsCard";
import ClientCard from "@/features/projects/components/ClientCard";

import ApplyProposalModal from "@/features/proposals/components/ApplyProposalModal";

function FreelancerProjectDetailsPage() {
  const { id } = useParams();

  const [openProposalModal, setOpenProposalModal] = useState(false);

  const {
    data,
    isLoading,
    isError,
  } = useProject(id);

  if (isLoading) {
    return (
      <div className="p-8 text-white">
        Loading project...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-8 text-red-500">
        Failed to load project.
      </div>
    );
  }

  const project = data.data;

  return (
    <div className="mx-auto max-w-7xl space-y-8 p-8">

      {/* Header */}

      <div>

        <h1 className="text-4xl font-bold text-white">
          {project.title}
        </h1>

        <p className="mt-4 text-slate-400">
          {project.description}
        </p>

      </div>

      {/* Project Information */}

      <ProjectInfoCard project={project} />

      {/* Required Skills */}

      <SkillsCard
        skills={project.requiredSkills}
      />

      {/* Client */}

      <ClientCard
        project={project}
      />

      {/* Apply Button */}

      <div className="flex justify-end">

        <button
          onClick={() => setOpenProposalModal(true)}
          className="rounded-xl bg-green-600 px-8 py-3 text-lg font-semibold text-white transition hover:bg-green-700"
        >
          Apply Proposal
        </button>

      </div>

      {/* Modal */}

      {openProposalModal && (
        <ApplyProposalModal
          projectId={Number(id)}
          onClose={() => setOpenProposalModal(false)}
        />
      )}

    </div>
  );
}

export default FreelancerProjectDetailsPage;