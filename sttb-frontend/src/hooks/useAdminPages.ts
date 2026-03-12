import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import {
  adminGetPagesList,
  adminCreatePage,
  adminUpdatePage,
  adminDeletePage,
  adminGetPageById,
} from "@/libs/admin-api";
import { CreatePageRequest, UpdatePageRequest } from "@/types/pages";
import { pageKeys } from "./usePages";

export function useAdminPagesList() {
  const { data: session } = useSession();
  const token = session?.accessToken ?? "";

  return useQuery({
    queryKey: ["admin", "pages", "list"],
    queryFn: () => adminGetPagesList(token),
    enabled: !!token,
  });
}

export function useCreatePage() {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const token = session?.accessToken ?? "";

  return useMutation({
    mutationFn: (payload: CreatePageRequest) => adminCreatePage(token, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "pages"] });
      queryClient.invalidateQueries({ queryKey: pageKeys.all });
    },
  });
}

export function useUpdatePage() {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const token = session?.accessToken ?? "";

  return useMutation({
    mutationFn: ({
      slug,
      payload,
    }: {
      slug: string;
      payload: UpdatePageRequest;
    }) => adminUpdatePage(token, slug, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "pages"] });
      queryClient.invalidateQueries({ queryKey: pageKeys.all });
    },
  });
}

export function useDeletePage() {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const token = session?.accessToken ?? "";

  return useMutation({
    mutationFn: (id: string) => adminDeletePage(token, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "pages"] });
      queryClient.invalidateQueries({ queryKey: pageKeys.all });
    },
  });
}
