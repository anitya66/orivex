function ProjectFilters({
  status,
  setStatus,
}) {
  return (
    <select
      value={status}
      onChange={(e) =>
        setStatus(e.target.value)
      }
      className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white"
    >
      <option value="">
        All Status
      </option>

      <option value="OPEN">
        Open
      </option>

      <option value="IN_PROGRESS">
        In Progress
      </option>

      <option value="COMPLETED">
        Completed
      </option>
    </select>
  );
}

export default ProjectFilters;