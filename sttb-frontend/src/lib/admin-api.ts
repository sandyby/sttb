import apiClient from "./axios";
import type { GetNewsListResponse } from "@/types/news";
import type { GetEventListResponse } from "@/types/events";
import type { GetMediaListResponse, GetMediaListRequest } from "@/types/media";

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

export async function adminCreateNewsCategory(
  token: string,
  payload: { name: string; slug: string },
): Promise<string> {
  const { data } = await apiClient.post<string>("/api/news/categories/create", payload, {
    headers: authHeader(token),
  });
  return data;
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

// ─── Events ───────────────────────────────────────────────────────────────────

export async function adminGetEventList(
  token: string,
  params: { page?: number; pageSize?: number; category?: string } = {},
): Promise<GetEventListResponse> {
  const { data } = await apiClient.get<GetEventListResponse>("/api/events/list", {
    headers: authHeader(token),
    params: {
      ...(params.page && { page: params.page }),
      ...(params.pageSize && { pageSize: params.pageSize }),
      ...(params.category && { category: params.category }),
    },
  });
  return data;
}

export interface EventPayload {
  title: string;
  description: string;
  startDate: string;
  endDate?: string | null;
  location?: string | null;
  imageUrl?: string | null;
  categoryId?: string | null;
  registrationUrl?: string | null;
  isPublished: boolean;
}

export async function adminCreateEvent(token: string, payload: EventPayload): Promise<string> {
  const { data } = await apiClient.post<string>("/api/events/create", payload, {
    headers: authHeader(token),
  });
  return data;
}

export async function adminUpdateEvent(token: string, id: string, payload: EventPayload): Promise<void> {
  await apiClient.put(`/api/events/update/${id}`, payload, { headers: authHeader(token) });
}

export async function adminDeleteEvent(token: string, id: string): Promise<void> {
  await apiClient.delete(`/api/events/delete/${id}`, { headers: authHeader(token) });
}

export async function adminCreateEventCategory(
  token: string,
  payload: { name: string; slug: string },
): Promise<string> {
  const { data } = await apiClient.post<string>("/api/events/categories/create", payload, {
    headers: authHeader(token),
  });
  return data;
}

// ─── Media ────────────────────────────────────────────────────────────────────

export async function adminGetMediaList(
  token: string,
  params: GetMediaListRequest = {},
): Promise<GetMediaListResponse> {
  const { data } = await apiClient.get<GetMediaListResponse>("/api/media/list", {
    headers: authHeader(token),
    params,
  });
  return data;
}

export async function adminCreateMediaCategory(
  token: string,
  payload: { name: string; slug: string },
): Promise<string> {
  const { data } = await apiClient.post<string>("/api/media/categories/create", payload, {
    headers: authHeader(token),
  });
  return data;
}
