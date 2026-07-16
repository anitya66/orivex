import {
  IndianRupee,
  CalendarDays,
  User,
  Mail,
  CheckCircle2,
  XCircle,
} from "lucide-react";

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

  function refreshQueries() {
  queryClient.invalidateQueries({
    queryKey: ["project-proposals", proposal.projectId],
  });

  queryClient.invalidateQueries({
    queryKey: ["project", proposal.projectId],
  });

  queryClient.invalidateQueries({
    queryKey: ["my-proposals"],
  });

  queryClient.invalidateQueries({
    queryKey: ["my-contracts"],
  });

  queryClient.invalidateQueries({
    queryKey: ["client-contracts"],
  });
}

  function handleAccept() {
    acceptProposal(proposal.id, {
      onSuccess: () => {
        toast.success("Proposal accepted successfully.");
        refreshQueries();
      },
      onError: (error) => {
        toast.error(
          error.response?.data?.message ??
            "Failed to accept proposal."
        );
      },
    });
  }

  function handleReject() {
    rejectProposal(proposal.id, {
      onSuccess: () => {
        toast.success("Proposal rejected successfully.");
        refreshQueries();
      },
      onError: (error) => {
        toast.error(
          error.response?.data?.message ??
            "Failed to reject proposal."
        );
      },
    });
  }

  return (
    <div
      className="
        group
        relative
        overflow-hidden
        rounded-3xl
        border
        border-slate-800
        bg-gradient-to-br
        from-slate-900
        via-slate-900
        to-slate-950
        p-8
        transition-all
        duration-300
        hover:-translate-y-2
        hover:border-blue-500/40
        hover:shadow-[0_20px_60px_rgba(37,99,235,0.18)]
      "
    >
      <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-blue-500/10 blur-[120px]" />

      {/* Header */}

      <div className="relative flex flex-col gap-5 md:flex-row md:items-start md:justify-between">

        <div className="flex items-start gap-4">

          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-lg font-bold text-white">
            {proposal.freelancerName?.charAt(0)?.toUpperCase()}
          </div>

          <div>

            <h3 className="text-2xl font-bold text-white">
              {proposal.freelancerName}
            </h3>

            <div className="mt-2 flex items-center gap-2 text-slate-400">

              <Mail size={16} />

              <span>{proposal.freelancerEmail}</span>

            </div>

          </div>

        </div>

        <StatusBadge status={proposal.status} />

      </div>

      {/* Stats */}

      <div className="mt-8 grid gap-5 md:grid-cols-2">

        <InfoCard
          icon={IndianRupee}
          color="text-emerald-400"
          title="Proposed Budget"
          value={`₹${proposal.proposedBudget}`}
        />

        <InfoCard
          icon={CalendarDays}
          color="text-cyan-400"
          title="Estimated Days"
          value={`${proposal.estimatedDays} Days`}
        />

      </div>

      {/* Cover Letter */}

      <div className="mt-8">

        <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-500">
          Cover Letter
        </p>

        <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5">

          <p className="break-all whitespace-pre-wrap leading-8 text-slate-300">
            {proposal.coverLetter}
          </p>

        </div>

      </div>

      {/* Actions */}

      {proposal.status === "PENDING" && (

        <div className="mt-8 flex flex-wrap gap-4">

          <button
            onClick={handleAccept}
            disabled={isPending}
            className="flex items-center gap-2 rounded-2xl bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700 disabled:opacity-50"
          >
            <CheckCircle2 size={18} />

            {isPending ? "Accepting..." : "Accept Proposal"}
          </button>

          <button
            onClick={handleReject}
            disabled={isRejecting}
            className="flex items-center gap-2 rounded-2xl bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700 disabled:opacity-50"
          >
            <XCircle size={18} />

            {isRejecting ? "Rejecting..." : "Reject Proposal"}
          </button>

        </div>

      )}

    </div>
  );
}

function InfoCard({
  icon: Icon,
  title,
  value,
  color,
}) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-slate-800 bg-slate-900/70 p-5">

      <div className="rounded-xl bg-slate-800 p-3">

        <Icon
          size={20}
          className={color}
        />

      </div>

      <div>

        <p className="text-xs uppercase tracking-wider text-slate-500">
          {title}
        </p>

        <p className="mt-1 text-xl font-bold text-white">
          {value}
        </p>

      </div>

    </div>
  );
}

function StatusBadge({ status }) {
  const styles = {
    PENDING: "bg-yellow-500/10 text-yellow-400",
    ACCEPTED: "bg-green-500/10 text-green-400",
    REJECTED: "bg-red-500/10 text-red-400",
  };

  return (
    <span
      className={`rounded-full px-4 py-2 text-sm font-semibold ${
        styles[status] ?? "bg-slate-700 text-white"
      }`}
    >
      {status}
    </span>
  );
}

export default ProposalCard;