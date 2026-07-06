import api from "@/config/axios";

export async function getProjects(params) {
  const response = await api.get(
    "/projects/paginated",
    {
      params,
    }
  );

  return response.data;
}

export async function getProjectById(id) {
  const response = await api.get(
    `/projects/${id}`
  );

  return response.data;
}