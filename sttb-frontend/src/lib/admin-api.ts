import apiClient from "./axios";
import type { GetNewsListResponse } from "@/types/news";
import type { GetEventListResponse } from "@/types/events";
import type { GetLecturerListResponse } from "@/types/lecturers";
import type { GetMediaListResponse, GetMediaListRequest } from "@/types/media";
import type {
  PageListItem,
  PageDetail,
  CreatePageRequest,
  UpdatePageRequest,
} from "@/types/pages";
import type {
  StudyProgramListItem,
  StudyProgramDetail,
  CreateStudyProgramRequest,
  UpdateStudyProgramRequest,
} from "@/types/study-programs";
import type {
  FoundationMember,
  GetFoundationMemberListResponse,
  CreateFoundationMemberPayload,
  UpdateFoundationMemberPayload,
  FoundationMemberListParams,
} from "@/types/foundation";

function authHeader(token: string) {
  return { Authorization: `Bearer ${token}` };
}

// ─── News ─────────────────────────────────────────────────────────────────────

export async function adminGetNewsList(
  token: string,
  params: {
    page?: number;
    pageSize?: number;
    category?: string;
    search?: string;
  } = {},
): Promise<GetNewsListResponse> {
  const { data } = await apiClient.get<GetNewsListResponse>("/api/news/list", {
    headers: authHeader(token),
    params: {
      ...(params.page && { page: params.page }),
      ...(params.pageSize && { pageSize: params.pageSize }),
      ...(params.category && { category: params.category }),
      ...(params.search && { search: params.search }),
    },
  });
  return data;
}

export interface CreateNewsPayload {
  title: string;
  slug: string;
  content: string;
  excerpt?: string | null;
  thumbnailUrl?: string | null;
  categoryId?: string | null;
  isFeatured: boolean;
  isPublished: boolean;
}

export async function adminCreateNews(
  token: string,
  payload: CreateNewsPayload,
): Promise<string> {
  const { data } = await apiClient.post<string>("/api/news/create", payload, {
    headers: authHeader(token),
  });
  return data;
}

export async function adminDeleteNews(
  token: string,
  id: string,
): Promise<void> {
  await apiClient.delete(`/api/news/delete/${id}`, {
    headers: authHeader(token),
  });
}

export async function adminCreateNewsCategory(
  token: string,
  payload: { name: string; slug: string },
): Promise<string> {
  const { data } = await apiClient.post<string>("/api/news/categories/create", payload, {
    headers: authHeader(token),
  });
  return data;
}

export interface UpdateNewsPayload {
  title: string;
  slug: string;
  content: string;
  excerpt?: string | null;
  thumbnailUrl?: string | null;
  categoryId?: string | null;
  isFeatured: boolean;
  isPublished: boolean;
}

export async function adminUpdateNews(
  token: string,
  id: string,
  payload: UpdateNewsPayload,
): Promise<void> {
  await apiClient.put(`/api/news/update/${id}`, payload, {
    headers: authHeader(token),
  });
}

// ─── Events ───────────────────────────────────────────────────────────────────

export async function adminGetEventList(
  token: string,
  params: { page?: number; pageSize?: number; category?: string } = {},
): Promise<GetEventListResponse> {
  const { data } = await apiClient.get<GetEventListResponse>(
    "/api/events/list",
    {
      headers: authHeader(token),
      params: {
        ...(params.page && { page: params.page }),
        ...(params.pageSize && { pageSize: params.pageSize }),
        ...(params.category && { category: params.category }),
      },
    },
  );
  return data;
}

export interface EventPayload {
  title: string;
  description: string;
  startDate: string;
  endDate?: string | null;
  location?: string | null;
  imageUrl?: string | null;
  categoryId?: string | null;
  registrationUrl?: string | null;
  isPublished: boolean;
}

export async function adminCreateEvent(
  token: string,
  payload: EventPayload,
): Promise<string> {
  const { data } = await apiClient.post<string>("/api/events/create", payload, {
    headers: authHeader(token),
  });
  return data;
}

export async function adminUpdateEvent(
  token: string,
  id: string,
  payload: EventPayload,
): Promise<void> {
  await apiClient.put(`/api/events/update/${id}`, payload, {
    headers: authHeader(token),
  });
}

export async function adminDeleteEvent(
  token: string,
  id: string,
): Promise<void> {
  await apiClient.delete(`/api/events/delete/${id}`, {
    headers: authHeader(token),
  });
}

// ─── Pages ────────────────────────────────────────────────────────────────────

export async function adminGetPagesList(
  token: string,
): Promise<PageListItem[]> {
  const { data } = await apiClient.get<PageListItem[]>("/api/page", {
    headers: authHeader(token),
  });
  return data;
}

export async function adminGetPageById(
  token: string,
  id: string,
): Promise<PageDetail> {
  const { data } = await apiClient.get<PageDetail>(`/api/page/detail/${id}`, {
    headers: authHeader(token),
  });
  return data;
}

export async function adminCreatePage(
  token: string,
  payload: CreatePageRequest,
): Promise<string> {
  const { data } = await apiClient.post<string>("/api/page/create", payload, {
    headers: authHeader(token),
  });
  return data;
}

export async function adminUpdatePage(
  token: string,
  id: string,
  payload: UpdatePageRequest,
): Promise<void> {
  await apiClient.put(`/api/page/update/${id}`, payload, {
    headers: authHeader(token),
  });
}

export async function adminDeletePage(
  token: string,
  id: string,
): Promise<void> {
  await apiClient.delete(`/api/page/delete/${id}`, {
    headers: authHeader(token),
  });
}

// ─── Study Programs ───────────────────────────────────────────────────────────

export async function adminGetStudyProgramsList(
  token: string,
): Promise<StudyProgramListItem[]> {
  const { data } = await apiClient.get<StudyProgramListItem[]>(
    "/api/study-programs/list",
    {
      headers: authHeader(token),
    },
  );
  return data;
}

export async function adminGetStudyProgramById(
  token: string,
  id: string,
): Promise<StudyProgramDetail> {
  const { data } = await apiClient.get<StudyProgramDetail>(
    `/api/study-programs/detail/${id}`,
    {
      headers: authHeader(token),
    },
  );
  return data;
}

export async function adminCreateStudyProgram(
  token: string,
  payload: CreateStudyProgramRequest,
): Promise<string> {
  const { data } = await apiClient.post<string>(
    "/api/study-programs/create",
    payload,
    {
      headers: authHeader(token),
    },
  );
  return data;
}

export async function adminUpdateStudyProgram(
  token: string,
  id: string,
  payload: UpdateStudyProgramRequest,
): Promise<void> {
  await apiClient.put(`/api/study-programs/update/${id}`, payload, {
    headers: authHeader(token),
  });
}

export async function adminDeleteStudyProgram(
  token: string,
  id: string,
): Promise<void> {
  await apiClient.delete(`/api/study-programs/delete/${id}`, {
    headers: authHeader(token),
  });
}

export async function adminCreateEventCategory(
  token: string,
  payload: { name: string; slug: string },
): Promise<string> {
  const { data } = await apiClient.post<string>("/api/events/categories/create", payload, {
    headers: authHeader(token),
  });
  return data;
}

// ─── Media ────────────────────────────────────────────────────────────────────

export async function adminGetMediaList(
  token: string,
  params: GetMediaListRequest = {},
): Promise<GetMediaListResponse> {
  const { data } = await apiClient.get<GetMediaListResponse>("/api/media/list", {
    headers: authHeader(token),
    params,
  });
  return data;
}

export async function adminCreateMediaCategory(
  token: string,
  payload: { name: string; slug: string },
): Promise<string> {
  const { data } = await apiClient.post<string>("/api/media/categories/create", payload, {
    headers: authHeader(token),
  });
  return data;
}

// ─── Lecturers ────────────────────────────────────────────────────────────────

export interface LecturerPayload {
  name: string;
  title: string;
  rank: string;
  degree: string;
  specialization: string;
  imageUrl?: string | null;
  email?: string | null;
  bio: string;
  courses: string[];
  almaMater: string;
  origin: string;
  displayOrder: number;
  isActive: boolean;
}

export async function adminGetLecturerList(
  token: string,
  params: { page?: number; pageSize?: number; rank?: string; search?: string; isActive?: boolean } = {},
): Promise<GetLecturerListResponse> {
  const { data } = await apiClient.get<GetLecturerListResponse>("/api/lecturers/list", {
    headers: authHeader(token),
    params: {
      ...(params.page && { page: params.page }),
      ...(params.pageSize && { pageSize: params.pageSize }),
      ...(params.rank && { rank: params.rank }),
      ...(params.search && { search: params.search }),
      ...(params.isActive !== undefined && { isActive: params.isActive }),
    },
  });
  return data;
}

export async function adminCreateLecturer(
  token: string,
  payload: LecturerPayload,
): Promise<string> {
  const { data } = await apiClient.post<string>("/api/lecturers/create", payload, {
    headers: authHeader(token),
  });
  return data;
}

export async function adminUpdateLecturer(
  token: string,
  id: string,
  payload: LecturerPayload,
): Promise<void> {
  await apiClient.put(`/api/lecturers/update/${id}`, payload, {
    headers: authHeader(token),
  });
}

export async function adminDeleteLecturer(
  token: string,
  id: string,
): Promise<void> {
  await apiClient.delete(`/api/lecturers/delete/${id}`, {
    headers: authHeader(token),
  });
}

// ─── Foundation ──────────────────────────────────────────────────────────────

export async function adminGetFoundationMemberList(
  token: string,
  params: FoundationMemberListParams = {},
): Promise<GetFoundationMemberListResponse> {
  const { data } = await apiClient.get<GetFoundationMemberListResponse>("/api/foundation/list", {
    headers: authHeader(token),
    params: {
      ...params,
      ...(params.page && { page: params.page }),
      ...(params.pageSize && { pageSize: params.pageSize }),
    },
  });
  return data;
}

export async function adminCreateFoundationMember(
  token: string,
  payload: CreateFoundationMemberPayload,
): Promise<string> {
  const { data } = await apiClient.post<string>("/api/foundation/create", payload, {
    headers: authHeader(token),
  });
  return data;
}

export async function adminUpdateFoundationMember(
  token: string,
  id: string,
  payload: CreateFoundationMemberPayload,
): Promise<void> {
  await apiClient.put(`/api/foundation/update/${id}`, payload, {
    headers: authHeader(token),
  });
}

export async function adminDeleteFoundationMember(
  token: string,
  id: string,
): Promise<void> {
  await apiClient.delete(`/api/foundation/delete/${id}`, {
    headers: authHeader(token),
  });
}
