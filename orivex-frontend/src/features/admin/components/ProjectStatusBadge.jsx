const COLORS = {
  OPEN:
    "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",

  IN_PROGRESS:
    "border-blue-500/30 bg-blue-500/10 text-blue-400",

  COMPLETED:
    "border-purple-500/30 bg-purple-500/10 text-purple-400",

  CANCELLED:
    "border-red-500/30 bg-red-500/10 text-red-400",

  SUSPENDED:
    "border-yellow-500/30 bg-yellow-500/10 text-yellow-400",

  CLOSED:
    "border-slate-600 bg-slate-700/30 text-slate-300",

  DELETED:
    "border-slate-600 bg-slate-700/30 text-slate-400",
};

function ProjectStatusBadge({
  status,
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-4 py-2 text-xs font-semibold ${
        COLORS[status] ??
        "border-slate-700 bg-slate-800 text-slate-300"
      }`}
    >
      {status.replaceAll("_", " ")}
    </span>
  );
}

export default ProjectStatusBadge;