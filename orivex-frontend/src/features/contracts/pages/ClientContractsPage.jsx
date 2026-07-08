import ContractGrid from "../components/ContractGrid";
import { useClientContracts } from "../hooks/useClientContracts";

function ClientContractsPage() {
  const {
    data,
    isLoading,
    isError,
  } = useClientContracts();

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
          Client Contracts
        </h1>

        <p className="mt-2 text-slate-400">
          Manage all active contracts.
        </p>
      </div>

      <ContractGrid
        contracts={data.data}
        role="CLIENT"
      />

    </div>
  );
}

export default ClientContractsPage;