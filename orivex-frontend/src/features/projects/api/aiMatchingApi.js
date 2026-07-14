import api from "@/config/axios";

export async function getAiMatches(projectId) {
  const response = await api.get(
    `/ai/projects/${projectId}/matches`
  );

  return response.data;
}