import { z } from "zod";

const optionalUrl = z
  .string()
  .url("Must be a valid URL")
  .optional()
  .or(z.literal(""))
  .transform((v) => v || undefined);

export const createEventSchema = z
  .object({
    title: z.string().min(1, "Title is required").max(200, "Max 200 characters"),
    description: z.string().min(1, "Description is required"),
    startDate: z.string().min(1, "Start date is required"),
    endDate: z.string().optional(),
    location: z.string().optional(),
    imageUrl: optionalUrl,
    category: z.string().optional(),
    registrationUrl: optionalUrl,
    isPublished: z.boolean().default(false),
  })
  .refine(
    (data) => {
      if (!data.endDate) return true;
      return new Date(data.endDate) > new Date(data.startDate);
    },
    { message: "End date must be after start date", path: ["endDate"] }
  );

export type CreateEventFormValues = z.infer<typeof createEventSchema>;

// Update form uses the same fields — id goes in the URL
export const updateEventSchema = createEventSchema;
export type UpdateEventFormValues = CreateEventFormValues;

// ─── Internal form schema (used by EventForm component) ───────────────────────

export const eventFormSchema = z.object({
  title: z.string().min(1, "Judul wajib diisi"),
  category: z.string().min(1, "Kategori wajib dipilih"),
  startDate: z.string().min(1, "Tanggal mulai wajib diisi"),
  endDate: z.string().optional(),
  startTime: z.string(),
  endTime: z.string(),
  onGoing: z.boolean().default(false),
  location: z.string().min(1, "Lokasi wajib diisi"),
  locationDetail: z.string().optional(),
  description: z.string().min(1, "Deskripsi wajib diisi"),
  coverImageUrl: z.string().optional(),
  registrationUrl: z.string().optional(),
  registrationOpen: z.boolean().default(false),
  registrationDeadline: z.string().optional(),
  maxParticipants: z.string().optional(),
  status: z.enum(["draft", "published"]),
  mode: z.enum(["offline", "online", "hybrid"]).default("offline"),
  isOnline: z.boolean().default(false),
  streamingUrl: z.string().optional(),
  organizer: z.string().optional(),
  contactEmail: z.string().optional(),
  tags: z.array(z.string()).default([]),
})
.refine(
  (data) => {
    if (data.onGoing || !data.endDate || !data.startDate) return true;
    const start = new Date(data.startDate);
    const end = new Date(data.endDate);
    return end >= start;
  },
  { message: "Tanggal selesai tidak boleh lebih awal dari tanggal mulai", path: ["endDate"] }
);

export type EventFormValues = z.infer<typeof eventFormSchema>;
