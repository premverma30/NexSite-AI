import axios from "axios";
import { store } from "../redux/store"; // We'll keep redux for UI/auth state
import { setUserData } from "../redux/userSlice";

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    // Handle unauthorized globally
    if (error.response?.status === 401) {
      store.dispatch(setUserData(null));
      // Optional: redirect to home if not already there
      if (window.location.pathname !== "/") {
        window.location.href = "/";
      }
    }
    
    // Format error message to be consistent
    const message = error.response?.data?.message || error.message || "An unexpected error occurred";
    return Promise.reject(new Error(message));
  }
);
