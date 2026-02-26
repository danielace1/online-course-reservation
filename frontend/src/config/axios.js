import axios from "axios";
import { useAuthStore } from "../store/useAuthStore";

const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL || "http://localhost:5001/api"}`,
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().logout();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
