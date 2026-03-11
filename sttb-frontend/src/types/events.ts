export type EventListItem = {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string | null;
  location: string | null;
  imageUrl: string | null;
  category: string | null;
  registrationUrl: string | null;
  isPublished: boolean;
  createdAt: string;
};

export type GetEventListResponse = {
  items: EventListItem[];
  totalCount: number;
  page: number;
  pageSize: number;
};
