import { ChevronRight, TrendingUp } from "lucide-react";

function StatsCard({
  title,
  value,
  icon: Icon,
  color = "text-blue-500",
  onClick,
}) {
  return (
    <div
      onClick={onClick}
      className={`group relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 p-7 transition-all duration-300 ${
        onClick
          ? "cursor-pointer hover:-translate-y-2 hover:border-blue-500/40 hover:shadow-[0_20px_50px_rgba(37,99,235,0.18)]"
          : ""
      }`}
    >
      <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-blue-500/10 blur-3xl" />

      <div className="relative flex items-start justify-between">

        <div>

          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
            {title}
          </p>

          <h2 className="mt-5 text-5xl font-black tracking-tight text-white">
            {value}
          </h2>

          <div className="mt-5 flex items-center gap-2">

            <TrendingUp
              size={15}
              className="text-emerald-400"
            />

            <span className="text-sm font-medium text-emerald-400">
              Live Data
            </span>

          </div>

        </div>

        <div className="flex flex-col items-end justify-between gap-5">

          {Icon && (
            <div className="rounded-2xl border border-slate-700 bg-slate-800/80 p-4 transition-all duration-300 group-hover:scale-110 group-hover:border-blue-500/40">
              <Icon
                size={30}
                className={color}
              />
            </div>
          )}

          {onClick && (
            <div className="flex items-center gap-1 text-sm font-semibold text-slate-500 transition-all group-hover:translate-x-1 group-hover:text-blue-400">

              View

              <ChevronRight size={16} />

            </div>
          )}

        </div>

      </div>
    </div>
  );
}

export default StatsCard;