import axios from "axios";
import { refreshToken } from "../index";

export const axiosAdminInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
});

axiosAdminInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response) {
      // Token expired - handle 401
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        await refreshToken();
        return axiosAdminInstance(originalRequest);
      }

      // Handle 409 - Unique constraint failed
      if (
        error.response.status === 409 &&
        error.response.data.message.includes("Unique constraint failed")
      ) {
        const fieldName = error.response.data.message.split(":")[1]?.trim();
        return Promise.reject(
          new Error(`A record with the same ${fieldName} already exists.`),
        );
      }

      // Catch all other errors
      const errorMessage = `${error.response.data.message || error.response.statusText}`;

      return Promise.reject(new Error(errorMessage));
    }

    return Promise.reject(error);
  },
);
