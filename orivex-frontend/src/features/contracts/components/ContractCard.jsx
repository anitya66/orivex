import { useState } from "react";
import { Link } from "react-router-dom";

import {
  CheckCircle,
  Star,
  CalendarDays,
  IndianRupee,
  FileText,
  ArrowRight,
  User,
} from "lucide-react";

import { useReviewStatus } from "@/features/reviews/hooks/useReviewStatus";
import ReviewModal from "@/features/reviews/components/ReviewModal";

function ContractCard({
  contract,
  role,
}) {
  const [openReviewModal, setOpenReviewModal] =
    useState(false);

  const {
    data: reviewStatus,
  } = useReviewStatus(contract.id);

  const alreadyReviewed =
    reviewStatus?.data?.alreadyReviewed;

  const badgeColors = {
    PENDING_PAYMENT:
      "bg-amber-500/15 text-amber-400",

    PAID:
      "bg-cyan-500/15 text-cyan-400",

    ACTIVE:
      "bg-green-500/15 text-green-400",

    SUBMITTED:
      "bg-blue-500/15 text-blue-400",

    COMPLETED:
      "bg-emerald-500/15 text-emerald-400",

    CANCELLED:
      "bg-red-500/15 text-red-400",
  };

  return (
    <>
      <div
        className="
        group
        relative
        overflow-hidden
        rounded-3xl
        border
        border-slate-800
        bg-gradient-to-br
        from-slate-900
        via-slate-900
        to-slate-950
        p-8
        transition-all
        duration-300
        hover:-translate-y-2
        hover:border-blue-500/40
        hover:shadow-[0_20px_60px_rgba(37,99,235,0.15)]
      "
      >
        {/* Glow */}

        <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-blue-500/10 blur-[120px]" />

        {/* Header */}

        <div className="relative flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">

          <div>

            <h2 className="text-3xl font-black text-white">

              {contract.projectTitle}

            </h2>

            <div className="mt-3 flex items-center gap-2 text-slate-400">

              <User size={17} />

              <span>

                {role === "CLIENT"
                  ? contract.freelancerName
                  : contract.clientName}

              </span>

            </div>

          </div>

          <span
            className={`rounded-full px-5 py-2 text-sm font-semibold ${
              badgeColors[contract.status] ??
              "bg-slate-700 text-white"
            }`}
          >
            {contract.status.replaceAll("_", " ")}
          </span>

        </div>

        {/* Stats */}

        <div className="mt-8 grid gap-5 md:grid-cols-3">

          <Info
            icon={IndianRupee}
            color="text-emerald-400"
            title="Budget"
            value={`₹${contract.agreedBudget}`}
          />

          <Info
            icon={CalendarDays}
            color="text-cyan-400"
            title="Deadline"
            value={contract.deadline}
          />

          <Info
            icon={FileText}
            color="text-violet-400"
            title="Contract"
            value={`#${contract.id}`}
          />

        </div>

        {/* Footer */}

        <div className="mt-8 flex flex-wrap gap-4">

          <Link
            to={`/dashboard/contracts/${contract.id}`}
            className="
            inline-flex
            items-center
            gap-2
            rounded-2xl
            bg-blue-600
            px-6
            py-3
            font-semibold
            text-white
            transition-all
            hover:gap-3
            hover:bg-blue-700
          "
          >
            View Contract

            <ArrowRight size={18} />

          </Link>

          {contract.status === "COMPLETED" &&
            (alreadyReviewed ? (
              <div className="inline-flex items-center gap-2 rounded-2xl bg-emerald-500/15 px-6 py-3 font-semibold text-emerald-400">

                <CheckCircle size={18} />

                Reviewed

              </div>
            ) : (
              <button
                onClick={() =>
                  setOpenReviewModal(true)
                }
                className="inline-flex items-center gap-2 rounded-2xl bg-yellow-500 px-6 py-3 font-semibold text-black transition hover:bg-yellow-400"
              >
                <Star size={18} />

                Leave Review

              </button>
            ))}

        </div>

      </div>

      {openReviewModal && (
        <ReviewModal
          contractId={contract.id}
          onClose={() =>
            setOpenReviewModal(false)
          }
        />
      )}
    </>
  );
}
function Info({
  icon: Icon,
  title,
  value,
  color,
}) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">

      <div className="flex items-center gap-4">

        <div className="rounded-xl bg-slate-800 p-3">

          <Icon
            size={20}
            className={color}
          />

        </div>

        <div>

          <p className="text-xs font-medium uppercase tracking-wider text-slate-500">

            {title}

          </p>

          <p className="mt-1 text-xl font-bold break-words text-white">

            {value}

          </p>

        </div>

      </div>

    </div>
  );
}

export default ContractCard;