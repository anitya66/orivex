function ProjectPagination({
  page,
  totalPages,
  setPage,
}) {
  return (
    <div className="flex items-center justify-center gap-4">

      <button
        disabled={page === 0}
        onClick={() =>
          setPage(page - 1)
        }
        className="rounded-lg bg-slate-800 px-4 py-2 text-white disabled:opacity-40"
      >
        Previous
      </button>

      <span className="text-white">
        {page + 1} / {totalPages}
      </span>

      <button
        disabled={page + 1 >= totalPages}
        onClick={() =>
          setPage(page + 1)
        }
        className="rounded-lg bg-slate-800 px-4 py-2 text-white disabled:opacity-40"
      >
        Next
      </button>

    </div>
  );
}

export default ProjectPagination;