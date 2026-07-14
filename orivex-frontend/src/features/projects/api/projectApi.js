import api from "@/config/axios";

export async function getOpenProjects(params) {
  const response = await api.get("/projects/open", {
    params,
  });

  return response.data;
}

export async function getMyProjects() {
  const response = await api.get("/projects/my");
  return response.data;
}

export async function getProjectById(id) {
  const response = await api.get(`/projects/${id}`);
  return response.data;
}