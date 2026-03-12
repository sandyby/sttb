import { useQuery } from "@tanstack/react-query";
import { adminGetFoundationMemberList } from "@/lib/admin-api";

export function useFoundationMembers() {
  return useQuery({
    queryKey: ["foundation", "members"],
    queryFn: () => adminGetFoundationMemberList("", { isActive: true }),
  });
}
