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
