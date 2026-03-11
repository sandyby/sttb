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
  date: z.string().min(1, "Tanggal mulai wajib diisi"),
  endDate: z.string(),
  time: z.string(),
  endTime: z.string(),
  location: z.string().min(1, "Lokasi wajib diisi"),
  locationDetail: z.string(),
  description: z.string().min(1, "Deskripsi wajib diisi"),
  coverImageUrl: z.string(),
  registrationUrl: z.string(),
  registrationOpen: z.boolean(),
  registrationDeadline: z.string(),
  maxParticipants: z.string(),
  status: z.enum(["draft", "published"]),
  isOnline: z.boolean(),
  streamingUrl: z.string(),
  organizer: z.string(),
  contactEmail: z.string(),
  tags: z.array(z.string()),
});

export type EventFormValues = z.infer<typeof eventFormSchema>;
