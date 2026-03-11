export type MediaListItem = {
  id: string;
  title: string;
  url: string;
  type: string; // "video" | "article"
  thumbnailUrl: string | null;
  category: string | null;
  tag: string | null;
  createdAt: string;
};

export type GetMediaListResponse = {
  items: MediaListItem[];
  totalCount: number;
  page: number;
  pageSize: number;
};
