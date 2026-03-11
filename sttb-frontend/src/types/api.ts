/**
 * Shared API response shapes — mirrors backend paginated response contract
 */

export interface PaginatedResponse<T> {
  items: T[];
  totalCount: number;
  page: number;
  pageSize: number;
}

export interface ApiError {
  status: number;
  message: string;
  data?: Record<string, unknown>;
}
