import { useParams } from "react-router-dom";

import { useProject } from "../hooks/useProject";
import { useProjectProposals } from "@/features/proposals/hooks/useProjectProposals";
import ProposalCard from "@/features/proposals/components/ProposalCard";
import ProjectInfoCard from "../components/ProjectInfoCard";
import SkillsCard from "../components/SkillsCard";
import ClientCard from "../components/ClientCard";
import ActionButtons from "../components/ActionButtons";
import { useState } from "react";

import ApplyProposalModal from "@/features/proposals/components/ApplyProposalModal";

export default function ProjectDetailsPage() {

    const { id } = useParams();
    
    const [openProposalModal, setOpenProposalModal] = useState(false);

  const {
    data,
    isLoading,
    isError,
    } = useProject(id);
    
    const {
  data: proposalsData,
  isLoading: proposalsLoading,
    } = useProjectProposals(id);
    

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

  return (
    <div className="mx-auto max-w-7xl space-y-8 p-8">

      <div>

        <h1 className="text-4xl font-bold text-white">
          {project.title}
        </h1>

        <p className="mt-3 text-slate-400">
          {project.description}
        </p>

      </div>

      <ProjectInfoCard project={project} />

      <SkillsCard
        skills={project.requiredSkills}
      />

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
          

      <ActionButtons
  onApply={() => setOpenProposalModal(true)}
          />
          
          {openProposalModal && (
  <ApplyProposalModal
    projectId={Number(id)}
    onClose={() => setOpenProposalModal(false)}
  />
          )}
          

    </div>
  );
}