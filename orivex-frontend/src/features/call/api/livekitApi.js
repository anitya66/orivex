import axiosInstance from "@/lib/axios";

export async function getLiveKitToken(data) {

  const response = await axiosInstance.post(
    "/call/token",
    data
  );

  return response.data;
}