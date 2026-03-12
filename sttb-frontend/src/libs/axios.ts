import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5001";

export const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

// Response interceptor to handle session expiration
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // If we get a 401, the session/token is likely invalid or expired
    if (error.response?.status === 401) {
      if (typeof window !== "undefined") {
        // Redirect to login with a hint
        window.location.href = "/admin/login?error=SessionExpired";
      }
    }
    return Promise.reject(error);
  },
);

export default apiClient;
