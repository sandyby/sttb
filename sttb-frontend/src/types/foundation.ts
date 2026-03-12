export interface FoundationMemberListParams {
  category?: string;
  isActive?: boolean;
  orderByRecent?: boolean;
  page?: number;
  pageSize?: number;
}

export interface FoundationMember {
  id: string;
  name: string;
  position: string;
  category: "pembina" | "pengurus" | "anggota";
  description?: string;
  imageUrl?: string;
  displayOrder: number;
  isActive: boolean;
}

export interface GetFoundationMemberListResponse {
  members: FoundationMember[];
  totalCount: number;
}

export interface CreateFoundationMemberPayload {
  name: string;
  position: string;
  category: string;
  description?: string;
  imageUrl?: string;
  displayOrder: number;
  isActive: boolean;
}

export interface UpdateFoundationMemberPayload extends CreateFoundationMemberPayload {
  id: string;
}
