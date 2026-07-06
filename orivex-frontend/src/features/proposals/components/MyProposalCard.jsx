import { Link } from "react-router-dom";

function MyProposalCard({ proposal }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

      {/* Header */}

      <div className="flex items-start justify-between">

        <div>

          <h2 className="text-2xl font-bold text-white">
            {proposal.projectTitle}
          </h2>

          <p className="mt-2 text-slate-400">
            {proposal.clientName}
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

      {/* Proposal Details */}

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

      {/* View Project */}

      <div className="mt-6">

        <Link
          to={`/dashboard/browse-projects/${proposal.projectId}`}
          className="inline-flex rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          View Project
        </Link>

      </div>

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

export default MyProposalCard;