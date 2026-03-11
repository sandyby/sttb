import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import {
  adminGetEventList,
  adminCreateEvent,
  adminUpdateEvent,
  adminDeleteEvent,
  type EventPayload,
} from "@/lib/admin-api";

interface EventListParams {
  page?: number;
  pageSize?: number;
  category?: string;
}

export function useAdminEventList(params: EventListParams = {}) {
  const { data: session } = useSession();
  const token = session?.accessToken ?? "";

  return useQuery({
    queryKey: ["admin", "events", "list", params],
    queryFn: () => adminGetEventList(token, params),
    enabled: !!token,
  });
}

export function useAdminCreateEvent() {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const token = session?.accessToken ?? "";

  return useMutation({
    mutationFn: (payload: EventPayload) => adminCreateEvent(token, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "events"] });
    },
  });
}

export function useAdminUpdateEvent() {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const token = session?.accessToken ?? "";

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: EventPayload }) =>
      adminUpdateEvent(token, id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "events"] });
    },
  });
}

export function useAdminDeleteEvent() {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const token = session?.accessToken ?? "";

  return useMutation({
    mutationFn: (id: string) => adminDeleteEvent(token, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "events"] });
    },
  });
}

export function useAdminEventForEdit(id: string) {
  const { data: session } = useSession();
  const token = session?.accessToken ?? "";

  const { data, isLoading } = useQuery({
    queryKey: ["admin", "events", "list", { pageSize: 100 }],
    queryFn: () => adminGetEventList(token, { pageSize: 100 }),
    enabled: !!token && !!id,
    staleTime: 30_000,
  });

  const event = data?.items.find((item) => item.id === id) ?? null;
  const notFound = !isLoading && !!data && !event;

  return { isLoading, event, notFound };
}
