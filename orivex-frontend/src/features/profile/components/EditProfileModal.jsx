import { useEffect, useState } from "react";
import { toast } from "sonner";

import { useUpdateClientProfile } from "../hooks/useUpdateClientProfile";
import { useUpdateFreelancerProfile } from "../hooks/useUpdateFreelancerProfile";

function EditProfileModal({
  user,
  profile,
  onClose,
}) {
  const isFreelancer =
    user?.role === "FREELANCER";

  const updateClientProfile =
    useUpdateClientProfile();

  const updateFreelancerProfile =
    useUpdateFreelancerProfile();

  const [formData, setFormData] =
    useState({});

  useEffect(() => {
    if (!profile) return;

    if (isFreelancer) {
      setFormData({
        headline: profile.headline ?? "",
        bio: profile.bio ?? "",
        skills: profile.skills ?? "",
        hourlyRate: profile.hourlyRate ?? "",
        experienceYears: profile.experienceYears ?? "",
        portfolioUrl: profile.portfolioUrl ?? "",
        githubUrl: profile.githubUrl ?? "",
        linkedinUrl: profile.linkedinUrl ?? "",
        available: profile.available ?? true,
      });
    } else {
      setFormData({
        companyName: profile.companyName ?? "",
        companyDescription:
          profile.companyDescription ?? "",
        website: profile.website ?? "",
      });
    }
  }, [profile, isFreelancer]);

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSave() {
    if (isFreelancer) {
      updateFreelancerProfile.mutate(formData, {
        onSuccess: () => {
          toast.success(
            "Profile updated successfully."
          );
          onClose();
        },
        onError: (error) => {
          toast.error(
            error?.response?.data?.message ??
              "Failed to update profile."
          );
        },
      });

      return;
    }

    updateClientProfile.mutate(formData, {
      onSuccess: () => {
        toast.success(
          "Profile updated successfully."
        );
        onClose();
      },
      onError: (error) => {
        toast.error(
          error?.response?.data?.message ??
            "Failed to update profile."
        );
      },
    });
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 p-6">

      <div className="mx-auto my-10 flex max-h-[90vh] w-full max-w-2xl flex-col rounded-2xl bg-slate-900">

        {/* Header */}

        <div className="border-b border-slate-800 p-8">
          <h2 className="text-3xl font-bold text-white">
            Edit Profile
          </h2>
        </div>

        {/* Body */}

        <div className="flex-1 overflow-y-auto p-8">

          <div className="space-y-5">

            {isFreelancer ? (
              <>
                <input
                  name="headline"
                  value={formData.headline ?? ""}
                  onChange={handleChange}
                  placeholder="Headline"
                  className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 text-white outline-none focus:border-blue-500"
                />

                <textarea
                  name="bio"
                  value={formData.bio ?? ""}
                  onChange={handleChange}
                  placeholder="Bio"
                  rows={4}
                  className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 text-white outline-none focus:border-blue-500"
                />

                <input
                  name="skills"
                  value={formData.skills ?? ""}
                  onChange={handleChange}
                  placeholder="Skills"
                  className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 text-white outline-none focus:border-blue-500"
                />

                <input
                  name="hourlyRate"
                  type="number"
                  value={formData.hourlyRate ?? ""}
                  onChange={handleChange}
                  placeholder="Hourly Rate"
                  className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 text-white outline-none focus:border-blue-500"
                />

                <input
                  name="experience"
                  value={formData.experienceYears ?? ""}
                  onChange={handleChange}
                  placeholder="Experience Years (e.g. 3 Years)"
                  className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 text-white outline-none focus:border-blue-500"
                />

                <input
                  name="portfolioUrl"
                  value={formData.portfolioUrl ?? ""}
                  onChange={handleChange}
                  placeholder="Portfolio URL"
                  className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 text-white outline-none focus:border-blue-500"
                />

                <input
                  name="githubUrl"
                  value={formData.githubUrl ?? ""}
                  onChange={handleChange}
                  placeholder="GitHub URL"
                  className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 text-white outline-none focus:border-blue-500"
                />

                <input
                  name="linkedinUrl"
                  value={formData.linkedinUrl ?? ""}
                  onChange={handleChange}
                  placeholder="LinkedIn URL"
                  className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 text-white outline-none focus:border-blue-500"
                />
              </>
            ) : (
              <>
                <input
                  name="companyName"
                  value={formData.companyName ?? ""}
                  onChange={handleChange}
                  placeholder="Company Name"
                  className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 text-white outline-none focus:border-blue-500"
                />

                <textarea
                  name="companyDescription"
                  value={formData.companyDescription ?? ""}
                  onChange={handleChange}
                  placeholder="Company Description"
                  rows={4}
                  className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 text-white outline-none focus:border-blue-500"
                />

                <input
                  name="website"
                  value={formData.website ?? ""}
                  onChange={handleChange}
                  placeholder="Website"
                  className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 text-white outline-none focus:border-blue-500"
                />
              </>
            )}

          </div>

        </div>

        {/* Footer */}

        <div className="flex justify-end gap-4 border-t border-slate-800 p-6">

          <button
            onClick={onClose}
            className="rounded-xl bg-slate-700 px-6 py-3 text-white transition hover:bg-slate-600"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            disabled={
              updateClientProfile.isPending ||
              updateFreelancerProfile.isPending
            }
            className="rounded-xl bg-blue-600 px-6 py-3 text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {updateClientProfile.isPending ||
            updateFreelancerProfile.isPending
              ? "Saving..."
              : "Save Changes"}
          </button>

        </div>

      </div>

    </div>
  );
}

export default EditProfileModal;