import { useQuery } from "@tanstack/react-query";
import { getStudyProgramsList, getStudyProgramBySlug } from "@/lib/api";

export const studyProgramKeys = {
  all: ["study-programs"] as const,
  lists: () => [...studyProgramKeys.all, "list"] as const,
  details: () => [...studyProgramKeys.all, "detail"] as const,
  detail: (slug: string) => [...studyProgramKeys.details(), slug] as const,
};

export function useStudyProgramsList() {
  return useQuery({
    queryKey: studyProgramKeys.lists(),
    queryFn: getStudyProgramsList,
    staleTime: 5 * 60 * 1000,
  });
}

export function useStudyProgramBySlug(slug: string) {
  return useQuery({
    queryKey: studyProgramKeys.detail(slug),
    queryFn: () => getStudyProgramBySlug(slug),
    enabled: !!slug,
    staleTime: 5 * 60 * 1000,
  });
}
