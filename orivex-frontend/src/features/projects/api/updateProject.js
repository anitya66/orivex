import api from "@/config/axios";

export async function updateProject(id, data) {
  const response = await api.put(`/projects/${id}`, data);
  return response.data;
}