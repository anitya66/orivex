import api from "@/config/axios";

export async function deleteProject(id) {
  const response = await api.delete(`/projects/${id}`);
  return response.data;
}