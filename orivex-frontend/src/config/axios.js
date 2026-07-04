import axios from "axios";
import env from "./env";
import { STORAGE_KEYS } from "@/constants/storageKeys";

const token = localStorage.getItem(
  STORAGE_KEYS.ACCESS_TOKEN
);

const axiosInstance = axios.create({
  baseURL: env.API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;