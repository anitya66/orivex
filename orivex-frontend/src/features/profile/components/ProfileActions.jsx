import {
  Pencil,
  Image,
  Trash2,
  FileText,
  Upload,
  Eye,
} from "lucide-react";

function ActionCard({
  icon: Icon,
  title,
  description,
  children,
}) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6">

      <div className="mb-5 flex items-center gap-3">

        <div className="rounded-xl bg-blue-500/10 p-3">

          <Icon
            size={20}
            className="text-blue-400"
          />

        </div>

        <div>

          <h3 className="font-bold text-white">
            {title}
          </h3>

          <p className="text-sm text-slate-400">
            {description}
          </p>

        </div>

      </div>

      <div className="space-y-3">
        {children}
      </div>

    </div>
  );
}

function ProfileActions({
  user,
  profile,
  onEdit,
  onUploadResume,
  onUploadImage,
  onRemoveResume,
  onRemoveImage,
}) {
  const isFreelancer =
    user?.role === "FREELANCER";

  const hasImage = isFreelancer
    ? !!profile?.profileImage
    : !!profile?.companyLogo;

  const hasResume =
    !!profile?.resumeUrl;

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8">

      <h2 className="mb-8 text-3xl font-bold text-white">
        Profile Actions
      </h2>

      <div className="grid gap-6 lg:grid-cols-3">

        {/* Edit */}

        <ActionCard
          icon={Pencil}
          title="Edit Profile"
          description="Update your personal information."
        >

          <button
            onClick={onEdit}
            className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            Edit Profile
          </button>

        </ActionCard>

        {/* Image */}

        <ActionCard
          icon={Image}
          title={
            isFreelancer
              ? "Profile Image"
              : "Company Logo"
          }
          description="Upload or remove your image."
        >

          <button
            onClick={onUploadImage}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-800 py-3 font-medium text-white transition hover:bg-slate-700"
          >
            <Upload size={18} />

            {hasImage
              ? "Change Image"
              : "Upload Image"}
          </button>

          {hasImage && (

            <button
              onClick={onRemoveImage}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 py-3 font-medium text-white transition hover:bg-red-700"
            >
              <Trash2 size={18} />

              Remove Image
            </button>

          )}

        </ActionCard>

        {/* Resume */}

        {isFreelancer && (

          <ActionCard
            icon={FileText}
            title="Resume"
            description="Manage your professional resume."
          >

            <button
              onClick={onUploadResume}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-800 py-3 font-medium text-white transition hover:bg-slate-700"
            >
              <Upload size={18} />

              {hasResume
                ? "Replace Resume"
                : "Upload Resume"}
            </button>

            {hasResume && (

              <>
                <a
                  href={`http://localhost:8080${profile.resumeUrl}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 py-3 font-medium text-white transition hover:bg-emerald-700"
                >
                  <Eye size={18} />

                  View Resume
                </a>

                <button
                  onClick={onRemoveResume}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 py-3 font-medium text-white transition hover:bg-red-700"
                >
                  <Trash2 size={18} />

                  Remove Resume
                </button>
              </>

            )}

          </ActionCard>

        )}

      </div>

    </div>
  );
}

export default ProfileActions;