import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import {
  adminGetAdmissionWaveList,
  adminCreateAdmissionWave,
  adminUpdateAdmissionWave,
  adminDeleteAdmissionWave,
} from "@/libs/admin-api";
import type { CreateAdmissionWavePayload } from "@/types/admission";

export function useAdminAdmissionWaveList(params: { isActive?: boolean } = {}) {
  const { data: session } = useSession();
  const token = session?.accessToken ?? "";

  return useQuery({
    queryKey: ["admin", "admission-waves", "list", params],
    queryFn: () => adminGetAdmissionWaveList(token, params),
    enabled: !!token,
  });
}

export function useAdminCreateAdmissionWave() {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const token = session?.accessToken ?? "";

  return useMutation({
    mutationFn: (payload: CreateAdmissionWavePayload) => adminCreateAdmissionWave(token, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "admission-waves"] });
      queryClient.invalidateQueries({ queryKey: ["admission-waves"] });
    },
  });
}

export function useAdminUpdateAdmissionWave() {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const token = session?.accessToken ?? "";

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: CreateAdmissionWavePayload }) =>
      adminUpdateAdmissionWave(token, id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "admission-waves"] });
      queryClient.invalidateQueries({ queryKey: ["admission-waves"] });
    },
  });
}

export function useAdminDeleteAdmissionWave() {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const token = session?.accessToken ?? "";

  return useMutation({
    mutationFn: (id: string) => adminDeleteAdmissionWave(token, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "admission-waves"] });
      queryClient.invalidateQueries({ queryKey: ["admission-waves"] });
    },
  });
}

export function useAdminAdmissionWaveForEdit(id: string) {
  const { data: session } = useSession();
  const token = session?.accessToken ?? "";

  const listQuery = useQuery({
    queryKey: ["admin", "admission-waves", "list", {}],
    queryFn: () => adminGetAdmissionWaveList(token, {}),
    enabled: !!token && !!id,
    staleTime: 30_000,
  });

  const wave = listQuery.data?.items.find((w) => w.id === id) ?? null;
  const notFound = !listQuery.isLoading && !!listQuery.data && !wave;

  return { isLoading: listQuery.isLoading, wave, notFound };
}
