import type { GetNewsListResponse, NewsDetail } from "@/types/news";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5001";

export function getImageUrl(path: string | null | undefined): string | null {
  if (!path) return null;
  if (path.startsWith("http")) return path;
  return `${API_URL}${path}`;
}

// ─── News ─────────────────────────────────────────────────────────────────────

export async function getNewsList(params: {
  page?: number;
  pageSize?: number;
  category?: string;
  search?: string;
} = {}): Promise<GetNewsListResponse> {
  const url = new URL(`${API_URL}/api/news/list`);
  url.searchParams.set("isPublished", "true");
  if (params.page) url.searchParams.set("page", String(params.page));
  if (params.pageSize) url.searchParams.set("pageSize", String(params.pageSize));
  if (params.category) url.searchParams.set("category", params.category);
  if (params.search) url.searchParams.set("search", params.search);

  const res = await fetch(url.toString(), { next: { revalidate: 60 } });
  if (!res.ok) throw new Error("Failed to fetch news list");
  return res.json();
}

export async function getNewsCategories(): Promise<string[]> {
  const res = await fetch(`${API_URL}/api/news/categories`, {
    next: { revalidate: 300 },
  });
  if (!res.ok) return [];
  return res.json();
}

export async function getNewsDetail(slug: string): Promise<NewsDetail | null> {
  const res = await fetch(`${API_URL}/api/news/${slug}`, {
    next: { revalidate: 60 },
  });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error("Failed to fetch news detail");
  return res.json();
}
