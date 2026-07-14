import ContractRow from "./ContractRow";

function ContractTable({

  contracts,

  onView,

}) {

  if (!contracts.length) {

    return (

      <div className="rounded-3xl border border-slate-800 bg-slate-900 p-16 text-center">

        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-slate-800">

          <span className="text-3xl">📄</span>

        </div>

        <h2 className="mt-6 text-2xl font-bold text-white">

          No Contracts Found

        </h2>

        <p className="mt-3 text-slate-400">

          There are currently no contracts matching your filters.

        </p>

      </div>

    );

  }

  return (

    <div className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-950 shadow-2xl">

      <div className="overflow-x-auto">

        <table className="min-w-full">

          <thead className="sticky top-0 bg-slate-900">

            <tr className="border-b border-slate-800">

              <th className="px-6 py-5 text-left text-xs font-bold uppercase tracking-[0.18em] text-slate-400">

                Project

              </th>

              <th className="px-6 py-5 text-left text-xs font-bold uppercase tracking-[0.18em] text-slate-400">

                Client

              </th>

              <th className="px-6 py-5 text-left text-xs font-bold uppercase tracking-[0.18em] text-slate-400">

                Freelancer

              </th>

              <th className="px-6 py-5 text-left text-xs font-bold uppercase tracking-[0.18em] text-slate-400">

                Budget

              </th>

              <th className="px-6 py-5 text-left text-xs font-bold uppercase tracking-[0.18em] text-slate-400">

                Deadline

              </th>

              <th className="px-6 py-5 text-left text-xs font-bold uppercase tracking-[0.18em] text-slate-400">

                Status

              </th>

              <th className="px-6 py-5 text-center text-xs font-bold uppercase tracking-[0.18em] text-slate-400">

                Actions

              </th>

            </tr>

          </thead>

          <tbody>

            {contracts.map((contract) => (

              <ContractRow

                key={contract.id}

                contract={contract}

                onView={onView}

              />

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );

}

export default ContractTable;