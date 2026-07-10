import api from "@/config/axios";

/* ============================
   GET MY PROFILE
============================ */

export async function getProfile(role) {
  if (role === "CLIENT") {
    const { data } = await api.get(
      "/client/profile"
    );
    return data;
  }

  if (role === "FREELANCER") {
    const { data } = await api.get(
      "/freelancer/profile"
    );
    return data;
  }

  throw new Error("Unsupported role");
}

/* ============================
   UPDATE CLIENT PROFILE
============================ */

export async function updateClientProfile(
  profileData
) {
  const { data } = await api.put(
    "/client/profile",
    profileData
  );

  return data;
}

/* ============================
   UPDATE FREELANCER PROFILE
============================ */

export async function updateFreelancerProfile(
  profileData
) {
  const { data } = await api.put(
    "/freelancer/profile",
    profileData
  );

  return data;
}

/* ============================
   UPLOAD PROFILE IMAGE
============================ */

export async function uploadProfileImage(
  file
) {
  const formData = new FormData();

  formData.append("file", file);

  const { data } = await api.post(
    "/freelancer/profile-image",
    formData
  );

  return data;
}

/* ============================
   UPLOAD RESUME
============================ */

export async function uploadResume(
  file
) {
  const formData = new FormData();

  formData.append("file", file);

  const { data } = await api.post(
    "/freelancer/resume",
    formData
  );

  return data;
}

/* ============================
   UPLOAD COMPANY LOGO
============================ */

export async function uploadCompanyLogo(
  file
) {
  const formData = new FormData();

  formData.append("file", file);

  const { data } = await api.post(
    "/client/company-logo",
    formData
  );

  return data;
}