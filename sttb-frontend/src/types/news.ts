export type NewsListItem = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  thumbnailUrl: string | null;
  category: string | null;
  isFeatured: boolean;
  isPublished: boolean;
  publishedAt: string | null;
  createdAt: string;
};

export type GetNewsListResponse = {
  items: NewsListItem[];
  totalCount: number;
  page: number;
  pageSize: number;
};

export type NewsDetail = {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  thumbnailUrl: string | null;
  category: string | null;
  isFeatured: boolean;
  isPublished: boolean;
  publishedAt: string | null;
  createdAt: string;
  createdBy: string;
  updatedAt: string | null;
  updatedBy: string | null;
};
