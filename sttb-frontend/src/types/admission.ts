export interface AdmissionWaveStep {
  stepNumber: number;
  title: string;
  whenText: string | null; // ISO Date string
  via: string;
}

export interface AdmissionWave {
  id: string;
  waveNumber: string;
  label: string;
  deadline: string; // ISO Date string
  status: "open" | "closed" | "upcoming";
  color: string;
  psikotesSchedule: string | null; // ISO Date string
  tertulisSchedule: string | null; // ISO Date string
  wawancaraSchedule: string | null; // ISO Date string
  steps: AdmissionWaveStep[];
  displayOrder: number;
  isActive: boolean;
}

export interface GetAdmissionWaveListResponse {
  items: AdmissionWave[];
  totalCount: number;
}

export interface CreateAdmissionWavePayload {
  waveNumber: string;
  label: string;
  deadline: string;
  status: string;
  color: string;
  psikotesSchedule: string | null;
  tertulisSchedule: string | null;
  wawancaraSchedule: string | null;
  steps: AdmissionWaveStep[];
  displayOrder: number;
  isActive: boolean;
}

export interface UpdateAdmissionWavePayload extends CreateAdmissionWavePayload {
  id: string;
}
