const COLORS = {
  ACTIVE:
    "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",

  SUSPENDED:
    "border-red-500/30 bg-red-500/10 text-red-400",

  PENDING_VERIFICATION:
    "border-yellow-500/30 bg-yellow-500/10 text-yellow-400",

  DELETED:
    "border-slate-600 bg-slate-700/30 text-slate-400",
};

function UserStatusBadge({
  status,
}) {
  return (
    <span
      className={`inline-flex rounded-full border px-4 py-2 text-xs font-semibold ${
        COLORS[status] ??
        "border-slate-700 bg-slate-800 text-slate-300"
      }`}
    >
      {status.replaceAll("_", " ")}
    </span>
  );
}

export default UserStatusBadge;