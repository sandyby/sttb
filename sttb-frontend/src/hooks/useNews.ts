import { useQuery } from "@tanstack/react-query";
import { getNewsList, getNewsCategories } from "@/lib/api";

interface NewsListParams {
  page?: number;
  pageSize?: number;
  category?: string;
  search?: string;
}

export function useNewsList(params: NewsListParams = {}) {
  return useQuery({
    queryKey: ["news", "list", params],
    queryFn: () => getNewsList(params),
  });
}

export function useNewsCategories() {
  return useQuery({
    queryKey: ["news", "categories"],
    queryFn: getNewsCategories,
    staleTime: 5 * 60 * 1000,
  });
}
