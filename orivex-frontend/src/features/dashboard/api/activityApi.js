import api from "@/config/axios";

export async function getRecentActivity() {
  const { data } = await api.get("/activity/recent");

  return data.data;
}