function ConfirmActionModal({

  title,

  message,

  confirmText,

  confirmColor = "bg-red-600 hover:bg-red-700",

  onConfirm,

  onClose,

  loading,

}) {

  return (

    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">

      <div className="w-full max-w-md rounded-2xl bg-slate-900 p-8">

        <h2 className="mb-4 text-2xl font-bold text-white">

          {title}

        </h2>

        <p className="mb-8 text-slate-300">

          {message}

        </p>

        <div className="flex justify-end gap-3">

          <button

            onClick={onClose}

            className="rounded-lg bg-slate-700 px-5 py-2 text-white hover:bg-slate-600"

          >

            Cancel

          </button>

          <button

            disabled={loading}

            onClick={onConfirm}

            className={`rounded-lg px-5 py-2 text-white ${confirmColor} disabled:opacity-50`}

          >

            {loading ? "Please wait..." : confirmText}

          </button>

        </div>

      </div>

    </div>

  );

}

export default ConfirmActionModal;