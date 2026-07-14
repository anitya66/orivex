import {
  X,
  User,
  Mail,
  Shield,
  Briefcase,
  DollarSign,
  FileText,
  Code2,
} from "lucide-react";

import { useUserDetails } from "../hooks/useUserDetails";

function Info({
  label,
  value,
}) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5">

      <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
        {label}
      </p>

      <p className="mt-2 break-words text-white">
        {value || "-"}
      </p>

    </div>
  );
}

function UserDetailsModal({
  userId,
  onClose,
}) {
  const {
    data,
    isLoading,
  } = useUserDetails(userId);

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">

        <div className="rounded-3xl border border-slate-800 bg-slate-900 px-10 py-8 text-white">

          Loading user details...

        </div>

      </div>
    );
  }

  const user = data.data;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 p-6 backdrop-blur-sm">

      <div className="mx-auto my-10 w-full max-w-5xl rounded-3xl border border-slate-800 bg-slate-900 shadow-2xl">

        {/* Header */}

        <div className="flex items-center justify-between border-b border-slate-800 p-8">

          <div>

            <h2 className="text-3xl font-bold text-white">
              User Details
            </h2>

            <p className="mt-2 text-slate-400">
              Complete information about this account.
            </p>

          </div>

          <button
            onClick={onClose}
            className="rounded-xl bg-slate-800 p-3 transition hover:bg-slate-700"
          >
            <X className="text-white" size={22} />
          </button>

        </div>

        {/* Body */}

        <div className="space-y-8 p-8">

          {/* Profile */}

          <div className="flex items-center gap-5">

            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-600/20">

              <User
                size={34}
                className="text-blue-400"
              />

            </div>

            <div>

              <h3 className="text-2xl font-bold text-white">
                {user.name}
              </h3>

              <p className="mt-1 text-slate-400">
                {user.email}
              </p>

            </div>

          </div>

          {/* Basic */}

          <div className="grid gap-6 md:grid-cols-2">

            <Info
              label="Role"
              value={user.role}
            />

            <Info
              label="Account Status"
              value={user.accountStatus}
            />

            <Info
              label="Created"
              value={user.createdAt}
            />

            <Info
              label="Experience"
              value={user.experienceYears}
            />

          </div>

          {/* Freelancer */}

          <div className="grid gap-6 md:grid-cols-2">

            <Info
              label="Bio"
              value={user.bio}
            />

            <Info
              label="Skills"
              value={user.skills}
            />

            <Info
              label="Hourly Rate"
              value={
                user.hourlyRate
                  ? `₹${user.hourlyRate}/hr`
                  : "-"
              }
            />

            <Info
              label="Portfolio"
              value={user.portfolioUrl}
            />

            <Info
              label="GitHub"
              value={user.githubUrl}
            />

            <Info
              label="LinkedIn"
              value={user.linkedinUrl}
            />

          </div>

          {/* Resume */}

          {user.resumeUrl && (

            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6">

              <h3 className="mb-4 text-xl font-semibold text-white">
                Resume
              </h3>

              <a
                href={`http://localhost:8080${user.resumeUrl}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
              >
                <FileText size={18} />

                View Resume
              </a>

            </div>

          )}

        </div>

      </div>

    </div>
  );
}

export default UserDetailsModal;