import api from "@/config/axios";

export async function closeProject(id) {
  const response = await api.put(`/projects/${id}/close`);
  return response.data;
}