import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/libs/api-client";
import type {
  MediaListItem,
  GetMediaListResponse,
  CreateMediaRequest,
  GetMediaListRequest,
} from "@/types/media";

// ─── Query key factory ────────────────────────────────────────────────────────

export const mediaKeys = {
  all: ["media"] as const,
  lists: () => [...mediaKeys.all, "list"] as const,
  list: (params: GetMediaListRequest) =>
    [...mediaKeys.lists(), params] as const,
  details: () => [...mediaKeys.all, "detail"] as const,
  detail: (id: string) => [...mediaKeys.details(), id] as const,
};

// ─── Queries ─────────────────────────────────────────────────────────────────

/**
 * Fetch paginated media — public endpoint, no auth required
 */
export function useGetMedia(params: GetMediaListRequest = {}) {
  const { page = 1, pageSize = 10, ...rest } = params;
  return useQuery({
    queryKey: mediaKeys.list({ page, pageSize, ...rest }),
    queryFn: async () => {
      const res = await apiClient.get<GetMediaListResponse>("/api/media/list", {
        params: { page, pageSize, ...rest },
      });
      return res.data;
    },
    staleTime: 1000 * 60 * 5,
  });
}

// ─── Mutations ────────────────────────────────────────────────────────────────

/**
 * Create a media record (after the file has been uploaded via useUploadImage/useUploadVideo)
 * Admin only — pass the URL returned from the upload hook
 */
export function useCreateMedia() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: CreateMediaRequest) => {
      const res = await apiClient.post<string>("/api/media/create", data);
      return res.data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: mediaKeys.lists() });
    },
  });
}

/**
 * Delete a media record by id — admin only
 */
export function useDeleteMedia() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await apiClient.delete<void>(`/api/media/delete/${id}`);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: mediaKeys.lists() });
    },
  });
}
import { useQuery } from "@tanstack/react-query";
import { getMediaList, getMediaCategories } from "@/libs/api";

interface MediaListParams {
  page?: number;
  pageSize?: number;
  type?: string;
  category?: string;
  search?: string;
}

export function useMediaList(params: MediaListParams = {}) {
  return useQuery({
    queryKey: ["media", "list", params],
    queryFn: () => getMediaList(params),
  });
}

export function useMediaCategories() {
  return useQuery({
    queryKey: ["media", "categories"],
    queryFn: getMediaCategories,
    staleTime: 5 * 60 * 1000,
  });
}
