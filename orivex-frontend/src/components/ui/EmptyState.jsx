import { Inbox } from "lucide-react";

function EmptyState({
  icon,
  title = "Nothing here yet",
  description = "There's no data available.",
  action,
}) {
  const Icon = icon || Inbox;

  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-700 bg-slate-900/40 px-8 py-20 text-center">

      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-slate-800">

        <Icon
          size={36}
          className="text-slate-500"
        />

      </div>

      <h2 className="mt-8 text-2xl font-bold text-white">
        {title}
      </h2>

      <p className="mt-3 max-w-md text-slate-400">
        {description}
      </p>

      {action && (
        <div className="mt-8">
          {action}
        </div>
      )}

    </div>
  );
}

export default EmptyState;