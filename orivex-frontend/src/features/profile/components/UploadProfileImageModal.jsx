import { useState } from "react";
import { toast } from "sonner";
import {
  ImagePlus,
  Upload,
  X,
} from "lucide-react";

import { useUploadProfileImage } from "../hooks/useUploadProfileImage";
import { useUploadCompanyLogo } from "../hooks/useUploadCompanyLogo";

function UploadProfileImageModal({
  user,
  onClose,
}) {
  const isFreelancer =
    user?.role === "FREELANCER";

  const [file, setFile] =
    useState(null);

  const uploadProfileImage =
    useUploadProfileImage();

  const uploadCompanyLogo =
    useUploadCompanyLogo();

  function handleUpload() {
    if (!file) {
      toast.error("Please select an image.");
      return;
    }

    const mutation = isFreelancer
      ? uploadProfileImage
      : uploadCompanyLogo;

    mutation.mutate(file, {
      onSuccess: () => {
        toast.success(
          isFreelancer
            ? "Profile image uploaded."
            : "Company logo uploaded."
        );

        onClose();
      },

      onError: (error) => {
        toast.error(
          error?.response?.data?.message ??
            "Upload failed."
        );
      },
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-5">

      <div className="w-full max-w-lg rounded-3xl border border-slate-800 bg-slate-900">

        <div className="flex items-center justify-between border-b border-slate-800 p-6">

          <div className="flex items-center gap-3">

            <ImagePlus className="text-blue-400" />

            <h2 className="text-2xl font-bold text-white">

              {isFreelancer
                ? "Upload Profile Image"
                : "Upload Company Logo"}

            </h2>

          </div>

          <button
            onClick={onClose}
            className="rounded-xl bg-slate-800 p-2 text-slate-400 hover:text-white"
          >
            <X size={18} />
          </button>

        </div>

        <div className="space-y-6 p-6">

          <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-700 p-10 transition hover:border-blue-500">

            <Upload
              size={42}
              className="text-blue-400"
            />

            <p className="mt-5 text-white">

              Click to choose image

            </p>

            <p className="mt-2 text-sm text-slate-400">

              PNG • JPG • JPEG

            </p>

            <input
              type="file"
              accept="image/*"
              hidden
              onChange={(e) =>
                setFile(
                  e.target.files?.[0]
                )
              }
            />

          </label>

          {file && (

            <div className="rounded-xl bg-slate-800 p-4">

              <p className="font-medium text-white">

                {file.name}

              </p>

              <p className="text-sm text-slate-400">

                {(file.size / 1024).toFixed(1)} KB

              </p>

            </div>

          )}

        </div>

        <div className="flex justify-end gap-4 border-t border-slate-800 p-6">

          <button
            onClick={onClose}
            className="rounded-xl bg-slate-700 px-6 py-3 text-white hover:bg-slate-600"
          >
            Cancel
          </button>

          <button
            onClick={handleUpload}
            disabled={
              uploadProfileImage.isPending ||
              uploadCompanyLogo.isPending
            }
            className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
          >
            Upload Image
          </button>

        </div>

      </div>

    </div>
  );
}

export default UploadProfileImageModal;