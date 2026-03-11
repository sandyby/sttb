/**
 * Events types — mirror sttb.Contracts.RequestModels.Events / ResponseModels.Events
 *
 * NOTE: DateTime fields from C# serialize to ISO 8601 strings in JSON.
 * Guid fields become lowercase UUID strings.
 */

// ─── Response shapes ─────────────────────────────────────────────────────────

export interface EventListItem {
  id: string;              // Guid → string
  title: string;
  description: string;
  startDate: string;       // ISO 8601
  endDate?: string | null;
  location?: string | null;
  imageUrl?: string | null;
  category?: string | null;
  registrationUrl?: string | null;
  isPublished: boolean;
  createdAt: string;       // ISO 8601
}

export interface GetEventListResponse {
  items: EventListItem[];
  totalCount: number;
  page: number;
  pageSize: number;
}

// ─── Request shapes ──────────────────────────────────────────────────────────

export interface CreateEventRequest {
  title: string;
  description: string;
  /** ISO 8601 string — convert from form value via new Date(...).toISOString() */
  startDate: string;
  endDate?: string | null;
  location?: string | null;
  imageUrl?: string | null;
  category?: string | null;
  registrationUrl?: string | null;
  isPublished: boolean;
}

/** Same fields as Create — the id goes in the URL path, not the body */
export type UpdateEventRequest = CreateEventRequest;

export interface GetEventListRequest {
  page?: number;
  pageSize?: number;
  category?: string;
  isPublished?: boolean;
}
