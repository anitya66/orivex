import {
  User,
  Briefcase,
  IndianRupee,
  Code2,
  FileText,
  Globe,
  Building2,
  FileBadge,
} from "lucide-react";

function Card({
  icon: Icon,
  title,
  value,
}) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6 transition hover:border-blue-500/40">

      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10">

        <Icon
          size={22}
          className="text-blue-400"
        />

      </div>

      <p className="text-sm uppercase tracking-wider text-slate-500">
        {title}
      </p>

      <p className="mt-3 whitespace-pre-wrap break-words text-slate-300 leading-7">
        {value || "-"}
      </p>

    </div>
  );
}

function ProfileInfoCard({
  user,
  profile,
}) {
  const isFreelancer =
    user?.role === "FREELANCER";

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8">

      <h2 className="mb-8 text-3xl font-bold text-white">
        Profile Information
      </h2>

      {isFreelancer ? (

        <div className="grid gap-6 md:grid-cols-2">

          <Card
            icon={User}
            title="Bio"
            value={profile.bio}
          />

          <Card
            icon={Code2}
            title="Skills"
            value={profile.skills}
          />

          <Card
            icon={IndianRupee}
            title="Hourly Rate"
            value={
              profile.hourlyRate
                ? `₹${profile.hourlyRate}/hr`
                : "-"
            }
          />

          <Card
            icon={Briefcase}
            title="Experience"
            value={profile.experienceYears}
          />

          <Card
            icon={Globe}
            title="Portfolio"
            value={profile.portfolioUrl}
          />

          <Card
            icon={FileText}
            title="Resume"
            value={
              profile.resumeUrl
                ? "Uploaded"
                : "Not Uploaded"
            }
          />

        </div>

      ) : (

        <div className="grid gap-6 md:grid-cols-2">

          <Card
            icon={Building2}
            title="Company Name"
            value={profile.companyName}
          />

          <Card
            icon={Globe}
            title="Website"
            value={profile.website}
          />

          <div className="md:col-span-2">

            <Card
              icon={FileBadge}
              title="Company Description"
              value={profile.companyDescription}
            />

          </div>

        </div>

      )}

    </div>
  );
}

export default ProfileInfoCard;