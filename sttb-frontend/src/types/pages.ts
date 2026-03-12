export interface PageListItem {
  id: string;
  title: string;
  slug: string;
  section: string;
  isPublished: boolean;
  updatedAt: string | null;
}

export interface PageDetail extends PageListItem {
  content: string | null;
  metaDescription: string | null;
  metaKeywords: string | null;
  createdBy: string;
  createdAt: string;
  updatedBy: string | null;
}

export interface CreatePageRequest {
  title: string;
  slug: string;
  section: string;
  content: string | null;
  isPublished: boolean;
  metaDescription?: string | null;
  metaKeywords?: string | null;
}

export interface UpdatePageRequest extends CreatePageRequest {}
