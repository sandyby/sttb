import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import {
  adminGetFoundationMemberList,
  adminCreateFoundationMember,
  adminUpdateFoundationMember,
  adminDeleteFoundationMember,
} from "@/lib/admin-api";
import type { CreateFoundationMemberPayload, FoundationMemberListParams } from "@/types/foundation";

export function useAdminFoundationList(params: FoundationMemberListParams = {}) {
  const { data: session } = useSession();
  const token = session?.accessToken ?? "";

  return useQuery({
    queryKey: ["admin", "foundation", "list", params],
    queryFn: () => adminGetFoundationMemberList(token, params),
    enabled: !!token,
  });
}

export function useAdminCreateFoundationMember() {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const token = session?.accessToken ?? "";

  return useMutation({
    mutationFn: (payload: CreateFoundationMemberPayload) => adminCreateFoundationMember(token, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "foundation"] });
      queryClient.invalidateQueries({ queryKey: ["foundation"] });
    },
  });
}

export function useAdminUpdateFoundationMember() {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const token = session?.accessToken ?? "";

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: CreateFoundationMemberPayload }) =>
      adminUpdateFoundationMember(token, id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "foundation"] });
      queryClient.invalidateQueries({ queryKey: ["foundation"] });
    },
  });
}

export function useAdminDeleteFoundationMember() {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const token = session?.accessToken ?? "";

  return useMutation({
    mutationFn: (id: string) => adminDeleteFoundationMember(token, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "foundation"] });
      queryClient.invalidateQueries({ queryKey: ["foundation"] });
    },
  });
}

export function useAdminFoundationMemberForEdit(id: string) {
  const { data: session } = useSession();
  const token = session?.accessToken ?? "";

  const listQuery = useQuery({
    queryKey: ["admin", "foundation", "list", {}],
    queryFn: () => adminGetFoundationMemberList(token, {}),
    enabled: !!token && !!id,
    staleTime: 30_000,
  });

  const member = listQuery.data?.members.find((m) => m.id === id) ?? null;
  const notFound = !listQuery.isLoading && !!listQuery.data && !member;

  return {
    isLoading: listQuery.isLoading,
    member,
    notFound,
  };
}
