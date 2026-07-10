import { useState } from "react";
import { toast } from "sonner";

import { useUploadResume } from "../hooks/useUploadResume";

function UploadResumeModal({
  onClose,
}) {
  const [file, setFile] = useState(null);

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

    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 p-8">

      <div className="mx-auto mt-10 w-full max-w-lg rounded-2xl bg-slate-900 p-8">

        <h2 className="mb-6 text-3xl font-bold text-white">
          Upload Resume
        </h2>

        <input
          type="file"
          accept=".pdf"
          onChange={(e) =>
            setFile(e.target.files[0])
          }
          className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 text-white"
        />

        <p className="mt-3 text-sm text-slate-400">
          Only PDF files are allowed.
        </p>

        <div className="mt-8 flex justify-end gap-4">

          <button
            onClick={onClose}
            className="rounded-xl bg-slate-700 px-6 py-3 text-white"
          >
            Cancel
          </button>

          <button
            onClick={handleUpload}
            disabled={uploadResume.isPending}
            className="rounded-xl bg-blue-600 px-6 py-3 text-white transition hover:bg-blue-700 disabled:opacity-60"
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