import { useState } from "react";

import { useProfile } from "../hooks/useProfile";

import { useAuth } from "@/contexts/AuthContext";

import ProfileHeader from "../components/ProfileHeader";
import ProfileInfoCard from "../components/ProfileInfoCard";
import ProfileActions from "../components/ProfileActions";

import EditProfileModal from "../components/EditProfileModal";
import UploadProfileImageModal from "../components/UploadProfileImageModal";
import UploadResumeModal from "../components/UploadResumeModal";

function ProfilePage() {
  const { user } = useAuth();

  const {
    data,
    isLoading,
    isError,
  } = useProfile();

  const [openEditModal, setOpenEditModal] =
    useState(false);

  const [openImageModal, setOpenImageModal] =
    useState(false);

  const [openResumeModal, setOpenResumeModal] =
    useState(false);

  if (isLoading) {
    return (
      <div className="p-8 text-white">
        Loading profile...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-8 text-red-500">
        Failed to load profile.
      </div>
    );
  }

  const profile = data.data;

  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-4xl font-bold text-white">
          My Profile
        </h1>

        <p className="mt-2 text-slate-400">
          View and manage your profile.
        </p>
      </div>

      <ProfileHeader
        user={user}
        profile={profile}
      />

      <ProfileInfoCard
        user={user}
        profile={profile}
      />

      <ProfileActions
        user={user}
        onEdit={() => setOpenEditModal(true)}
        onUploadResume={() =>
          setOpenResumeModal(true)
        }
        onUploadImage={() =>
          setOpenImageModal(true)
        }
      />

      {openEditModal && (
        <EditProfileModal
          user={user}
          profile={profile}
          onClose={() =>
            setOpenEditModal(false)
          }
        />
      )}

      {openImageModal && (
  <UploadProfileImageModal
    user={user}
    onClose={() =>
      setOpenImageModal(false)
    }
  />
)}
        

      {user?.role === "FREELANCER" &&
        openResumeModal && (
          <UploadResumeModal
            onClose={() =>
              setOpenResumeModal(false)
            }
          />
        )}

    </div>
  );
}

export default ProfilePage;