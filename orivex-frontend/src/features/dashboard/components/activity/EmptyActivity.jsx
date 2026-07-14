import { Activity } from "lucide-react";

function EmptyActivity({ actionText, onAction }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-700 px-8 py-16 text-center">

      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-slate-800">
        <Activity
          size={36}
          className="text-slate-500"
        />
      </div>

      <h3 className="text-3xl font-bold text-white">
        No Recent Activity
      </h3>

      <p className="mt-4 max-w-xl leading-8 text-slate-400">
        Your activity will appear here as you create projects,
        submit proposals, sign contracts, receive reviews,
        and collaborate with other users.
      </p>

      <button
        onClick={onAction}
        className="mt-8 rounded-2xl bg-blue-600 px-8 py-4 font-semibold text-white transition hover:bg-blue-700"
      >
        {actionText}
      </button>

    </div>
  );
}

export default EmptyActivity;