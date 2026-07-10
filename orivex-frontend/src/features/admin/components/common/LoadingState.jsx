function LoadingState({
  message = "Loading...",
}) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-10 text-center">

      <p className="text-slate-300">
        {message}
      </p>

    </div>
  );
}

export default LoadingState;