import apiClient from "./axios";
import type { GetNewsListResponse } from "@/types/news";

function authHeader(token: string) {
  return { Authorization: `Bearer ${token}` };
}

// ─── News ─────────────────────────────────────────────────────────────────────

export async function adminGetNewsList(
  token: string,
  params: { page?: number; pageSize?: number; category?: string; search?: string } = {},
): Promise<GetNewsListResponse> {
  const { data } = await apiClient.get<GetNewsListResponse>("/api/news/list", {
    headers: authHeader(token),
    params: {
      ...(params.page && { page: params.page }),
      ...(params.pageSize && { pageSize: params.pageSize }),
      ...(params.category && { category: params.category }),
      ...(params.search && { search: params.search }),
    },
  });
  return data;
}

export interface CreateNewsPayload {
  title: string;
  slug: string;
  content: string;
  excerpt?: string | null;
  thumbnailUrl?: string | null;
  categoryId?: string | null;
  isFeatured: boolean;
  isPublished: boolean;
}

export async function adminCreateNews(token: string, payload: CreateNewsPayload): Promise<string> {
  const { data } = await apiClient.post<string>("/api/news/create", payload, {
    headers: authHeader(token),
  });
  return data;
}

export async function adminDeleteNews(token: string, id: string): Promise<void> {
  await apiClient.delete(`/api/news/delete/${id}`, { headers: authHeader(token) });
}

export interface UpdateNewsPayload {
  title: string;
  slug: string;
  content: string;
  excerpt?: string | null;
  thumbnailUrl?: string | null;
  categoryId?: string | null;
  isFeatured: boolean;
  isPublished: boolean;
}

export async function adminUpdateNews(token: string, id: string, payload: UpdateNewsPayload): Promise<void> {
  await apiClient.put(`/api/news/update/${id}`, payload, { headers: authHeader(token) });
}
