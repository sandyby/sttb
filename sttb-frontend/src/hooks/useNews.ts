import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/libs/api-client";
import { getNewsList, getNewsCategories } from "@/libs/api";
import { adminCreateNewsCategory } from "@/libs/admin-api";
import { useSession } from "next-auth/react";
import type {
  NewsListItem,
  NewsDetail,
  GetNewsListResponse,
  CreateNewsRequest,
  UpdateNewsRequest,
  GetNewsListRequest,
} from "@/types/news";

// ─── Query key factory ────────────────────────────────────────────────────────

export const newsKeys = {
  all: ["news"] as const,
  lists: () => [...newsKeys.all, "list"] as const,
  list: (params: GetNewsListRequest) => [...newsKeys.lists(), params] as const,
  details: () => [...newsKeys.all, "detail"] as const,
  detail: (slug: string) => [...newsKeys.details(), slug] as const,
};

// ─── Queries ─────────────────────────────────────────────────────────────────

/**
 * Fetch paginated news — public endpoint, no auth required
 */
export function useGetNews(params: GetNewsListRequest = {}) {
  const { page = 1, pageSize = 10, ...rest } = params;
  return useQuery({
    queryKey: newsKeys.list({ page, pageSize, ...rest }),
    queryFn: async () => {
      const res = await apiClient.get<GetNewsListResponse>("/api/news/list", {
        params: { page, pageSize, ...rest },
      });
      return res.data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

/**
 * Fetch a single news article by slug — public endpoint
 */
export function useGetNewsBySlug(slug: string) {
  return useQuery({
    queryKey: newsKeys.detail(slug),
    queryFn: async () => {
      const res = await apiClient.get<NewsDetail>(`/api/news/${slug}`);
      return res.data;
    },
    enabled: Boolean(slug),
  });
}

interface NewsListParams {
  page?: number;
  pageSize?: number;
  category?: string;
  search?: string;
}

export function useNewsList(params: NewsListParams = {}) {
  return useQuery({
    queryKey: ["news", "list", params],
    queryFn: () => getNewsList(params),
  });
}

export function useNewsCategories() {
  return useQuery({
    queryKey: ["news", "categories"],
    queryFn: getNewsCategories,
    staleTime: 5 * 60 * 1000,
  });
}

// ─── Mutations ────────────────────────────────────────────────────────────────

/**
 * Create a news article — admin only
 * Returns the new article's Guid (as string)
 */
export function useCreateNews() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: CreateNewsRequest) => {
      const res = await apiClient.post<string>("/api/news/create", data);
      return res.data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: newsKeys.lists() });
    },
  });
}

/**
 * Update a news article — admin only
 * Pass { id, ...fields } — id goes to URL, rest goes to body
 */
export function useUpdateNews() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...data }: UpdateNewsRequest & { id: string }) => {
      await apiClient.put<void>(`/api/news/update/${id}`, data);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: newsKeys.all });
    },
  });
}

/**
 * Delete a news article by id — admin only
 */
export function useDeleteNews() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await apiClient.delete<void>(`/api/news/delete/${id}`);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: newsKeys.lists() });
    },
  });
}

export function useCreateNewsCategory() {
  const { data: session } = useSession();
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (payload: { name: string; slug: string }) =>
      adminCreateNewsCategory(session?.accessToken ?? "", payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["news", "categories"] });
    },
  });
}
