import { useQuery } from "@tanstack/react-query";
import { getPagesList, getPageBySlug } from "@/libs/api";

export const pageKeys = {
  all: ["pages"] as const,
  lists: () => [...pageKeys.all, "list"] as const,
  details: () => [...pageKeys.all, "detail"] as const,
  detail: (slug: string) => [...pageKeys.details(), slug] as const,
};

export function usePagesList() {
  return useQuery({
    queryKey: pageKeys.lists(),
    queryFn: getPagesList,
    staleTime: 5 * 60 * 1000,
  });
}

export function usePageBySlug(slug: string) {
  return useQuery({
    queryKey: pageKeys.detail(slug),
    queryFn: () => getPageBySlug(slug),
    enabled: !!slug,
    staleTime: 5 * 60 * 1000,
  });
}
