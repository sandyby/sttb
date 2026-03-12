export interface Scholarship {
    id: string;
    name: string;
    level: string;
    color: string;
    imageUrl?: string;
    description: string;
    requirements: string[];
    displayOrder: number;
    isActive: boolean;
}

export interface GetScholarshipListResponse {
    items: Scholarship[];
}

export interface CreateScholarshipRequest {
    name: string;
    level: string;
    color: string;
    imageUrl?: string;
    description: string;
    requirements: string[];
    displayOrder: number;
    isActive: boolean;
}

export interface UpdateScholarshipRequest extends CreateScholarshipRequest {
    id: string;
}
