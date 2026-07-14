import { X, CalendarDays, IndianRupee } from "lucide-react";

import { useContractDetails } from "../hooks/useContractDetails";

import ContractStatusBadge from "./ContractStatusBadge";

function InfoCard({

  label,

  value,

}) {

  return (

    <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5">

      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">

        {label}

      </p>

      <p className="mt-3 break-words text-base font-semibold text-white">

        {value || "-"}

      </p>

    </div>

  );

}

function ContractDetailsModal({

  contractId,

  onClose,

}) {

  const {

    data,

    isLoading,

  } = useContractDetails(contractId);

  if (isLoading) {

    return (

      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">

        <div className="rounded-3xl border border-slate-800 bg-slate-900 px-10 py-8 text-white">

          Loading Contract...

        </div>

      </div>

    );

  }

  const contract = data.data;

  return (

    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 p-6">

      <div className="mx-auto my-10 w-full max-w-5xl rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950 shadow-2xl">

        {/* Header */}

        <div className="flex items-start justify-between border-b border-slate-800 p-8">

          <div>

            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-indigo-400">

              CONTRACT DETAILS

            </p>

            <h2 className="mt-3 text-4xl font-black text-white">

              {contract.projectTitle}

            </h2>

            <div className="mt-5">

              <ContractStatusBadge

                status={contract.status}

              />

            </div>

          </div>

          <button

            onClick={onClose}

            className="rounded-xl bg-slate-800 p-3 text-slate-400 transition hover:bg-slate-700 hover:text-white"

          >

            <X size={22} />

          </button>

        </div>

        {/* Body */}

        <div className="space-y-8 p-8">

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

            <InfoCard

              label="Client"

              value={contract.clientName}

            />

            <InfoCard

              label="Freelancer"

              value={contract.freelancerName}

            />

            <InfoCard

              label="Project"

              value={contract.projectTitle}

            />

          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5">

              <div className="flex items-center gap-3">

                <IndianRupee

                  className="text-emerald-400"

                  size={20}

                />

                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">

                  Agreed Budget

                </span>

              </div>

              <p className="mt-4 text-3xl font-black text-emerald-400">

                ₹{contract.agreedBudget}

              </p>

            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5">

              <div className="flex items-center gap-3">

                <CalendarDays

                  className="text-indigo-400"

                  size={20}

                />

                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">

                  Deadline

                </span>

              </div>

              <p className="mt-4 text-lg font-bold text-white">

                {contract.deadline}

              </p>

            </div>

            <InfoCard

              label="Created"

              value={contract.createdAt}

            />

          </div>

          <div className="grid gap-6 md:grid-cols-2">

            <InfoCard

              label="Started At"

              value={contract.startedAt}

            />

            <InfoCard

              label="Submitted At"

              value={contract.submittedAt}

            />

          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6">

            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">

              Submission URL

            </p>

            {contract.submissionUrl ? (

              <a

                href={contract.submissionUrl}

                target="_blank"

                rel="noreferrer"

                className="mt-4 block break-all text-blue-400 hover:underline"

              >

                {contract.submissionUrl}

              </a>

            ) : (

              <p className="mt-4 text-slate-400">

                No submission uploaded.

              </p>

            )}

          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6">

            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">

              Submission Notes

            </p>

            <p className="mt-4 whitespace-pre-wrap leading-7 text-slate-300">

              {contract.submissionNotes ||

                "No submission notes available."}

            </p>

          </div>

        </div>

      </div>

    </div>

  );

}

export default ContractDetailsModal;