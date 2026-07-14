import {
  FileText,
  Briefcase,
} from "lucide-react";

import ContractCard from "./ContractCard";

function ContractGrid({
  contracts,
  role,
}) {
  if (!contracts?.length) {
    return (
      <div className="rounded-3xl border border-dashed border-slate-700 bg-slate-900/60 px-10 py-20 text-center">

        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-slate-800">

          <FileText
            size={38}
            className="text-slate-500"
          />

        </div>

        <h2 className="mt-6 text-2xl font-bold text-white">
          No Contracts Yet
        </h2>

        <p className="mx-auto mt-3 max-w-lg leading-7 text-slate-400">

          {role === "CLIENT"
            ? "You haven't hired any freelancer yet. Accepted proposals will appear here."
            : "You don't have any active contracts yet. Once a client accepts your proposal, it will appear here."}

        </p>

      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* Top Summary */}

      <div className="flex flex-col gap-5 rounded-3xl border border-slate-800 bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 p-6 lg:flex-row lg:items-center lg:justify-between">

        <div>

          <p className="text-sm uppercase tracking-[0.25em] text-blue-400">
            Contracts
          </p>

          <h2 className="mt-2 text-3xl font-black text-white">
            {contracts.length} Active Contract
            {contracts.length > 1 ? "s" : ""}
          </h2>

        </div>

        <div className="flex items-center gap-3 rounded-2xl border border-slate-800 bg-slate-900 px-5 py-4">

          <div className="rounded-xl bg-blue-500/10 p-3">

            <Briefcase
              className="text-blue-400"
              size={22}
            />

          </div>

          <div>

            <p className="text-xs uppercase tracking-wider text-slate-500">
              Workspace
            </p>

            <p className="font-semibold text-white">
              Premium Contract Manager
            </p>

          </div>

        </div>

      </div>

      {/* Cards */}

      <div className="space-y-6">

        {contracts.map((contract) => (

          <ContractCard
            key={contract.id}
            contract={contract}
            role={role}
          />

        ))}

      </div>

    </div>
  );
}

export default ContractGrid;