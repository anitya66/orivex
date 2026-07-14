function PageHeader({
  title,
  subtitle,
  actions,
}) {
  return (
    <div className="mb-8 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

      <div>

        <h1 className="text-4xl font-bold tracking-tight text-white">
          {title}
        </h1>

        {subtitle && (
          <p className="mt-2 max-w-2xl text-slate-400">
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
  );
}

export default PageHeader;