import { useQuery } from "@tanstack/react-query";
import apiClient from "@/libs/api-client";
import { GetScholarshipListResponse } from "@/types/scholarship";

export const useScholarships = (isActive: boolean = true) => {
  return useQuery({
    queryKey: ["scholarships", { isActive }],
    queryFn: async () => {
      const { data } = await apiClient.get<GetScholarshipListResponse>(
        "/api/scholarships/list",
        {
          params: { IsActive: isActive },
        },
      );
      return data;
    },
  });
};
