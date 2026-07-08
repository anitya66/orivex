import api from "@/config/axios";

export async function getDashboard() {
  const { data } = await api.get("/dashboard");

  return data.data;
}