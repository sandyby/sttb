import { z } from "zod";

export const studyProgramSchema = z.object({
  name: z.string().min(3, "Nama minimal 3 karakter"),
  slug: z.string().min(2, "Slug minimal 2 karakter"),
  level: z.enum(["S1", "S2"]),
  description: z.string().min(10, "Deskripsi minimal 10 karakter"),
  tagline: z.string().nullable().optional(),
  duration: z.string().min(1, "Durasi wajib diisi"),
  credits: z.coerce.number().min(1, "SKS harus lebih dari 0"),
  degree: z.string().min(1, "Gelar wajib diisi"),
  vision: z.string().nullable().optional(),
  mission: z.string().nullable().optional(),
  accreditation: z.string().nullable().optional(),
  coverImageUrl: z.string().nullable().optional(),
  isPublished: z.boolean().default(false),
  objectives: z.array(z.string()).default([]),
  courses: z.array(z.string()).default([]),
  careers: z.array(z.string()).default([]),
  tags: z.array(z.string()).default([]),
});

export type StudyProgramFormValues = z.infer<typeof studyProgramSchema>;
