import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { adminGetNewsList, adminGetEventList, adminGetMediaList } from "@/libs/admin-api";

export function useAdminDashboard() {
  const { data: session } = useSession();
  const token = session?.accessToken ?? "";

  // 1. Fetch stats
  const news = useQuery({
    queryKey: ["admin", "news", "count"],
    queryFn: () => adminGetNewsList(token, { pageSize: 1 }),
    enabled: !!token,
  });

  const events = useQuery({
    queryKey: ["admin", "events", "all"],
    queryFn: () => adminGetEventList(token, { pageSize: 100 }), // Get many to check activity
    enabled: !!token,
  });

  const media = useQuery({
    queryKey: ["admin", "media", "count"],
    queryFn: () => adminGetMediaList(token, { pageSize: 1 }),
    enabled: !!token,
  });

  // 2. Fetch recent lists
  const recentNews = useQuery({
    queryKey: ["admin", "news", "recent"],
    queryFn: () => adminGetNewsList(token, { pageSize: 5 }),
    enabled: !!token,
  });

  const now = new Date();
  const upcomingEvents = (events.data?.items ?? [])
    .filter(e => new Date(e.startDate) >= now)
    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
    .slice(0, 3);

  const activeEventsCount = (events.data?.items ?? [])
    .filter(e => new Date(e.startDate) >= now).length;

  return {
    stats: {
      totalNews: news.data?.totalCount ?? 0,
      activeEvents: activeEventsCount,
      totalMedia: media.data?.totalCount ?? 0,
      // Visitors remains mock or 0 for now as no backend exists
      visitors: "12.4K", 
    },
    recentNews: recentNews.data?.items ?? [],
    upcomingEvents,
    isLoading: news.isLoading || events.isLoading || media.isLoading || recentNews.isLoading,
    isError: news.isError || events.isError || media.isError || recentNews.isError,
  };
}
