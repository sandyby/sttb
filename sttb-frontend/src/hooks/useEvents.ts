import { useQuery } from "@tanstack/react-query";
import { getEventList, getEventCategories } from "@/lib/api";

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
