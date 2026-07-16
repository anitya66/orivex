import { useEffect, useState } from "react";
import { toast } from "sonner";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import {
  X,
  User,
  FileText,
  Briefcase,
  IndianRupee,
  Globe,
  Building2,
} from "lucide-react";
import { useUpdateClientProfile } from "../hooks/useUpdateClientProfile";
import { useUpdateFreelancerProfile } from "../hooks/useUpdateFreelancerProfile";

function Field({
  icon: Icon,
  label,
  children,
}) {
  return (
    <div>
      <label className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-300">
        <Icon
          size={16}
          className="text-blue-400"
        />
        {label}
      </label>

      {children}
    </div>
  );
}

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
        experienceYears:
          profile.experienceYears ?? "",
        portfolioUrl:
          profile.portfolioUrl ?? "",
        githubUrl:
          profile.githubUrl ?? "",
        linkedinUrl:
          profile.linkedinUrl ?? "",
      });
    } else {
      setFormData({
        companyName:
          profile.companyName ?? "",
        companyDescription:
          profile.companyDescription ?? "",
        website:
          profile.website ?? "",
      });
    }
  }, [profile, isFreelancer]);

  function handleChange(e) {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]:
        e.target.value,
    }));
  }

  function handleSave() {
    const mutation = isFreelancer
      ? updateFreelancerProfile
      : updateClientProfile;

    mutation.mutate(formData, {
      onSuccess() {
        toast.success(
          "Profile updated successfully."
        );
        onClose();
      },
      onError(error) {
        toast.error(
          error?.response?.data?.message ??
            "Failed to update profile."
        );
      },
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-5">

      <div className="flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-3xl border border-slate-800 bg-slate-900">

        {/* Header */}

        <div className="flex items-center justify-between border-b border-slate-800 px-8 py-6">

          <div>

            <h2 className="text-3xl font-bold text-white">
              Edit Profile
            </h2>

            <p className="mt-2 text-slate-400">
              Keep your profile up to date.
            </p>

          </div>

          <button
            onClick={onClose}
            className="rounded-xl bg-slate-800 p-3 text-slate-400 transition hover:text-white"
          >
            <X size={20} />
          </button>

        </div>

        {/* Body */}

        <div className="flex-1 overflow-y-auto p-8">

          <div className="space-y-6">

            {isFreelancer ? (
              <>

                <Field
                  icon={User}
                  label="Headline"
                >
                  <input
                    name="headline"
                    value={formData.headline}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 text-white outline-none focus:border-blue-500"
                  />
                </Field>

                <Field
                  icon={FileText}
                  label="Bio"
                >
                  <textarea
                    rows={5}
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 text-white outline-none focus:border-blue-500"
                  />
                </Field>

                <Field
                  icon={Briefcase}
                  label="Skills"
                >
                  <input
                    name="skills"
                    value={formData.skills}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 text-white outline-none focus:border-blue-500"
                  />
                </Field>

                <div className="grid gap-6 md:grid-cols-2">

                  <Field
                    icon={IndianRupee}
                    label="Hourly Rate"
                  >
                    <input
                      type="number"
                      name="hourlyRate"
                      value={formData.hourlyRate}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 text-white outline-none focus:border-blue-500"
                    />
                  </Field>

                  <Field
                    icon={Briefcase}
                    label="Experience"
                  >
                    <input
                      name="experienceYears"
                      value={
                        formData.experienceYears
                      }
                      onChange={handleChange}
                      className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 text-white outline-none focus:border-blue-500"
                    />
                  </Field>

                </div>

                <Field
                  icon={Globe}
                  label="Portfolio"
                >
                  <input
                    name="portfolioUrl"
                    value={formData.portfolioUrl}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 text-white outline-none focus:border-blue-500"
                  />
                </Field>

                <Field
                 icon={FaGithub}
                  label="GitHub"
                >
                  <input
                    name="githubUrl"
                    value={formData.githubUrl}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 text-white outline-none focus:border-blue-500"
                  />
                </Field>

                <Field
                  icon={FaLinkedin}
                  label="LinkedIn"
                >
                  <input
                    name="linkedinUrl"
                    value={formData.linkedinUrl}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 text-white outline-none focus:border-blue-500"
                  />
                </Field>

              </>
            ) : (
              <>

                <Field
                  icon={Building2}
                  label="Company Name"
                >
                  <input
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 text-white outline-none focus:border-blue-500"
                  />
                </Field>

                <Field
                  icon={FileText}
                  label="Company Description"
                >
                  <textarea
                    rows={5}
                    name="companyDescription"
                    value={
                      formData.companyDescription
                    }
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 text-white outline-none focus:border-blue-500"
                  />
                </Field>

                <Field
                  icon={Globe}
                  label="Website"
                >
                  <input
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 text-white outline-none focus:border-blue-500"
                  />
                </Field>

              </>
            )}

          </div>

        </div>

        {/* Footer */}

        <div className="flex justify-end gap-4 border-t border-slate-800 p-6">

          <button
            onClick={onClose}
            className="rounded-xl bg-slate-700 px-6 py-3 text-white hover:bg-slate-600"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            disabled={
              updateClientProfile.isPending ||
              updateFreelancerProfile.isPending
            }
            className="rounded-xl bg-blue-600 px-8 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            Save Changes
          </button>

        </div>

      </div>

    </div>
  );
}

export default EditProfileModal;