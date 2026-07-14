import api from "@/config/axios";

/* ===========================
   GET PROFILE
=========================== */

export async function getFreelancerProfile() {
  const { data } = await api.get("/freelancer/profile");
  return data;
}

export async function getClientProfile() {
  const { data } = await api.get("/client/profile");
  return data;
}

/* ===========================
   UPDATE PROFILE
=========================== */

export async function updateFreelancerProfile(payload) {
  const { data } = await api.put(
    "/freelancer/profile",
    payload
  );

  return data;
}

export async function updateClientProfile(payload) {
  const { data } = await api.put(
    "/client/profile",
    payload
  );

  return data;
}

/* ===========================
   PROFILE IMAGE
=========================== */

export async function uploadProfileImage(file) {
  const formData = new FormData();

  formData.append("file", file);

  const { data } = await api.post(
    "/freelancer/profile-image",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return data;
}

export async function uploadCompanyLogo(file) {
  const formData = new FormData();

  formData.append("file", file);

  const { data } = await api.post(
    "/client/company-logo",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return data;
}

/* ===========================
   RESUME
=========================== */

export async function uploadResume(file) {
  const formData = new FormData();

  formData.append("file", file);

  const { data } = await api.post(
    "/freelancer/resume",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return data;
}

/* ===========================
   REMOVE IMAGE
=========================== */

export async function removeProfileImage() {
  const { data } = await api.delete(
    "/freelancer/profile-image"
  );

  return data;
}

export async function removeCompanyLogo() {
  const { data } = await api.delete(
    "/client/company-logo"
  );

  return data;
}

/* ===========================
   REMOVE RESUME
=========================== */

export async function removeResume() {
  const { data } = await api.delete(
    "/freelancer/resume"
  );

  return data;
}