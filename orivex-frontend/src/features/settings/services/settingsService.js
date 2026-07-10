import axiosInstance from "@/config/axios";
import { API } from "@/constants/api";

export async function changePassword(data) {
  const response = await axiosInstance.put(
    API.AUTH.CHANGE_PASSWORD,
    data
  );

  return response.data;
}