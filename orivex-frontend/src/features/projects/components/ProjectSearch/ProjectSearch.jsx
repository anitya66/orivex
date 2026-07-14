import { Search } from "lucide-react";

function ProjectSearch({
  value,
  onChange,
}) {
  return (
    <div className="relative w-full max-w-xl">

      <Search
        size={20}
        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
      />

      <input
        type="text"
        placeholder="Search projects by title, skills or keywords..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="
          w-full
          rounded-2xl
          border
          border-slate-800
          bg-slate-900
          py-4
          pl-12
          pr-5
          text-white
          placeholder:text-slate-500
          transition-all
          duration-300
          focus:border-blue-500
          focus:ring-4
          focus:ring-blue-500/10
          outline-none
        "
      />

    </div>
  );
}

export default ProjectSearch;