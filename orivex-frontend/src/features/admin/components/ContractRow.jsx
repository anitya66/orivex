import { Eye } from "lucide-react";

import ContractStatusBadge from "./ContractStatusBadge";

function ContractRow({

  contract,

  onView,

}) {

  return (

    <tr className="border-b border-slate-800 transition-all duration-200 hover:bg-slate-900/60">

      {/* Project */}

      <td className="px-6 py-5">

        <div>

          <p className="font-semibold text-white">

            {contract.projectTitle}

          </p>

          <p className="mt-1 text-xs text-slate-500">

            Contract #{contract.id}

          </p>

        </div>

      </td>

      {/* Client */}

      <td className="px-6 py-5">

        <div className="text-sm">

          <p className="font-medium text-slate-200">

            {contract.clientName}

          </p>

        </div>

      </td>

      {/* Freelancer */}

      <td className="px-6 py-5">

        <div className="text-sm">

          <p className="font-medium text-slate-200">

            {contract.freelancerName}

          </p>

        </div>

      </td>

      {/* Budget */}

      <td className="px-6 py-5">

        <span className="font-bold text-emerald-400">

          ₹{contract.agreedBudget}

        </span>

      </td>

      {/* Deadline */}

      <td className="px-6 py-5">

        <span className="text-slate-300">

          {contract.deadline}

        </span>

      </td>

      {/* Status */}

      <td className="px-6 py-5">

        <ContractStatusBadge

          status={contract.status}

        />

      </td>

      {/* Action */}

      <td className="px-6 py-5">

        <div className="flex justify-center">

          <button

            onClick={() => onView(contract)}

            className="rounded-xl bg-blue-600 p-2.5 text-white transition-all hover:scale-105 hover:bg-blue-700"

          >

            <Eye size={18} />

          </button>

        </div>

      </td>

    </tr>

  );

}

export default ContractRow;