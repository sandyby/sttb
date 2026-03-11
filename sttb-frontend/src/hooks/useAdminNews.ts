import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { adminGetNewsList, adminCreateNews, adminDeleteNews, adminUpdateNews, type CreateNewsPayload, type UpdateNewsPayload } from "@/lib/admin-api";
import { getNewsDetail } from "@/lib/api";

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

export function useUpdateNews() {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const token = session?.accessToken ?? "";

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateNewsPayload }) =>
      adminUpdateNews(token, id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "news"] });
    },
  });
}

export function useAdminNewsForEdit(id: string) {
  const { data: session } = useSession();
  const token = session?.accessToken ?? "";

  const listQuery = useQuery({
    queryKey: ["admin", "news", "list", { pageSize: 100 }],
    queryFn: () => adminGetNewsList(token, { pageSize: 100 }),
    enabled: !!token && !!id,
    staleTime: 30_000,
  });

  const slug = listQuery.data?.items.find((item) => item.id === id)?.slug;

  const detailQuery = useQuery({
    queryKey: ["news", "detail", slug],
    queryFn: () => getNewsDetail(slug!),
    enabled: !!slug,
  });

  const notFound = !listQuery.isLoading && !!listQuery.data && !slug;

  return {
    isLoading: listQuery.isLoading || (!!slug && detailQuery.isLoading),
    detail: detailQuery.data ?? null,
    notFound,
  };
}
