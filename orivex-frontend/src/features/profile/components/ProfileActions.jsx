function ProfileActions({
  user,
  onEdit,
  onUploadResume,
  onUploadImage,
}) {
  const isFreelancer =
    user?.role === "FREELANCER";

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8">
      <h2 className="mb-6 text-2xl font-bold text-white">
        Actions
      </h2>

      <div className="flex flex-wrap gap-4">
        <button
          onClick={onEdit}
          className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          Edit Profile
        </button>

        {isFreelancer && (
          <button
            onClick={onUploadResume}
            className="rounded-xl bg-slate-700 px-6 py-3 font-semibold text-white transition hover:bg-slate-600"
          >
            Upload Resume
          </button>
        )}

        <button
          onClick={onUploadImage}
          className="rounded-xl bg-slate-700 px-6 py-3 font-semibold text-white transition hover:bg-slate-600"
        >
          {isFreelancer
            ? "Upload Profile Image"
            : "Upload Company Logo"}
        </button>
      </div>
    </div>
  );
}

export default ProfileActions;