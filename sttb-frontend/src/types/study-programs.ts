export interface StudyProgramListItem {
  id: string;
  name: string;
  slug: string;
  level: string; // "S1", "S2"
  degree: string;
  accreditation: string;
  tagline: string | null;
  duration: string;
  credits: number;
  coverImageUrl: string | null;
  isPublished: boolean;
  updatedAt: string | null;
}

export interface StudyProgramDetail extends StudyProgramListItem {
  description: string | null;
  vision: string | null;
  mission: string | null;
  objectives: string[];
  courses: string[];
  careers: string[];
  tags: string[];
  createdBy: string;
  createdAt: string;
  updatedBy: string | null;
}

export interface CreateStudyProgramRequest {
  name: string;
  slug: string;
  level: string;
  degree: string;
  accreditation: string;
  tagline: string | null;
  description: string | null;
  duration: string;
  credits: number;
  vision: string | null;
  mission: string | null;
  objectives: string[];
  courses: string[];
  careers: string[];
  tags: string[];
  coverImageUrl: string | null;
  isPublished: boolean;
}

export interface UpdateStudyProgramRequest extends CreateStudyProgramRequest {}
