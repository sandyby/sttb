import { useQuery } from "@tanstack/react-query";
import { adminGetFoundationMemberList } from "@/libs/admin-api";

export function useFoundationMembers() {
  return useQuery({
    queryKey: ["foundation", "members"],
    queryFn: () => adminGetFoundationMemberList("", { isActive: true }),
  });
}
