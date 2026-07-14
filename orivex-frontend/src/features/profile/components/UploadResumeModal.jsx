import { useState } from "react";
import { toast } from "sonner";
import {
  FileText,
  Upload,
  X,
} from "lucide-react";

import { useUploadResume } from "../hooks/useUploadResume";

function UploadResumeModal({
  onClose,
}) {
  const [file, setFile] =
    useState(null);

  const uploadResume =
    useUploadResume();

  function handleUpload() {
    if (!file) {
      toast.error(
        "Please select a PDF resume."
      );
      return;
    }

    uploadResume.mutate(file, {
      onSuccess: () => {
        toast.success(
          "Resume uploaded successfully."
        );

        onClose();
      },

      onError: (error) => {
        toast.error(
          error?.response?.data?.message ??
            "Failed to upload resume."
        );
      },
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-5">

      <div className="w-full max-w-lg rounded-3xl border border-slate-800 bg-slate-900">

        {/* Header */}

        <div className="flex items-center justify-between border-b border-slate-800 p-6">

          <div className="flex items-center gap-3">

            <FileText
              size={24}
              className="text-blue-400"
            />

            <h2 className="text-2xl font-bold text-white">
              Upload Resume
            </h2>

          </div>

          <button
            onClick={onClose}
            className="rounded-xl bg-slate-800 p-2 text-slate-400 transition hover:text-white"
          >
            <X size={18} />
          </button>

        </div>

        {/* Body */}

        <div className="space-y-6 p-6">

          <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-700 p-10 transition hover:border-blue-500">

            <Upload
              size={42}
              className="text-blue-400"
            />

            <p className="mt-5 text-lg font-semibold text-white">
              Click to choose PDF
            </p>

            <p className="mt-2 text-sm text-slate-400">
              Only PDF files are supported
            </p>

            <input
              type="file"
              accept=".pdf"
              hidden
              onChange={(e) =>
                setFile(
                  e.target.files?.[0]
                )
              }
            />

          </label>

          {file && (

            <div className="rounded-2xl border border-slate-700 bg-slate-800 p-4">

              <p className="font-semibold text-white">
                {file.name}
              </p>

              <p className="mt-1 text-sm text-slate-400">
                {(file.size / 1024).toFixed(1)} KB
              </p>

            </div>

          )}

        </div>

        {/* Footer */}

        <div className="flex justify-end gap-4 border-t border-slate-800 p-6">

          <button
            onClick={onClose}
            className="rounded-xl bg-slate-700 px-6 py-3 font-medium text-white transition hover:bg-slate-600"
          >
            Cancel
          </button>

          <button
            onClick={handleUpload}
            disabled={uploadResume.isPending}
            className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {uploadResume.isPending
              ? "Uploading..."
              : "Upload Resume"}
          </button>

        </div>

      </div>

    </div>
  );
}

export default UploadResumeModal;