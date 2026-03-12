import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import {
  adminGetLecturerList,
  adminCreateLecturer,
  adminUpdateLecturer,
  adminDeleteLecturer,
  type LecturerPayload,
} from "@/lib/admin-api";

interface LecturerListParams {
  page?: number;
  pageSize?: number;
  rank?: string;
  search?: string;
  isActive?: boolean;
}

export function useAdminLecturerList(params: LecturerListParams = {}) {
  const { data: session } = useSession();
  const token = session?.accessToken ?? "";

  return useQuery({
    queryKey: ["admin", "lecturers", "list", params],
    queryFn: () => adminGetLecturerList(token, params),
    enabled: !!token,
  });
}

export function useAdminCreateLecturer() {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const token = session?.accessToken ?? "";

  return useMutation({
    mutationFn: (payload: LecturerPayload) => adminCreateLecturer(token, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "lecturers"] });
      queryClient.invalidateQueries({ queryKey: ["lecturers"] });
    },
  });
}

export function useAdminUpdateLecturer() {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const token = session?.accessToken ?? "";

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: LecturerPayload }) =>
      adminUpdateLecturer(token, id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "lecturers"] });
      queryClient.invalidateQueries({ queryKey: ["lecturers"] });
    },
  });
}

export function useAdminDeleteLecturer() {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const token = session?.accessToken ?? "";

  return useMutation({
    mutationFn: (id: string) => adminDeleteLecturer(token, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "lecturers"] });
      queryClient.invalidateQueries({ queryKey: ["lecturers"] });
    },
  });
}

export function useAdminLecturerForEdit(id: string) {
  const { data: session } = useSession();
  const token = session?.accessToken ?? "";

  const listQuery = useQuery({
    queryKey: ["admin", "lecturers", "list", { pageSize: 200 }],
    queryFn: () => adminGetLecturerList(token, { pageSize: 200 }),
    enabled: !!token && !!id,
    staleTime: 30_000,
  });

  const lecturer = listQuery.data?.items.find((l) => l.id === id) ?? null;
  const notFound = !listQuery.isLoading && !!listQuery.data && !lecturer;

  return {
    isLoading: listQuery.isLoading,
    lecturer,
    notFound,
  };
}
