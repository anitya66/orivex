import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

import { useAcceptProposal } from "@/features/proposals/hooks/useAcceptProposal";
import { useRejectProposal } from "@/features/proposals/hooks/useRejectProposal";

function ProposalCard({ proposal }) {

  const queryClient = useQueryClient();

  const {
    mutate: acceptProposal,
    isPending,
  } = useAcceptProposal();

  const {
    mutate: rejectProposal,
    isPending: isRejecting,
  } = useRejectProposal();

  function handleAccept() {

    acceptProposal(proposal.id, {

      onSuccess: () => {

        toast.success(
          "Proposal accepted successfully."
        );

        queryClient.invalidateQueries({
          queryKey: [
            "project-proposals",
            proposal.projectId,
          ],
        });

        queryClient.invalidateQueries({
          queryKey: [
            "project",
            proposal.projectId,
          ],
        });

      },

      onError: (error) => {

        toast.error(
          error.response?.data?.message ||
          "Failed to accept proposal."
        );

      },

    });

  }

  function handleReject() {

    rejectProposal(proposal.id, {

      onSuccess: () => {

        toast.success(
          "Proposal rejected successfully."
        );

        queryClient.invalidateQueries({
          queryKey: [
            "project-proposals",
            proposal.projectId,
          ],
        });

        queryClient.invalidateQueries({
          queryKey: [
            "project",
            proposal.projectId,
          ],
        });

      },

      onError: (error) => {

        toast.error(
          error.response?.data?.message ||
          "Failed to reject proposal."
        );

      },

    });

  }

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

      {/* Header */}

      <div className="flex items-start justify-between">

        <div>

          <h3 className="text-xl font-bold text-white">
            {proposal.freelancerName}
          </h3>

          <p className="mt-1 text-slate-400">
            {proposal.freelancerEmail}
          </p>

        </div>

        <span
          className={`rounded-full px-4 py-2 text-sm font-semibold ${
            proposal.status === "PENDING"
              ? "bg-yellow-900 text-yellow-400"
              : proposal.status === "ACCEPTED"
              ? "bg-green-900 text-green-400"
              : "bg-red-900 text-red-400"
          }`}
        >
          {proposal.status}
        </span>

      </div>

      {/* Proposal Info */}

      <div className="mt-6 grid gap-6 md:grid-cols-2">

        <Info
          title="Proposed Budget"
          value={`₹${proposal.proposedBudget}`}
        />

        <Info
          title="Estimated Days"
          value={`${proposal.estimatedDays} Days`}
        />

      </div>

      {/* Cover Letter */}

      <div className="mt-6">

        <p className="mb-2 text-sm text-slate-400">
          Cover Letter
        </p>

        <div className="rounded-xl bg-slate-950 p-4 text-slate-300">
          {proposal.coverLetter}
        </div>

      </div>

      {/* Actions */}

      {proposal.status === "PENDING" && (

        <div className="mt-6 flex gap-4">

          <button
            onClick={handleAccept}
            disabled={isPending}
            className="rounded-xl bg-green-600 px-5 py-2 font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isPending
              ? "Accepting..."
              : "Accept"}
          </button>

          <button
            onClick={handleReject}
            disabled={isRejecting}
            className="rounded-xl bg-red-600 px-5 py-2 font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isRejecting
              ? "Rejecting..."
              : "Reject"}
          </button>

        </div>

      )}

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

export default ProposalCard;