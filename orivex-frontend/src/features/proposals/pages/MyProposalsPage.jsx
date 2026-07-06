import { useMyProposals } from "../hooks/useMyProposals";

import MyProposalCard from "../components/MyProposalCard";

function MyProposalsPage() {

  const {
    data,
    isLoading,
    isError,
  } = useMyProposals();

  if (isLoading) {
    return (
      <div className="p-8 text-white">
        Loading proposals...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-8 text-red-500">
        Failed to load proposals.
      </div>
    );
  }

  const proposals = data?.data ?? [];

  return (
    <div className="space-y-8 p-8">

      {/* Header */}

      <div>

        <h1 className="text-4xl font-bold text-white">
          My Proposals
        </h1>

        <p className="mt-2 text-slate-400">
          Track all proposals you've submitted.
        </p>

      </div>

      {/* Proposal List */}

      {proposals.length === 0 ? (

        <div className="rounded-xl bg-slate-900 p-8 text-center text-slate-400">
          You haven't submitted any proposals yet.
        </div>

      ) : (

        <div className="space-y-6">

          {proposals.map((proposal) => (

            <MyProposalCard
              key={proposal.id}
              proposal={proposal}
            />

          ))}

        </div>

      )}

    </div>
  );
}

export default MyProposalsPage;