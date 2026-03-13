/**
 * News types — mirror sttb.Contracts.RequestModels.News / ResponseModels.News
 */

// ─── Response shapes ─────────────────────────────────────────────────────────

export interface NewsListItem {
  id: string;              // Guid → string
  title: string;
  slug: string;
  excerpt?: string | null;
  thumbnailUrl?: string | null;
  category?: string | null;
  author?: string | null;
  tags: string[];
  isFeatured: boolean;
  isPublished: boolean;
  publishedAt?: string | null; // ISO 8601
  createdAt: string;           // ISO 8601
}

export interface NewsDetail extends NewsListItem {
  content: string;
  createdBy: string;
  updatedAt?: string | null;
  updatedBy?: string | null;
}

export interface GetNewsListResponse {
  items: NewsListItem[];
  totalCount: number;
  page: number;
  pageSize: number;
}

// ─── Request shapes ──────────────────────────────────────────────────────────

export interface CreateNewsRequest {
  title: string;
  slug: string;
  content: string;
  excerpt?: string | null;
  thumbnailUrl?: string | null;
  categoryId?: string | null;
  author?: string | null;
  tags: string[];
  isFeatured: boolean;
  isPublished: boolean;
}

/** Same fields as Create — the id goes in the URL path, not the body */
export type UpdateNewsRequest = CreateNewsRequest;

export interface GetNewsListRequest {
  page?: number;
  pageSize?: number;
  category?: string;
  isFeatured?: boolean;
  isPublished?: boolean;
}
