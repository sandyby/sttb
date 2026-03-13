import { useQuery } from "@tanstack/react-query";
import apiClient from "@/libs/api-client";
import type {
  GetLecturerListResponse,
  GetLecturerListRequest,
} from "@/types/lecturers";

async function getLecturerList(
  params: GetLecturerListRequest,
): Promise<GetLecturerListResponse> {
  const { data } = await apiClient.get<GetLecturerListResponse>(
    "/api/lecturers/list",
    { params },
  );
  return data;
}

export function useGetLecturers(params: GetLecturerListRequest = {}) {
  return useQuery({
    queryKey: ["lecturers", params],
    queryFn: () => getLecturerList(params),
    staleTime: 60_000,
  });
}
