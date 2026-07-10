import { useEffect } from "react";

function ConfirmActionModal({
  title,
  message,
  confirmText,
  loadingText = "Please wait...",
  confirmColor = "bg-red-600 hover:bg-red-700",
  onConfirm,
  onClose,
  loading = false,
}) {
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape" && !loading) {
        onClose();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [loading, onClose]);

  function handleOverlayClick() {
    if (!loading) {
      onClose();
    }
  }

  return (
    <div
      onClick={handleOverlayClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-2xl border border-slate-700 bg-slate-900 p-8 shadow-2xl"
      >
        <h2 className="mb-3 text-2xl font-bold text-white">
          {title}
        </h2>

        <p className="mb-8 text-slate-400">
          {message}
        </p>

        <div className="flex justify-end gap-3">
          <button
            disabled={loading}
            onClick={onClose}
            className="rounded-lg bg-slate-700 px-5 py-2 text-white transition hover:bg-slate-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            disabled={loading}
            onClick={onConfirm}
            className={`rounded-lg px-5 py-2 text-white transition ${confirmColor} disabled:cursor-not-allowed disabled:opacity-50`}
          >
            {loading ? loadingText : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmActionModal;