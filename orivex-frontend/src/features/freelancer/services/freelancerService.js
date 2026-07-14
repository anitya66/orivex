import api from "@/config/axios";

export async function getFreelancerProfile(id) {
  const { data } = await api.get(
    `/freelancer/profile/${id}`
  );

  return data;
}