import { User, Building2 } from "lucide-react";

function ProfileHeader({
  user,
  profile,
}) {
  const isFreelancer = user?.role === "FREELANCER";

  const image = isFreelancer
    ? profile?.profileImage
    : profile?.companyLogo;

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8">

      <div className="flex flex-col items-center gap-6 md:flex-row">

        {/* Avatar */}

        <div className="flex h-32 w-32 items-center justify-center overflow-hidden rounded-full border-4 border-blue-600 bg-slate-800">

          {image ? (

            <img
              src={`http://localhost:8080${image}`}
              alt="Profile"
              className="h-full w-full object-cover"
            />

          ) : isFreelancer ? (

            <User
              size={60}
              className="text-slate-500"
            />

          ) : (

            <Building2
              size={60}
              className="text-slate-500"
            />

          )}

        </div>

        {/* Information */}

        <div className="flex-1">

          <h1 className="text-4xl font-bold text-white">
            {profile?.name}
          </h1>

          <p className="mt-2 text-slate-400">
            {profile?.email}
          </p>

          {isFreelancer ? (

            <>
              <p className="mt-4 text-xl text-blue-400">
                {profile?.headline}
              </p>

              <span
                className={`mt-4 inline-flex rounded-full px-4 py-2 text-sm font-semibold ${
                  profile?.available
                    ? "bg-green-600 text-white"
                    : "bg-red-600 text-white"
                }`}
              >
                {profile?.available
                  ? "Available"
                  : "Unavailable"}
              </span>
            </>

          ) : (

            <>
              <p className="mt-4 text-xl text-blue-400">
                {profile?.companyName}
              </p>

              {profile?.website && (
                <a
                  href={profile.website}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 block text-blue-500 hover:underline"
                >
                  {profile.website}
                </a>
              )}
            </>

          )}

        </div>

      </div>

    </div>
  );
}

export default ProfileHeader;