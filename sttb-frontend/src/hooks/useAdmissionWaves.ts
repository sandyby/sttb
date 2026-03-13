import { useQuery } from "@tanstack/react-query";
import apiClient from "@/libs/api-client";
import type { GetAdmissionWaveListResponse } from "@/types/admission";

async function getAdmissionWaves(
  isActive?: boolean,
): Promise<GetAdmissionWaveListResponse> {
  const { data } = await apiClient.get<GetAdmissionWaveListResponse>(
    "/api/admission-waves/list",
    {
      params: isActive !== undefined ? { isActive } : {},
    },
  );
  return data;
}

export function useAdmissionWaves(isActive?: boolean) {
  return useQuery({
    queryKey: ["admission-waves", { isActive }],
    queryFn: () => getAdmissionWaves(isActive),
  });
}
