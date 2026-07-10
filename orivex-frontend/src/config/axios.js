import axios from "axios";
import env from "./env";
import { STORAGE_KEYS } from "@/constants/storageKeys";

const axiosInstance = axios.create({
  baseURL: env.API_BASE_URL,
  timeout: 10000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(
      STORAGE_KEYS.ACCESS_TOKEN
    );

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;