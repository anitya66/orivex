import { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { useCreatePayment } from "@/features/payments/hooks/useCreatePayment";
import { useCreateOrder } from "@/features/payments/hooks/useCreateOrder";
import { useVerifyPayment } from "@/features/payments/hooks/useVerifyPayment";
import { openRazorpayCheckout } from "@/features/payments/utils/openRazorpayCheckout";
import { useAuth } from "@/contexts/AuthContext";


import SubmitWorkModal from "../components/SubmitWorkModal";

import { useContract } from "../hooks/useContract";
import { useStartContract } from "../hooks/useStartContract";
import { useSubmitWork } from "../hooks/useSubmitWork";
import { useApproveWork } from "../hooks/useApproveWork";

function ContractDetailsPage() {
  const { id } = useParams();

  const { user } = useAuth();

  const queryClient = useQueryClient();

  const [openSubmitModal, setOpenSubmitModal] =
    useState(false);

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

  const {
    mutateAsync: createPayment,
  } = useCreatePayment();

  const {
    mutateAsync: createOrder,
  } = useCreateOrder();

  const {
    mutateAsync: verifyPayment,
  } = useVerifyPayment();

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

  async function handlePayNow() {
    try {
      const payment = await createPayment(contract.id);

      const order = await createOrder(payment.id);

      openRazorpayCheckout({
        order,
        user,

        onSuccess: async (response) => {
          try {
            await verifyPayment({
              paymentId: payment.id,
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
            });

            toast.success("Payment Successful.");

            refresh();
          } catch (error) {
            toast.error(
              error.response?.data?.message ??
              "Payment verification failed."
            );
          }
        },
      });
    } catch (error) {
      toast.error(
        error.response?.data?.message ??
        "Unable to initiate payment."
      );
    }
  }

  function handleStart() {
    startContract(id, {
      onSuccess: () => {
        toast.success("Contract started.");
        refresh();
      },

      onError: (error) => {
        toast.error(
          error.response?.data?.message ??
          "Failed to start contract."
        );
      },
    });
  }

  function handleSubmit(submissionData) {
    submitWork(
      {
        contractId: id,
        submissionData,
      },
      {
        onSuccess: () => {
          toast.success("Work submitted.");

          setOpenSubmitModal(false);

          refresh();
        },

        onError: (error) => {
          toast.error(
            error.response?.data?.message ??
            "Failed to submit work."
          );
        },
      }
    );
  }

  function handleApprove() {
    approveWork(id, {
      onSuccess: () => {
        toast.success("Work approved.");
        refresh();
      },

      onError: (error) => {
        toast.error(
          error.response?.data?.message ??
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
    <>
      <div className="mx-auto max-w-7xl space-y-8 p-6 lg:p-8">

        {/* HERO */}

        <section className="relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 p-8">

          <div className="absolute right-0 top-0 h-60 w-60 rounded-full bg-emerald-500/10 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-60 w-60 rounded-full bg-cyan-500/10 blur-3xl" />

          <div className="relative flex flex-col justify-between gap-8 lg:flex-row lg:items-center">

            <div>

              <p className="text-sm font-medium uppercase tracking-[0.25em] text-emerald-400">
                ORIVEX CONTRACT
              </p>

              <h1 className="mt-3 text-4xl font-bold text-white lg:text-5xl">
                {contract.projectTitle}
              </h1>

              <p className="mt-4 max-w-2xl text-slate-400">
                Manage payments, milestones, approvals and project
                delivery from one place.
              </p>

            </div>

            <div className="flex flex-col items-start gap-3 rounded-2xl border border-slate-700 bg-slate-900/70 p-6 backdrop-blur lg:min-w-[250px]">

              <span className="text-xs uppercase tracking-widest text-slate-400">
                Current Status
              </span>

              <StatusBadge status={contract.status} />

              <span className="text-sm text-slate-500">
                Contract lifecycle updates automatically.
              </span>

            </div>

          </div>

        </section>

        {/* OVERVIEW */}

        <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

          <OverviewCard
            title="Budget"
            value={`₹${contract.agreedBudget}`}
            subtitle="Agreed project value"
          />

          <OverviewCard
            title="Deadline"
            value={contract.deadline}
            subtitle="Expected completion"
          />

          <OverviewCard
            title="Client"
            value={contract.clientName}
            subtitle="Project owner"
          />

          <OverviewCard
            title="Freelancer"
            value={contract.freelancerName}
            subtitle="Assigned talent"
          />

        </section>

        {/* DETAILS */}

        <section className="grid gap-8 lg:grid-cols-3">

          <div className="space-y-6 lg:col-span-2">

            <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8">

              <div className="mb-8 flex items-center justify-between">

                <div>

                  <h2 className="text-2xl font-semibold text-white">
                    Contract Information
                  </h2>

                  <p className="mt-2 text-slate-400">
                    Primary information about this engagement.
                  </p>

                </div>

              </div>

              <div className="grid gap-6 md:grid-cols-2">

                <InfoCard
                  label="Project Name"
                  value={contract.projectTitle}
                />

                <InfoCard
                  label="Status"
                  value={<StatusBadge status={contract.status} />}
                />

                <InfoCard
                  label="Budget"
                  value={`₹${contract.agreedBudget}`}
                />

                <InfoCard
                  label="Deadline"
                  value={contract.deadline}
                />

                <InfoCard
                  label="Client"
                  value={contract.clientName}
                />

                <InfoCard
                  label="Freelancer"
                  value={contract.freelancerName}
                />

              </div>

            </div>
            <div className="grid gap-6 lg:grid-cols-2">

              {/* Client */}

              <div className="rounded-3xl border border-slate-800 bg-slate-900 p-7">

                <div className="flex items-center gap-4">

                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/15 text-xl font-bold text-emerald-400">
                    C
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-white">
                      Client
                    </h3>

                    <p className="text-sm text-slate-400">
                      Project Owner
                    </p>
                  </div>

                </div>

                <div className="mt-8 space-y-6">

                  <InfoCard
                    label="Name"
                    value={contract.clientName}
                  />

                  <InfoCard
                    label="Role"
                    value="Client"
                  />

                  <InfoCard
                    label="Payment Responsibility"
                    value="Funds Project"
                  />

                </div>

              </div>

              {/* Freelancer */}

              <div className="rounded-3xl border border-slate-800 bg-slate-900 p-7">

                <div className="flex items-center gap-4">

                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500/15 text-xl font-bold text-cyan-400">
                    F
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-white">
                      Freelancer
                    </h3>

                    <p className="text-sm text-slate-400">
                      Project Executor
                    </p>
                  </div>

                </div>

                <div className="mt-8 space-y-6">

                  <InfoCard
                    label="Name"
                    value={contract.freelancerName}
                  />

                  <InfoCard
                    label="Role"
                    value="Freelancer"
                  />

                  <InfoCard
                    label="Current Status"
                    value={contract.status}
                  />

                </div>

              </div>

            </div>

          </div>

          {/* RIGHT SIDEBAR */}

          <aside className="space-y-6">

            <div className="rounded-3xl border border-slate-800 bg-slate-900 p-7">

              <h3 className="text-xl font-semibold text-white">
                Payment Summary
              </h3>

              <div className="mt-8 space-y-5">

                <SummaryRow
                  label="Contract Budget"
                  value={`₹${contract.agreedBudget}`}
                />

                <SummaryRow
                  label="Current Status"
                  value={contract.status}
                />

                <SummaryRow
                  label="Deadline"
                  value={contract.deadline}
                />

              </div>

            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-900 p-7">

              <h3 className="text-xl font-semibold text-white">
                Workflow
              </h3>

              <div className="mt-7 space-y-5">

                <TimelineItem
                  active={true}
                  title="Contract Created"
                />

                <TimelineItem
                  active={[
                    "PAID",
                    "ACTIVE",
                    "SUBMITTED",
                    "COMPLETED",
                  ].includes(contract.status)}
                  title="Payment Completed"
                />

                <TimelineItem
                  active={[
                    "ACTIVE",
                    "SUBMITTED",
                    "COMPLETED",
                  ].includes(contract.status)}
                  title="Project Started"
                />

                <TimelineItem
                  active={[
                    "SUBMITTED",
                    "COMPLETED",
                  ].includes(contract.status)}
                  title="Work Submitted"
                />

                <TimelineItem
                  active={contract.status === "COMPLETED"}
                  title="Contract Finished"
                  last
                />

              </div>

            </div>

            <div className="rounded-3xl border border-emerald-500/20 bg-emerald-500/10 p-7">

              <p className="text-sm uppercase tracking-widest text-emerald-400">
                Project Value
              </p>

              <h2 className="mt-3 text-4xl font-bold text-white">
                ₹{contract.agreedBudget}
              </h2>

              <p className="mt-4 text-sm leading-7 text-slate-300">
                Secure milestone payments with escrow protection.
                Every transaction is verified before funds are
                released.
              </p>

            </div>

            {/* ACTION BUTTONS START */}

            <div className="rounded-3xl border border-slate-800 bg-slate-900 p-7">

              <h3 className="mb-6 text-xl font-semibold text-white">
                Available Actions
              </h3>

              <div className="space-y-4">
                {user?.role === "CLIENT" &&
                  contract.status === "PENDING_PAYMENT" && (
                    <button
                      onClick={handlePayNow}
                      className="w-full rounded-2xl bg-emerald-600 px-6 py-4 text-lg font-semibold text-white transition duration-200 hover:bg-emerald-500"
                    >
                      💳 Pay Now
                    </button>
                  )}

                {user?.role === "FREELANCER" &&
                  contract.status === "PAID" && (
                    <button
                      onClick={handleStart}
                      disabled={starting}
                      className="w-full rounded-2xl bg-blue-600 px-6 py-4 text-lg font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {starting
                        ? "Starting..."
                        : "🚀 Start Contract"}
                    </button>
                  )}

                {user?.role === "FREELANCER" &&
                  contract.status === "ACTIVE" && (
                    <button
                      onClick={() =>
                        setOpenSubmitModal(true)
                      }
                      disabled={submitting}
                      className="w-full rounded-2xl bg-cyan-600 px-6 py-4 text-lg font-semibold text-white transition hover:bg-cyan-500 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {submitting
                        ? "Submitting..."
                        : "📤 Submit Work"}
                    </button>
                  )}

                {user?.role === "CLIENT" &&
                  contract.status === "SUBMITTED" && (
                    <button
                      onClick={handleApprove}
                      disabled={approving}
                      className="w-full rounded-2xl bg-purple-600 px-6 py-4 text-lg font-semibold text-white transition hover:bg-purple-500 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {approving
                        ? "Approving..."
                        : "✅ Approve Work"}
                    </button>
                  )}

                {!(
                  (user?.role === "CLIENT" &&
                    contract.status === "PENDING_PAYMENT") ||
                  (user?.role === "CLIENT" &&
                    contract.status === "SUBMITTED") ||
                  (user?.role === "FREELANCER" &&
                    contract.status === "PAID") ||
                  (user?.role === "FREELANCER" &&
                    contract.status === "ACTIVE")
                ) && (
                    <div className="rounded-2xl border border-dashed border-slate-700 py-8 text-center text-sm text-slate-500">
                      No actions available for the current
                      contract status.
                    </div>
                  )}

              </div>

            </div>

          </aside>

        </section>

      </div>

      {openSubmitModal && (
        <SubmitWorkModal
          loading={submitting}
          onClose={() =>
            setOpenSubmitModal(false)
          }
          onSubmit={handleSubmit}
        />
      )}
    </>
  );
}

function StatusBadge({ status }) {
  const styles = {
    PENDING_PAYMENT:
      "bg-amber-500/15 text-amber-400 border border-amber-500/30",
    PAID:
      "bg-sky-500/15 text-sky-400 border border-sky-500/30",
    ACTIVE:
      "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30",
    SUBMITTED:
      "bg-violet-500/15 text-violet-400 border border-violet-500/30",
    COMPLETED:
      "bg-green-500/15 text-green-400 border border-green-500/30",
    CANCELLED:
      "bg-red-500/15 text-red-400 border border-red-500/30",
  };

  return (
    <span
      className={`inline-flex rounded-full px-4 py-2 text-sm font-semibold ${
        styles[status] ??
        "border border-slate-700 bg-slate-800 text-slate-300"
      }`}
    >
      {status}
    </span>
  );
}

function OverviewCard({
  title,
  value,
  subtitle,
}) {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 transition hover:border-emerald-500/40">
      <p className="text-sm uppercase tracking-wider text-slate-400">
        {title}
      </p>

      <h3 className="mt-3 text-2xl font-bold text-white break-words">
        {value ?? "-"}
      </h3>

      <p className="mt-2 text-sm text-slate-500">
        {subtitle}
      </p>
    </div>
  );
}

function InfoCard({
  label,
  value,
}) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
      <p className="text-xs uppercase tracking-widest text-slate-500">
        {label}
      </p>

      <div className="mt-3 text-lg font-semibold text-white break-words">
        {value ?? "-"}
      </div>
    </div>
  );
}

function SummaryRow({
  label,
  value,
}) {
  return (
    <div className="flex items-center justify-between border-b border-slate-800 pb-4 last:border-none last:pb-0">
      <span className="text-slate-400">
        {label}
      </span>

      <span className="font-semibold text-white break-words text-right">
        {value}
      </span>
    </div>
  );
}

function TimelineItem({
  active,
  title,
  last = false,
}) {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <div
          className={`h-4 w-4 rounded-full ${
            active
              ? "bg-emerald-500"
              : "bg-slate-700"
          }`}
        />

        {!last && (
          <div
            className={`mt-1 h-10 w-[2px] ${
              active
                ? "bg-emerald-500"
                : "bg-slate-700"
            }`}
          />
        )}
      </div>

      <div className="-mt-1">
        <p
          className={`font-medium ${
            active
              ? "text-white"
              : "text-slate-500"
          }`}
        >
          {title}
        </p>

        <p className="mt-1 text-sm text-slate-500">
          {active
            ? "Completed"
            : "Pending"}
        </p>
      </div>
    </div>
  );
}

  export default ContractDetailsPage;