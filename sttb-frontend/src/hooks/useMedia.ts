import { useQuery } from "@tanstack/react-query";
import { getMediaList, getMediaCategories } from "@/lib/api";

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
