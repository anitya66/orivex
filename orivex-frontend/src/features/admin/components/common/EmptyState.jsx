function EmptyState({
  message = "No data found.",
}) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-10 text-center">

      <p className="text-slate-400">
        {message}
      </p>

    </div>
  );
}

export default EmptyState;