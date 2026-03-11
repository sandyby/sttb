import axios, { type AxiosError, type AxiosInstance } from "axios";
import { getSession } from "next-auth/react";
import type { ApiError, PaginatedResponse } from "@/types/api";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error("NEXT_PUBLIC_API_BASE_URL environment variable is not set");
}

// ─── Axios instance ───────────────────────────────────────────────────────────

export const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
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
  (error) => Promise.reject(error)
);

// ─── Response interceptor — normalise errors ─────────────────────────────────

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<{ detail?: string; message?: string }>) => {
    // 401 — session expired or token revoked; redirect to login
    if (error.response?.status === 401) {
      if (typeof window !== "undefined") {
        window.location.href = "/admin/login";
      }
    }

    const data = error.response?.data;
    return Promise.reject({
      status: error.response?.status ?? 0,
      message: data?.detail ?? data?.message ?? error.message,
      data,
    } satisfies ApiError);
  }
);

// Re-export shared types so consumers don't need two imports
export type { PaginatedResponse, ApiError };
