function ProjectStatusBadge({ status }) {

  const colors = {

    OPEN: "bg-green-500/20 text-green-400",

    IN_PROGRESS: "bg-blue-500/20 text-blue-400",

    COMPLETED: "bg-purple-500/20 text-purple-400",

    CANCELLED: "bg-red-500/20 text-red-400",

    SUSPENDED: "bg-yellow-500/20 text-yellow-400",

  };

  return (

    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${
        colors[status] ??
        "bg-slate-700 text-white"
      }`}
    >

      {status}

    </span>

  );

}

export default ProjectStatusBadge;