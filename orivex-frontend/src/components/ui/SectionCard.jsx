function SectionCard({
  title,
  subtitle,
  children,
  actions,
  className = "",
}) {
  return (
    <section
      className={`rounded-3xl border border-slate-800 bg-slate-900/70 backdrop-blur-sm shadow-lg shadow-black/20 ${className}`}
    >
      {(title || actions) && (
        <div className="flex flex-col gap-4 border-b border-slate-800 px-8 py-6 md:flex-row md:items-center md:justify-between">

          <div>
            {title && (
              <h2 className="text-2xl font-bold text-white">
                {title}
              </h2>
            )}

            {subtitle && (
              <p className="mt-2 text-slate-400">
                {subtitle}
              </p>
            )}
          </div>

          {actions && (
            <div className="flex items-center gap-3">
              {actions}
            </div>
          )}

        </div>
      )}

      <div className="p-8">
        {children}
      </div>
    </section>
  );
}

export default SectionCard;