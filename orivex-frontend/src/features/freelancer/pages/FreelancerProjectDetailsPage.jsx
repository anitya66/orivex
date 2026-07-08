import { useState } from "react";
import { Link, useParams } from "react-router-dom";

import { useAuth } from "@/contexts/AuthContext";

import { useProject } from "../hooks/useProject";
import { useMyProposals } from "@/features/proposals/hooks/useMyProposals";

import ProjectInfoCard from "@/features/projects/components/ProjectInfoCard";
import SkillsCard from "@/features/projects/components/SkillsCard";
import ClientCard from "@/features/projects/components/ClientCard";

import ApplyProposalModal from "@/features/proposals/components/ApplyProposalModal";

function FreelancerProjectDetailsPage() {
  const { id } = useParams();

  const { user } = useAuth();

  const [openProposalModal, setOpenProposalModal] = useState(false);

  const {
    data,
    isLoading,
    isError,
  } = useProject(id);

  const {
    data: myProposalsData,
  } = useMyProposals();

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

  const myProposal = myProposalsData?.data?.find(
    (proposal) => proposal.projectId === Number(id)
  );

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

      {/* Skills */}

      <SkillsCard skills={project.requiredSkills} />

      {/* Client */}

      <ClientCard project={project} />

      {/* Action Section */}

      <div className="flex justify-end">

        {user?.role === "FREELANCER" && (
          <>
            {/* Never Applied */}

            {project.status === "OPEN" && !myProposal && (

              <button
                onClick={() => setOpenProposalModal(true)}
                className="rounded-xl bg-green-600 px-8 py-3 text-lg font-semibold text-white transition hover:bg-green-700"
              >
                Apply Proposal
              </button>

            )}

            {/* Pending */}

            {myProposal?.status === "PENDING" && (

              <button
                disabled
                className="rounded-xl bg-yellow-600 px-8 py-3 text-lg font-semibold text-white opacity-80"
              >
                Proposal Submitted
              </button>

            )}

            {/* Accepted */}

            {myProposal?.status === "ACCEPTED" && (

              <Link
                to="/dashboard/my-contracts"
                className="rounded-xl bg-blue-600 px-8 py-3 text-lg font-semibold text-white transition hover:bg-blue-700"
              >
                Go To Contract
              </Link>

            )}

            {/* Rejected */}

            {myProposal?.status === "REJECTED" && (

              <button
                disabled
                className="rounded-xl bg-red-600 px-8 py-3 text-lg font-semibold text-white opacity-80"
              >
                Proposal Rejected
              </button>

            )}

            {/* Assigned */}

            {project.status === "IN_PROGRESS" && !myProposal && (

              <button
                disabled
                className="rounded-xl bg-slate-600 px-8 py-3 text-lg font-semibold text-white opacity-80"
              >
                Project is no longer accepting proposals
              </button>

            )}

            {/* Closed */}

            {project.status === "CLOSED" && (

              <button
                disabled
                className="rounded-xl bg-slate-700 px-8 py-3 text-lg font-semibold text-white opacity-80"
              >
                Project Closed
              </button>

            )}
          </>
        )}

      </div>

      {/* Modal */}

      {user?.role === "FREELANCER" && openProposalModal && (
        <ApplyProposalModal
          projectId={Number(id)}
          onClose={() => setOpenProposalModal(false)}
        />
      )}

    </div>
  );
}

export default FreelancerProjectDetailsPage;