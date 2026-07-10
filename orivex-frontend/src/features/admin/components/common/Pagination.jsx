import { memo } from "react";

function Pagination({
  page,
  totalPages,
  onPrevious,
  onNext,
}) {
  return (
    <div className="flex items-center justify-between">

      <button
        onClick={onPrevious}
        disabled={page === 0}
        className="rounded-lg bg-slate-800 px-4 py-2 text-white disabled:opacity-50"
      >
        Previous
      </button>

      <span className="text-white">
        Page {page + 1} of {totalPages}
      </span>

      <button
        onClick={onNext}
        disabled={page + 1 >= totalPages}
        className="rounded-lg bg-slate-800 px-4 py-2 text-white disabled:opacity-50"
      >
        Next
      </button>

    </div>
  );
}

export default memo(Pagination);