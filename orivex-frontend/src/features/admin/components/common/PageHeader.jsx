import {
  Sparkles,
  Activity,
} from "lucide-react";

function PageHeader({
  title,
  description,
}) {
  return (
    <div className="mb-8 flex flex-col justify-between gap-8 rounded-3xl border border-slate-800 bg-gradient-to-r from-slate-900 to-slate-950 p-8 lg:flex-row lg:items-center">

      {/* Left */}

      <div>

        <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-blue-600/10 px-4 py-2">

          <Sparkles
            size={16}
            className="text-blue-400"
          />

          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">
            ORIVEX ADMIN
          </span>

        </div>

        <h1 className="text-4xl font-extrabold tracking-tight text-white md:text-5xl">
          {title}
        </h1>

        <p className="mt-4 max-w-2xl text-base leading-7 text-slate-400">
          {description}
        </p>

      </div>

      {/* Right */}

      <div className="rounded-2xl border border-slate-800 bg-slate-900 px-6 py-5">

        <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
          Platform Status
        </p>

        <div className="mt-3 flex items-center gap-3">

          <Activity
            size={18}
            className="text-emerald-400"
          />

          <span className="font-semibold text-white">
            All Systems Operational
          </span>

        </div>

      </div>

    </div>
  );
}

export default PageHeader;