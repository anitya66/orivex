function ContractStatusBadge({ status }) {

  const colors = {

    ACTIVE:
      "bg-blue-500/15 text-blue-400 border border-blue-500/30",

    SUBMITTED:
      "bg-amber-500/15 text-amber-400 border border-amber-500/30",

    COMPLETED:
      "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30",

    CANCELLED:
      "bg-red-500/15 text-red-400 border border-red-500/30",

    PENDING_PAYMENT:
      "bg-orange-500/15 text-orange-400 border border-orange-500/30",

    PAID:
      "bg-green-500/15 text-green-400 border border-green-500/30",

  };

  return (

    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold tracking-wide ${
        colors[status] ??
        "border border-slate-700 bg-slate-800 text-slate-300"
      }`}
    >

      <span className="mr-2 h-2 w-2 rounded-full bg-current opacity-80" />

      {status.replaceAll("_", " ")}

    </span>

  );

}

export default ContractStatusBadge;