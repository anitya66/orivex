import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

import { useAuth } from "@/contexts/AuthContext";

import { useContract } from "../hooks/useContract";
import { useStartContract } from "../hooks/useStartContract";
import { useSubmitWork } from "../hooks/useSubmitWork";
import { useApproveWork } from "../hooks/useApproveWork";

function ContractDetailsPage() {
  const { id } = useParams();

  const { user } = useAuth();

  const queryClient = useQueryClient();

  const {
    data,
    isLoading,
    isError,
  } = useContract(id);

  const {
    mutate: startContract,
    isPending: starting,
  } = useStartContract();

  const {
    mutate: submitWork,
    isPending: submitting,
  } = useSubmitWork();

  const {
    mutate: approveWork,
    isPending: approving,
  } = useApproveWork();

  function refresh() {
    queryClient.invalidateQueries({
      queryKey: ["contract", id],
    });

    queryClient.invalidateQueries({
      queryKey: ["client-contracts"],
    });

    queryClient.invalidateQueries({
      queryKey: ["my-contracts"],
    });
  }

  function handleStart() {
    startContract(id, {
      onSuccess: () => {
        toast.success("Contract started.");
        refresh();
      },

      onError: (error) => {
        toast.error(
          error.response?.data?.message ||
            "Failed to start contract."
        );
      },
    });
  }

  function handleSubmit() {
    submitWork(id, {
      onSuccess: () => {
        toast.success("Work submitted.");
        refresh();
      },

      onError: (error) => {
        toast.error(
          error.response?.data?.message ||
            "Failed to submit work."
        );
      },
    });
  }

  function handleApprove() {
    approveWork(id, {
      onSuccess: () => {
        toast.success("Work approved.");
        refresh();
      },

      onError: (error) => {
        toast.error(
          error.response?.data?.message ||
            "Failed to approve work."
        );
      },
    });
  }

  if (isLoading) {
    return (
      <div className="p-8 text-white">
        Loading contract...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-8 text-red-500">
        Failed to load contract.
      </div>
    );
  }

  const contract = data.data;

  return (
    <div className="mx-auto max-w-6xl space-y-8 p-8">

      {/* Header */}

      <div>

        <h1 className="text-4xl font-bold text-white">
          Contract Details
        </h1>

        <p className="mt-2 text-slate-400">
          Manage the project contract.
        </p>

      </div>

      {/* Contract Information */}

      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8">

        <div className="grid gap-6 md:grid-cols-2">

          <Info
            title="Project"
            value={contract.projectTitle}
          />

          <Info
            title="Status"
            value={contract.status}
          />

          <Info
            title="Budget"
            value={`₹${contract.agreedBudget}`}
          />

          <Info
            title="Deadline"
            value={contract.deadline}
          />

          <Info
            title="Client"
            value={contract.clientName}
          />

          <Info
            title="Freelancer"
            value={contract.freelancerName}
          />

        </div>

      </div>

      {/* Actions */}

      <div className="flex flex-wrap gap-4">

        {user?.role === "FREELANCER" &&
          contract.status === "PENDING" && (

            <button
              onClick={handleStart}
              disabled={starting}
              className="rounded-xl bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {starting
                ? "Starting..."
                : "Start Contract"}
            </button>

          )}

        {user?.role === "FREELANCER" &&
          contract.status === "ACTIVE" && (

            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {submitting
                ? "Submitting..."
                : "Submit Work"}
            </button>

          )}

        {user?.role === "CLIENT" &&
          contract.status === "SUBMITTED" && (

            <button
              onClick={handleApprove}
              disabled={approving}
              className="rounded-xl bg-purple-600 px-6 py-3 font-semibold text-white transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {approving
                ? "Approving..."
                : "Approve Work"}
            </button>

          )}

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

      <p className="mt-2 text-lg font-semibold text-white">
        {value ?? "-"}
      </p>

    </div>
  );
}

export default ContractDetailsPage;