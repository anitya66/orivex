import ContractGrid from "../components/ContractGrid";
import { useMyContracts } from "../hooks/useMyContracts";

function MyContractsPage() {
  const {
    data,
    isLoading,
    isError,
  } = useMyContracts();

  if (isLoading)
    return (
      <div className="p-8 text-white">
        Loading...
      </div>
    );

  if (isError)
    return (
      <div className="p-8 text-red-500">
        Failed to load contracts.
      </div>
    );

  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-4xl font-bold text-white">
          My Contracts
        </h1>

        <p className="mt-2 text-slate-400">
          View your active contracts.
        </p>
      </div>

      <ContractGrid
        contracts={data.data}
        role="FREELANCER"
      />

    </div>
  );
}

export default MyContractsPage;