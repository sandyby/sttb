import axios, { type AxiosError, type AxiosInstance } from "axios";
import { getSession } from "next-auth/react";
import type { ApiError, PaginatedResponse } from "@/types/api";
import { toast } from "sonner";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error("NEXT_PUBLIC_API_BASE_URL environment variable is not set");
}

// ─── Axios instance ───────────────────────────────────────────────────────────

const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

// ─── Request interceptor — attach Bearer token ───────────────────────────────

apiClient.interceptors.request.use(
  async (config) => {
    const session = await getSession();
    if (session?.accessToken) {
      config.headers.Authorization = `Bearer ${session.accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// ─── Response interceptor — normalise errors ─────────────────────────────────

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<{ detail?: string; message?: string }>) => {
    const status = error.response?.status;
    const data = error.response?.data;

    // 401 — session expired or token revoked; redirect to login
    if (status === 401) {
      if (typeof window !== "undefined") {
        toast.error("Session expired", {
          description: "Your session has expired. Please log in again.",
        });
        window.location.href = "/admin/login";
      }
    }

    return Promise.reject({
      status: error.response?.status ?? 0,
      message: data?.detail ?? data?.message ?? error.message,
      data,
    } satisfies ApiError);
  },
);

// Re-export shared types so consumers don't need two imports
export type { PaginatedResponse, ApiError };

export default apiClient;
