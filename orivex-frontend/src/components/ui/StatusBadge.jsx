const COLORS = {
  PENDING:
    "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",

  ACTIVE:
    "bg-green-500/15 text-green-400 border-green-500/30",

  SUBMITTED:
    "bg-blue-500/15 text-blue-400 border-blue-500/30",

  COMPLETED:
    "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",

  CANCELLED:
    "bg-red-500/15 text-red-400 border-red-500/30",

  ACCEPTED:
    "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",

  REJECTED:
    "bg-red-500/15 text-red-400 border-red-500/30",

  OPEN:
    "bg-blue-500/15 text-blue-400 border-blue-500/30",

  CLOSED:
    "bg-slate-500/20 text-slate-300 border-slate-600",
};

function StatusBadge({
  status,
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-4 py-2 text-sm font-semibold ${
        COLORS[status] ??
        "border-slate-700 bg-slate-800 text-slate-300"
      }`}
    >
      {status}
    </span>
  );
}

export default StatusBadge;