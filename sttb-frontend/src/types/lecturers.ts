export interface LecturerListItem {
  id: string;
  name: string;
  title: string;
  rank: "pimpinan" | "tetap" | "tidak-tetap";
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
  createdAt: string;
}

export interface GetLecturerListResponse {
  items: LecturerListItem[];
  totalCount: number;
  page: number;
  pageSize: number;
}

export interface GetLecturerListRequest {
  page?: number;
  pageSize?: number;
  rank?: string;
  search?: string;
  isActive?: boolean;
}
