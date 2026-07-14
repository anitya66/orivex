function StatCard({
  title,
  value,
  icon,
  color = "blue",
  change,
}) {
  const colors = {
    blue: "from-blue-500 to-indigo-600",
    emerald: "from-emerald-500 to-green-600",
    amber: "from-amber-500 to-orange-600",
    red: "from-red-500 to-rose-600",
    purple: "from-purple-500 to-violet-600",
  };

  const Icon = icon;

  return (
    <div className="group rounded-3xl border border-slate-800 bg-slate-900/70 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-slate-700">

      <div className="flex items-start justify-between">

        <div>

          <p className="text-sm font-medium text-slate-400">
            {title}
          </p>

          <h2 className="mt-3 text-4xl font-bold text-white">
            {value}
          </h2>

          {change && (
            <p className="mt-3 text-sm text-emerald-400">
              {change}
            </p>
          )}

        </div>

        {Icon && (
          <div
            className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${colors[color]} shadow-lg`}
          >
            <Icon
              size={28}
              className="text-white"
            />
          </div>
        )}

      </div>

    </div>
  );
}

export default StatCard;