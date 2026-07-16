import {
  User,
  Building2,
  Globe,
  Briefcase,
} from "lucide-react";

import {
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";

function ProfileHeader({
  user,
  profile,
}) {
  const isFreelancer =
    user?.role === "FREELANCER";

  const image = isFreelancer
    ? profile?.profileImage
    : profile?.companyLogo;

  // Backend Base URL
  const API_BASE =
    import.meta.env.VITE_API_BASE_URL.replace("/api/v1", "");

  // Full Image URL
  const imageUrl = image
    ? `${API_BASE}${image}`
    : null;

  return (
    <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950">

      {/* Background Glow */}

      <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-blue-600/10 blur-[140px]" />

      <div className="absolute -right-24 -bottom-24 h-72 w-72 rounded-full bg-cyan-500/10 blur-[140px]" />

      <div className="relative p-8 lg:p-10">

        <div className="flex flex-col gap-10 lg:flex-row lg:items-center">

          {/* Avatar */}

          <div className="relative">

            <div className="absolute inset-0 rounded-full bg-blue-500/30 blur-2xl" />

            <div className="relative flex h-40 w-40 items-center justify-center overflow-hidden rounded-full border-4 border-blue-500 bg-slate-800 shadow-2xl">

              {imageUrl ? (

                <img
                  src={imageUrl}
                  alt="Profile"
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    console.log("Image failed:", imageUrl);
                    e.currentTarget.style.display = "none";
                  }}
                />

              ) : isFreelancer ? (

                <User
                  size={72}
                  className="text-slate-500"
                />

              ) : (

                <Building2
                  size={72}
                  className="text-slate-500"
                />

              )}

            </div>

          </div>

          {/* Details */}

          <div className="flex-1">

            <div className="flex flex-wrap items-center gap-4">

              <h1 className="text-5xl font-black text-white">
                {profile?.name}
              </h1>

              <span
                className={`rounded-full px-4 py-2 text-sm font-semibold ${
                  isFreelancer
                    ? profile?.available
                      ? "bg-emerald-500/20 text-emerald-400"
                      : "bg-red-500/20 text-red-400"
                    : "bg-blue-500/20 text-blue-400"
                }`}
              >
                {isFreelancer
                  ? profile?.available
                    ? "Available for Work"
                    : "Currently Unavailable"
                  : "Verified Client"}
              </span>

            </div>

            <p className="mt-3 text-lg text-slate-400">
              {profile?.email}
            </p>

            {isFreelancer ? (

              <>

                <p className="mt-5 text-2xl font-semibold text-blue-400">
                  {profile?.headline || "Professional Freelancer"}
                </p>

                <div className="mt-8 flex flex-wrap gap-4">

                  {profile?.portfolioUrl && (
                    <a
                      href={profile.portfolioUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
                    >
                      <Briefcase size={18} />
                      Portfolio
                    </a>
                  )}

                  {profile?.githubUrl && (
                    <a
                      href={profile.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800 px-5 py-3 text-white transition hover:border-blue-500"
                    >
                      <FaGithub size={18} />
                      GitHub
                    </a>
                  )}

                  {profile?.linkedinUrl && (
                    <a
                      href={profile.linkedinUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800 px-5 py-3 text-white transition hover:border-blue-500"
                    >
                      <FaLinkedin size={18} />
                      LinkedIn
                    </a>
                  )}

                </div>

              </>

            ) : (

              <>

                <p className="mt-5 text-2xl font-semibold text-blue-400">
                  {profile?.companyName || "Company"}
                </p>

                {profile?.website && (
                  <a
                    href={profile.website}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-8 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
                  >
                    <Globe size={18} />
                    Visit Website
                  </a>
                )}

              </>

            )}

          </div>

          {/* Stats */}

          <div className="grid w-full gap-5 sm:grid-cols-3 lg:w-auto lg:grid-cols-1">

            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 text-center">

              <h3 className="text-3xl font-black text-blue-400">
                {isFreelancer
                  ? profile?.experienceYears ?? 0
                  : "-"}
              </h3>

              <p className="mt-2 text-sm text-slate-400">
                Experience
              </p>

            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 text-center">

              <h3 className="text-3xl font-black text-cyan-400">
                {isFreelancer
                  ? `₹${profile?.hourlyRate ?? 0}`
                  : "-"}
              </h3>

              <p className="mt-2 text-sm text-slate-400">
                Hourly Rate
              </p>

            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 text-center">

              <h3 className="text-3xl font-black text-emerald-400">
                {isFreelancer
                  ? profile?.skills
                    ? profile.skills.split(",").length
                    : 0
                  : "-"}
              </h3>

              <p className="mt-2 text-sm text-slate-400">
                Skills
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default ProfileHeader;