import { useState } from "react";
import { toast } from "sonner";
import {
  ExternalLink,
  X,
} from "lucide-react";

function SubmitWorkModal({
  onSubmit,
  loading,
  onClose,
}) {
  const [submissionUrl, setSubmissionUrl] =
    useState("");

  const [submissionNotes, setSubmissionNotes] =
    useState("");

  function handleSubmit() {
    if (!submissionUrl.trim()) {
      toast.error("Submission URL is required.");
      return;
    }

    if (!submissionNotes.trim()) {
      toast.error("Submission notes are required.");
      return;
    }

    onSubmit({
      submissionUrl,
      submissionNotes,
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-5 backdrop-blur-sm">

      <div className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 shadow-2xl">

        <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-blue-500/10 blur-[120px]" />

        <div className="relative p-8">

          {/* Header */}

          <div className="flex items-start justify-between">

            <div>

              <span className="rounded-full bg-blue-500/10 px-4 py-2 text-sm font-semibold text-blue-400">
                Contract Submission
              </span>

              <h2 className="mt-5 text-3xl font-black text-white">
                Submit Your Work
              </h2>

              <p className="mt-3 text-slate-400">
                Share your repository, deployed application,
                documentation or any deliverables for client review.
              </p>

            </div>

            <button
              onClick={onClose}
              className="rounded-xl p-2 text-slate-500 transition hover:bg-slate-800 hover:text-white"
            >
              <X />
            </button>

          </div>

          {/* URL */}

          <div className="mt-10">

            <label className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-slate-400">

              <Github size={16} />

              Submission URL

            </label>

            <input
              value={submissionUrl}
              onChange={(e) =>
                setSubmissionUrl(e.target.value)
              }
              placeholder="https://github.com/username/project"
              className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-5 py-4 text-white outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />

          </div>

          {/* Notes */}

          <div className="mt-8">

            <label className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-slate-400">

              <FileText size={16} />

              Submission Notes

            </label>

            <textarea
              rows={7}
              value={submissionNotes}
              onChange={(e) =>
                setSubmissionNotes(e.target.value)
              }
              placeholder="Describe everything you completed, deployment links, credentials, documentation and any important notes."
              className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-5 py-4 text-white outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />

          </div>

          {/* Footer */}

          <div className="mt-10 flex justify-end gap-4">

            <button
              onClick={onClose}
              className="rounded-2xl border border-slate-700 bg-slate-800 px-6 py-3 font-semibold text-white transition hover:bg-slate-700"
            >
              Cancel
            </button>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-7 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"
            >
              <Send size={18} />

              {loading
                ? "Submitting..."
                : "Submit Work"}

            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default SubmitWorkModal;