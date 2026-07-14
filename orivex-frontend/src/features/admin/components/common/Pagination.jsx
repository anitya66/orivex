import { memo } from "react";
import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

function Pagination({
  page,
  totalPages,
  onPrevious,
  onNext,
}) {
  if (totalPages <= 1) return null;

  return (
    <div className="mt-8 flex flex-col items-center justify-between gap-5 rounded-2xl border border-slate-800 bg-slate-900 p-5 md:flex-row">

      <button
        onClick={onPrevious}
        disabled={page === 0}
        className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800 px-5 py-3 text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <ChevronLeft size={18} />
        Previous
      </button>

      <div className="text-center">

        <p className="text-sm text-slate-400">
          Showing Page
        </p>

        <h3 className="mt-1 text-lg font-bold text-white">
          {page + 1} / {totalPages}
        </h3>

      </div>

      <button
        onClick={onNext}
        disabled={page + 1 >= totalPages}
        className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800 px-5 py-3 text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Next
        <ChevronRight size={18} />
      </button>

    </div>
  );
}

export default memo(Pagination);