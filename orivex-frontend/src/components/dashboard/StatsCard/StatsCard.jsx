function StatsCard({
  title,
  value,
  icon: Icon,
  color = "text-blue-500",
}) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/50">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-400">
            {title}
          </p>

          <h2 className="mt-3 text-4xl font-bold text-white">
            {value}
          </h2>
        </div>

        {Icon && (
          <div className="rounded-xl bg-slate-800 p-3">
            <Icon className={color} size={26} />
          </div>
        )}
      </div>
    </div>
  );
}

export default StatsCard;