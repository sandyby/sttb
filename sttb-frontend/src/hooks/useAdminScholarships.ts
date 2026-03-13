import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { 
    adminGetScholarshipList, 
    adminCreateScholarship, 
    adminUpdateScholarship, 
    adminDeleteScholarship 
} from "@/libs/admin-api";
import { CreateScholarshipRequest } from "@/types/scholarship";

export const useAdminScholarships = () => {
    const { data: session } = useSession();
    const queryClient = useQueryClient();
    const token = session?.accessToken ?? "";

    const listQuery = useQuery({
        queryKey: ["admin-scholarships"],
        queryFn: () => adminGetScholarshipList(token),
        enabled: !!token,
    });

    const createMutation = useMutation({
        mutationFn: (payload: CreateScholarshipRequest) => adminCreateScholarship(token, payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin-scholarships"] });
            queryClient.invalidateQueries({ queryKey: ["scholarships"] });
        },
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, payload }: { id: string; payload: CreateScholarshipRequest }) => 
            adminUpdateScholarship(token, id, payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin-scholarships"] });
            queryClient.invalidateQueries({ queryKey: ["scholarships"] });
        },
    });

    const deleteMutation = useMutation({
        mutationFn: (id: string) => adminDeleteScholarship(token, id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin-scholarships"] });
            queryClient.invalidateQueries({ queryKey: ["scholarships"] });
        },
    });

    return {
        listQuery,
        createMutation,
        updateMutation,
        deleteMutation,
    };
};
