/**
 * Media types — mirror sttb.Contracts.RequestModels.Media / ResponseModels.Media
 * and sttb.Contracts.ResponseModels.Upload
 */

// ─── Response shapes ─────────────────────────────────────────────────────────

export interface MediaListItem {
  id: string;              // Guid → string
  title: string;
  url: string;
  type: string;            // "image" | "video"
  thumbnailUrl?: string | null;
  category?: string | null;
  tag?: string | null;
  createdAt: string;       // ISO 8601
}

export interface GetMediaListResponse {
  items: MediaListItem[];
  totalCount: number;
  page: number;
  pageSize: number;
}

export interface UploadResponse {
  url: string;
  fileName?: string;
}

// ─── Request shapes ──────────────────────────────────────────────────────────

export interface CreateMediaRequest {
  title: string;
  url: string;
  type: string;
  thumbnailUrl?: string | null;
  category?: string | null;
  tag?: string | null;
}

export interface GetMediaListRequest {
  page?: number;
  pageSize?: number;
  type?: string;
  category?: string;
}
