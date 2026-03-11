import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { adminGetNewsList, adminCreateNews, adminDeleteNews, type CreateNewsPayload } from "@/lib/admin-api";

interface NewsListParams {
  page?: number;
  pageSize?: number;
  category?: string;
  search?: string;
}

export function useAdminNewsList(params: NewsListParams = {}) {
  const { data: session } = useSession();
  const token = session?.accessToken ?? "";

  return useQuery({
    queryKey: ["admin", "news", "list", params],
    queryFn: () => adminGetNewsList(token, params),
    enabled: !!token,
  });
}

export function useCreateNews() {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const token = session?.accessToken ?? "";

  return useMutation({
    mutationFn: (payload: CreateNewsPayload) => adminCreateNews(token, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "news"] });
    },
  });
}

export function useDeleteNews() {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const token = session?.accessToken ?? "";

  return useMutation({
    mutationFn: (id: string) => adminDeleteNews(token, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "news"] });
    },
  });
}
