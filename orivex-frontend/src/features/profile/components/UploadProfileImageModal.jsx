import { useState } from "react";
import { toast } from "sonner";

import { useUploadProfileImage } from "../hooks/useUploadProfileImage";
import { useUploadCompanyLogo } from "../hooks/useUploadCompanyLogo";

function UploadProfileImageModal({
  user,
  onClose,
}) {
  const isFreelancer =
    user?.role === "FREELANCER";

  const [file, setFile] = useState(null);

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
            ? "Profile image uploaded successfully."
            : "Company logo uploaded successfully."
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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 p-8">

      <div className="mx-auto mt-10 w-full max-w-lg rounded-2xl bg-slate-900 p-8">

        <h2 className="mb-6 text-3xl font-bold text-white">
          {isFreelancer
            ? "Upload Profile Image"
            : "Upload Company Logo"}
        </h2>

        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            setFile(e.target.files[0])
          }
          className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 text-white"
        />

        <div className="mt-8 flex justify-end gap-4">

          <button
            onClick={onClose}
            className="rounded-xl bg-slate-700 px-6 py-3 text-white"
          >
            Cancel
          </button>

          <button
            onClick={handleUpload}
            disabled={
              uploadProfileImage.isPending ||
              uploadCompanyLogo.isPending
            }
            className="rounded-xl bg-blue-600 px-6 py-3 text-white hover:bg-blue-700 disabled:opacity-50"
          >
            Upload
          </button>

        </div>

      </div>

    </div>
  );
}

export default UploadProfileImageModal;