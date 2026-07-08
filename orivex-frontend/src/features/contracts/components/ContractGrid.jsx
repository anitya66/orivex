import ContractCard from "./ContractCard";

function ContractGrid({
  contracts,
  role,
}) {
  if (!contracts.length) {
    return (
      <div className="rounded-xl bg-slate-900 p-10 text-center text-slate-400">
        No contracts found.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {contracts.map((contract) => (
        <ContractCard
          key={contract.id}
          contract={contract}
          role={role}
        />
      ))}
    </div>
  );
}

export default ContractGrid;