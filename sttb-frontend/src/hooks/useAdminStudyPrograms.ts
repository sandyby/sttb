import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import {
  adminGetStudyProgramsList,
  adminCreateStudyProgram,
  adminUpdateStudyProgram,
  adminDeleteStudyProgram,
  adminGetStudyProgramById,
} from "@/libs/admin-api";
import {
  CreateStudyProgramRequest,
  UpdateStudyProgramRequest,
} from "@/types/study-programs";
import { studyProgramKeys } from "./useStudyPrograms";

export function useAdminStudyProgramsList() {
  const { data: session } = useSession();
  const token = session?.accessToken ?? "";

  return useQuery({
    queryKey: ["admin", "study-programs", "list"],
    queryFn: () => adminGetStudyProgramsList(token),
    enabled: !!token,
  });
}

export function useCreateStudyProgram() {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const token = session?.accessToken ?? "";

  return useMutation({
    mutationFn: (payload: CreateStudyProgramRequest) =>
      adminCreateStudyProgram(token, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "study-programs"] });
      queryClient.invalidateQueries({ queryKey: studyProgramKeys.all });
    },
  });
}

export function useUpdateStudyProgram() {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const token = session?.accessToken ?? "";

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: UpdateStudyProgramRequest;
    }) => adminUpdateStudyProgram(token, id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "study-programs"] });
      queryClient.invalidateQueries({ queryKey: studyProgramKeys.all });
    },
  });
}

export function useDeleteStudyProgram() {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const token = session?.accessToken ?? "";

  return useMutation({
    mutationFn: (id: string) => adminDeleteStudyProgram(token, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "study-programs"] });
      queryClient.invalidateQueries({ queryKey: studyProgramKeys.all });
    },
  });
}

export function useAdminStudyProgramDetail(id: string) {
  const { data: session } = useSession();
  const token = session?.accessToken ?? "";

  return useQuery({
    queryKey: ["admin", "study-programs", "detail", id],
    queryFn: () => adminGetStudyProgramById(token, id),
    enabled: !!token && !!id,
  });
}
