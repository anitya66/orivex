function SkeletonCard() {
  return (
    <div className="animate-pulse rounded-2xl border border-slate-800 bg-slate-900 p-6">

      <div className="h-6 w-2/3 rounded bg-slate-700"></div>

      <div className="mt-4 h-4 w-full rounded bg-slate-800"></div>

      <div className="mt-2 h-4 w-5/6 rounded bg-slate-800"></div>

      <div className="mt-8 flex justify-between">

        <div className="h-10 w-24 rounded-xl bg-slate-700"></div>

        <div className="h-10 w-28 rounded-xl bg-slate-700"></div>

      </div>

    </div>
  );
}

export default SkeletonCard;