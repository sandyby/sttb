import apiClient from "./api-client";
import type { GetNewsListResponse, NewsDetail } from "@/types/news";
import type { GetEventListResponse } from "@/types/events";
import type { GetMediaListResponse } from "@/types/media";
import type { CategoryResponse } from "@/types/shared";
import type { PageListItem, PageDetail } from "@/types/pages";
import type {
  StudyProgramListItem,
  StudyProgramDetail,
} from "@/types/study-programs";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:5001";

export function getImageUrl(path: string | null | undefined): string | null {
  if (!path) return null;
  if (path.startsWith("http")) return path;
  return `${API_URL}${path}`;
}

// ─── News ─────────────────────────────────────────────────────────────────────

export async function getNewsList(
  params: {
    page?: number;
    pageSize?: number;
    category?: string;
    search?: string;
  } = {},
): Promise<GetNewsListResponse> {
  const { data } = await apiClient.get<GetNewsListResponse>("/api/news/list", {
    params: {
      isPublished: true,
      ...(params.page && { page: params.page }),
      ...(params.pageSize && { pageSize: params.pageSize }),
      ...(params.category && { category: params.category }),
      ...(params.search && { search: params.search }),
    },
  });
  return data;
}

export async function getNewsCategories(): Promise<CategoryResponse[]> {
  try {
    const { data } = await apiClient.get<CategoryResponse[]>(
      "/api/news/categories",
    );
    return data;
  } catch {
    return [];
  }
}

export async function getNewsDetail(slug: string): Promise<NewsDetail | null> {
  try {
    const { data } = await apiClient.get<NewsDetail>(`/api/news/${slug}`);
    return data;
  } catch (err: unknown) {
    if (err && typeof err === "object" && "response" in err) {
      const axiosErr = err as { response?: { status?: number } };
      if (axiosErr.response?.status === 404) return null;
    }
    throw err;
  }
}

// ─── Events ───────────────────────────────────────────────────────────────────

export async function getEventList(
  params: {
    page?: number;
    pageSize?: number;
    category?: string;
    search?: string;
  } = {},
): Promise<GetEventListResponse> {
  const { data } = await apiClient.get<GetEventListResponse>(
    "/api/events/list",
    {
      params: {
        isPublished: true,
        ...(params.page && { page: params.page }),
        ...(params.pageSize && { pageSize: params.pageSize }),
        ...(params.category && { category: params.category }),
        ...(params.search && { search: params.search }),
      },
    },
  );
  return data;
}

export async function getEventCategories(): Promise<CategoryResponse[]> {
  try {
    const { data } = await apiClient.get<CategoryResponse[]>(
      "/api/events/categories",
    );
    return data;
  } catch {
    return [];
  }
}

// ─── Media ────────────────────────────────────────────────────────────────────

export async function getMediaList(
  params: {
    page?: number;
    pageSize?: number;
    type?: string;
    category?: string;
    search?: string;
  } = {},
): Promise<GetMediaListResponse> {
  const { data } = await apiClient.get<GetMediaListResponse>(
    "/api/media/list",
    {
      params: {
        ...(params.page && { page: params.page }),
        ...(params.pageSize && { pageSize: params.pageSize }),
        ...(params.type && { type: params.type }),
        ...(params.category && { category: params.category }),
        ...(params.search && { search: params.search }),
      },
    },
  );
  return data;
}

export async function getMediaCategories(): Promise<CategoryResponse[]> {
  try {
    const { data } = await apiClient.get<CategoryResponse[]>(
      "/api/media/categories",
    );
    return data;
  } catch {
    return [];
  }
}

// ─── Pages ────────────────────────────────────────────────────────────────────

export async function getPagesList(): Promise<PageListItem[]> {
  const { data } = await apiClient.get<PageListItem[]>("/api/page");
  return data;
}

export async function getPageBySlug(slug: string): Promise<PageDetail | null> {
  try {
    const { data } = await apiClient.get<PageDetail>(`/api/page/${slug}`);
    return data;
  } catch {
    return null;
  }
}

// ─── Study Programs ───────────────────────────────────────────────────────────

export async function getStudyProgramsList(): Promise<StudyProgramListItem[]> {
  const { data } = await apiClient.get<StudyProgramListItem[]>(
    "/api/study-programs/list",
    { params: { isPublished: true } },
  );
  return data;
}

export async function getStudyProgramBySlug(
  slug: string,
): Promise<StudyProgramDetail | null> {
  try {
    const { data } = await apiClient.get<StudyProgramDetail>(
      `/api/study-programs/${slug}`,
    );
    return data;
  } catch {
    return null;
  }
}
