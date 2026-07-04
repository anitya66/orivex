import axiosInstance from "@/config/axios";
import { API } from "@/constants/api";

export async function login(loginData) {
  const response = await axiosInstance.post(
    API.AUTH.LOGIN,
    loginData
  );

  return response.data;
}

export async function getCurrentUser() {
  const response = await axiosInstance.get(
    API.AUTH.ME
  );

  return response.data;
}