import {
  CalendarDays,
  ArrowRight,
  IndianRupee,
  FileText,
} from "lucide-react";

import { Link } from "react-router-dom";

function MyProposalCard({ proposal }) {
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
      {/* Background Glow */}

      <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-blue-500/10 blur-[120px]" />

      {/* Header */}

      <div className="relative flex flex-col gap-5 md:flex-row md:items-start md:justify-between">

        <div>

          <h2 className="text-3xl font-bold text-white">
            {proposal.projectTitle}
          </h2>

          <p className="mt-2 text-slate-400">
            {proposal.clientName}
          </p>

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

        <p className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-slate-500">

          <FileText size={16} />

          Cover Letter

        </p>

        <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5">

          <p
            className="leading-8 text-slate-300"
            style={{
              whiteSpace: "pre-wrap",
              overflowWrap: "anywhere",
              wordBreak: "break-word",
            }}
          >
            {proposal.coverLetter}
          </p>

        </div>

      </div>

      {/* Footer */}

      <div className="mt-8 flex justify-end">

        <Link
          to={`/dashboard/browse-projects/${proposal.projectId}`}
          className="inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-6 py-3 font-semibold text-white transition-all hover:gap-3 hover:bg-blue-700"
        >

          View Project

          <ArrowRight size={18} />

        </Link>

      </div>

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

export default MyProposalCard;