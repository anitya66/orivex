function SkeletonTable({ rows = 6 }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">

      <div className="grid grid-cols-5 gap-4 border-b border-slate-800 p-5">

        {[...Array(5)].map((_, index) => (
          <div
            key={index}
            className="h-5 animate-pulse rounded bg-slate-700"
          />
        ))}

      </div>

      {Array.from({ length: rows }).map((_, row) => (
        <div
          key={row}
          className="grid animate-pulse grid-cols-5 gap-4 border-b border-slate-800 p-5"
        >
          {[...Array(5)].map((_, col) => (
            <div
              key={col}
              className="h-4 rounded bg-slate-800"
            />
          ))}
        </div>
      ))}

    </div>
  );
}

export default SkeletonTable;