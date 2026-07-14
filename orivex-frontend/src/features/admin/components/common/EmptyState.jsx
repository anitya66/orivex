import {
  Inbox,
} from "lucide-react";

function EmptyState({
  message = "No data found.",
}) {
  return (
    <div className="flex min-h-[320px] items-center justify-center">

      <div className="rounded-3xl border border-dashed border-slate-700 bg-slate-900 px-12 py-12 text-center">

        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-slate-800">

          <Inbox
            size={36}
            className="text-slate-500"
          />

        </div>

        <h2 className="mt-6 text-2xl font-bold text-white">
          Nothing Here
        </h2>

        <p className="mt-3 text-slate-400">
          {message}
        </p>

      </div>

    </div>
  );
}

export default EmptyState;