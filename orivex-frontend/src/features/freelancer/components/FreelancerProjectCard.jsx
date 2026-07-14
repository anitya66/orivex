import {
  ArrowRight,
  Briefcase,
  CalendarDays,
  IndianRupee,
  Layers3,
  Sparkles,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

function FreelancerProjectCard({ project }) {
  const navigate = useNavigate();

  return (
    <div
      className="
        group
        relative
        overflow-hidden
        rounded-3xl
        border
        border-slate-800
        bg-gradient-to-br
        from-slate-900
        via-slate-900
        to-slate-950
        p-8
        transition-all
        duration-300
        hover:-translate-y-2
        hover:border-blue-500/40
        hover:shadow-[0_20px_60px_rgba(37,99,235,0.18)]
      "
    >
      {/* Glow */}

      <div className="absolute -right-20 -top-20 h-52 w-52 rounded-full bg-blue-500/10 blur-[120px]" />

      {/* Header */}

      <div className="relative flex items-start justify-between gap-6">

        <div className="flex-1">

          <span className="inline-flex rounded-full bg-green-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-green-400">

            {project.status}

          </span>

          <h2 className="mt-5 text-3xl font-bold text-white transition group-hover:text-blue-400">

            {project.title}

          </h2>

          <p className="mt-4 line-clamp-3 leading-8 text-slate-400">

            {project.description}

          </p>

        </div>

      </div>

      {/* Meta */}

      <div className="mt-8 grid gap-5 md:grid-cols-2">

        <Meta
          icon={IndianRupee}
          label="Budget"
          value={`₹${project.budget}`}
          color="text-emerald-400"
        />

        <Meta
          icon={CalendarDays}
          label="Deadline"
          value={project.deadline}
          color="text-cyan-400"
        />

        <Meta
          icon={Layers3}
          label="Category"
          value={project.category}
          color="text-violet-400"
        />

        <Meta
          icon={Briefcase}
          label="Experience"
          value={project.experienceLevel}
          color="text-orange-400"
        />

      </div>

      {/* Footer */}

      <div className="mt-8 flex flex-wrap items-center justify-between gap-5 border-t border-slate-800 pt-6">

        <div className="flex items-center gap-2 text-sm text-slate-500">

          <Sparkles
            size={16}
            className="text-blue-400"
          />

          AI Match Ready

        </div>

        <button
          onClick={() =>
            navigate(`/dashboard/browse-projects/${project.id}`)
          }
          className="flex items-center gap-2 rounded-2xl bg-blue-600 px-6 py-3 font-semibold text-white transition-all hover:bg-blue-700 hover:gap-3"
        >

          View Details

          <ArrowRight size={18} />

        </button>

      </div>
    </div>
  );
}

function Meta({
  icon: Icon,
  label,
  value,
  color,
}) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-slate-800 bg-slate-900/70 p-4">

      <div className="rounded-xl bg-slate-800 p-3">

        <Icon
          size={18}
          className={color}
        />

      </div>

      <div>

        <p className="text-xs uppercase tracking-wider text-slate-500">

          {label}

        </p>

        <p className="mt-1 font-semibold text-white">

          {value}

        </p>

      </div>

    </div>
  );
}

export default FreelancerProjectCard;