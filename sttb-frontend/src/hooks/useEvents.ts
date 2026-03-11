import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/libs/api";
import { getEventList, getEventCategories } from "@/lib/api";
import { adminCreateEventCategory } from "@/lib/admin-api";
import { useSession } from "next-auth/react";
import type {
  EventListItem,
  GetEventListResponse,
  CreateEventRequest,
  UpdateEventRequest,
  GetEventListRequest,
} from "@/types/events";

// ─── Query key factory ────────────────────────────────────────────────────────

export const eventKeys = {
  all: ["events"] as const,
  lists: () => [...eventKeys.all, "list"] as const,
  list: (params: GetEventListRequest) =>
    [...eventKeys.lists(), params] as const,
  details: () => [...eventKeys.all, "detail"] as const,
  detail: (id: string) => [...eventKeys.details(), id] as const,
};

// ─── Queries ─────────────────────────────────────────────────────────────────

/**
 * Fetch paginated events — public endpoint, no auth required
 */
export function useGetEvents(params: GetEventListRequest = {}) {
  const { page = 1, pageSize = 10, ...rest } = params;
  return useQuery({
    queryKey: eventKeys.list({ page, pageSize, ...rest }),
    queryFn: async () => {
      const res = await apiClient.get<GetEventListResponse>("/api/events/list", {
        params: { page, pageSize, ...rest },
      });
      return res.data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes — public data, can be cached a while
  });
}

/**
 * Fetch single event by id — kept for potential admin detail view
 */
export function useGetEventById(id: string) {
  return useQuery({
    queryKey: eventKeys.detail(id),
    queryFn: async () => {
      const res = await apiClient.get<EventListItem>(`/api/events/${id}`);
      return res.data;
    },
    enabled: Boolean(id),
  });
}

interface EventListParams {
  page?: number;
  pageSize?: number;
  category?: string;
  search?: string;
}

export function useEventList(params: EventListParams = {}) {
  return useQuery({
    queryKey: ["events", "list", params],
    queryFn: () => getEventList(params),
  });
}

export function useEventCategories() {
  return useQuery({
    queryKey: ["events", "categories"],
    queryFn: getEventCategories,
    staleTime: 5 * 60 * 1000,
  });
}

// ─── Mutations ────────────────────────────────────────────────────────────────

/**
 * Create a new event — admin only
 * Returns the new event's Guid (as string)
 */
export function useCreateEvent() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: CreateEventRequest) => {
      const res = await apiClient.post<string>("/api/events/create", data);
      return res.data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: eventKeys.lists() });
    },
  });
}

/**
 * Update an existing event — admin only
 * Pass { id, ...fields } — id goes to URL, rest goes to body
 */
export function useUpdateEvent() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      ...data
    }: UpdateEventRequest & { id: string }) => {
      await apiClient.put<void>(`/api/events/update/${id}`, data);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: eventKeys.all });
    },
  });
}

/**
 * Delete an event by id — admin only
 */
export function useDeleteEvent() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await apiClient.delete<void>(`/api/events/delete/${id}`);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: eventKeys.lists() });
    },
  });
}

export function useCreateEventCategory() {
  const { data: session } = useSession();
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (payload: { name: string; slug: string }) =>
      adminCreateEventCategory(session?.accessToken ?? "", payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["events", "categories"] });
    },
  });
}
