import { useUserDetails } from "../hooks/useUserDetails";

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

      <div className="fixed inset-0 flex items-center justify-center bg-black/60">

        <div className="rounded-2xl bg-slate-900 p-8 text-white">

          Loading...

        </div>

      </div>

    );

  }

  const user = data.data;

  return (

    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">

      <div className="w-full max-w-2xl rounded-2xl bg-slate-900 p-8">

        <div className="mb-6 flex items-center justify-between">

          <h2 className="text-3xl font-bold text-white">

            User Details

          </h2>

          <button

            onClick={onClose}

            className="text-slate-400 hover:text-white"

          >

            ✕

          </button>

        </div>

        <div className="space-y-3 text-white">

          <p>

            <strong>Name:</strong> {user.name}

          </p>

          <p>

            <strong>Email:</strong> {user.email}

          </p>

          <p>

            <strong>Role:</strong> {user.role}

          </p>

          <p>

            <strong>Status:</strong> {user.accountStatus}

          </p>

          <p>

            <strong>Bio:</strong> {user.bio || "-"}

          </p>

          <p>

            <strong>Skills:</strong> {user.skills || "-"}

          </p>

          <p>

            <strong>Experience:</strong> {user.experienceYears ?? "-"}

          </p>

          <p>

            <strong>Hourly Rate:</strong> ₹{user.hourlyRate ?? "-"}

          </p>

        </div>

      </div>

    </div>

  );

}

export default UserDetailsModal;