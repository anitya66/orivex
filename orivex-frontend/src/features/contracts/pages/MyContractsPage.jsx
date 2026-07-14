import { BriefcaseBusiness } from "lucide-react";

import ContractGrid from "../components/ContractGrid";
import { useMyContracts } from "../hooks/useMyContracts";

function MyContractsPage() {
  const {
    data,
    isLoading,
    isError,
  } = useMyContracts();

  if (isLoading) {
    return (
      <div className="space-y-8">

        <div className="h-40 animate-pulse rounded-3xl bg-slate-900" />

        <div className="h-80 animate-pulse rounded-3xl bg-slate-900" />

      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-3xl border border-red-500/20 bg-red-500/10 p-10 text-center">

        <h2 className="text-2xl font-bold text-red-400">

          Failed to load contracts

        </h2>

        <p className="mt-3 text-slate-400">

          Please refresh the page.

        </p>

      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* Hero */}

      <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-r from-emerald-600/20 via-slate-900 to-slate-900 p-8">

        <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-emerald-600/10 blur-3xl" />

        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

          <div>

            <span className="rounded-full bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-400">

              Freelancer Workspace

            </span>

            <h1 className="mt-5 text-5xl font-black text-white">

              My Contracts

            </h1>

            <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-400">

              Manage your ongoing contracts, submit work and get paid securely.

            </p>

          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">

            <BriefcaseBusiness
              size={54}
              className="text-emerald-400"
            />

          </div>

        </div>

      </div>

      <ContractGrid
        contracts={data.data}
        role="FREELANCER"
      />

    </div>
  );
}

export default MyContractsPage;