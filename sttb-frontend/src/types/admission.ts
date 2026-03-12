export interface AdmissionWaveStep {
  stepNumber: number;
  title: string;
  whenText: string;
  via: string;
}

export interface AdmissionWave {
  id: string;
  waveNumber: string;
  label: string;
  deadline: string;
  status: "open" | "closed" | "upcoming";
  color: string;
  psikotesSchedule: string;
  tertulisSchedule: string;
  wawancaraSchedule: string;
  steps: AdmissionWaveStep[];
  displayOrder: number;
  isActive: boolean;
}

export interface GetAdmissionWaveListResponse {
  items: AdmissionWave[];
}

export interface CreateAdmissionWavePayload {
  waveNumber: string;
  label: string;
  deadline: string;
  status: string;
  color: string;
  psikotesSchedule: string;
  tertulisSchedule: string;
  wawancaraSchedule: string;
  steps: AdmissionWaveStep[];
  displayOrder: number;
  isActive: boolean;
}

export interface UpdateAdmissionWavePayload extends CreateAdmissionWavePayload {
  id: string;
}
