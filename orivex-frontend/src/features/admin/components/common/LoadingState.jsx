import {
  LoaderCircle,
} from "lucide-react";

function LoadingState({
  message = "Loading...",
}) {
  return (
    <div className="flex min-h-[350px] items-center justify-center">

      <div className="rounded-3xl border border-slate-800 bg-slate-900 px-12 py-10 text-center shadow-xl">

        <LoaderCircle
          size={45}
          className="mx-auto animate-spin text-blue-500"
        />

        <h2 className="mt-6 text-2xl font-bold text-white">
          Please wait
        </h2>

        <p className="mt-2 text-slate-400">
          {message}
        </p>

      </div>

    </div>
  );
}

export default LoadingState;