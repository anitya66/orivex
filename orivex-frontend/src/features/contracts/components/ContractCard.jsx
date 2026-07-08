import { Link } from "react-router-dom";

function ContractCard({ contract, role }) {
  const statusColors = {
    PENDING: "bg-yellow-900 text-yellow-400",
    ACTIVE: "bg-green-900 text-green-400",
    SUBMITTED: "bg-blue-900 text-blue-400",
    COMPLETED: "bg-emerald-900 text-emerald-400",
    CANCELLED: "bg-red-900 text-red-400",
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

      <div className="flex items-start justify-between">

        <div>
          <h2 className="text-2xl font-bold text-white">
            {contract.projectTitle}
          </h2>

          <p className="mt-2 text-slate-400">
            {role === "CLIENT"
              ? contract.freelancerName
              : contract.clientName}
          </p>
        </div>

        <span
          className={`rounded-full px-4 py-2 text-sm font-semibold ${
            statusColors[contract.status] ??
            "bg-slate-700 text-white"
          }`}
        >
          {contract.status}
        </span>

      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-3">

        <Info
          title="Budget"
          value={`₹${contract.agreedBudget}`}
        />

        <Info
          title="Deadline"
          value={contract.deadline}
        />

        <Info
          title="Contract Id"
          value={`#${contract.id}`}
        />

      </div>

      <div className="mt-6">

        <Link
          to={`/dashboard/contracts/${contract.id}`}
          className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          View Contract
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

export default ContractCard;