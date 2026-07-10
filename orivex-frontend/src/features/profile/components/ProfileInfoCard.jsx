function ProfileInfoCard({
  user,
  profile,
}) {
  const isFreelancer =
    user?.role === "FREELANCER";

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8">

      <h2 className="mb-8 text-2xl font-bold text-white">
        Profile Information
      </h2>

      {isFreelancer ? (

        <div className="grid gap-8 md:grid-cols-2">

          <div>

            <h3 className="mb-2 font-semibold text-blue-400">
              Bio
            </h3>

            <p className="text-slate-300">
              {profile.bio || "-"}
            </p>

          </div>

          <div>

            <h3 className="mb-2 font-semibold text-blue-400">
              Skills
            </h3>

            <p className="text-slate-300">
              {profile.skills || "-"}
            </p>

          </div>

          <div>

            <h3 className="mb-2 font-semibold text-blue-400">
              Hourly Rate
            </h3>

            <p className="text-slate-300">
              ₹{profile.hourlyRate}/hr
            </p>

          </div>

          <div>

            <h3 className="mb-2 font-semibold text-blue-400">
              Experience
            </h3>

            <p className="text-slate-300">
              {profile.experienceYears ?? "-"}
            </p>

          </div>

          <div>

            <h3 className="mb-2 font-semibold text-blue-400">
              Portfolio
            </h3>

            <p className="text-slate-300">
              {profile.portfolioUrl || "-"}
            </p>

          </div>

          <div>

            <h3 className="mb-2 font-semibold text-blue-400">
              Resume
            </h3>

            <p className="text-slate-300">
              {profile.resumeUrl || "Not uploaded"}
            </p>

          </div>

        </div>

      ) : (

        <div className="space-y-8">

          <div>

            <h3 className="mb-2 font-semibold text-blue-400">
              Company Description
            </h3>

            <p className="text-slate-300">
              {profile.companyDescription || "-"}
            </p>

          </div>

          <div>

            <h3 className="mb-2 font-semibold text-blue-400">
              Website
            </h3>

            <p className="text-slate-300">
              {profile.website || "-"}
            </p>

          </div>

        </div>

      )}

    </div>
  );
}

export default ProfileInfoCard;