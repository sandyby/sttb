import { z } from "zod";

const optionalUrl = z
  .string()
  .url("Must be a valid URL")
  .optional()
  .or(z.literal(""))
  .transform((v) => v || undefined);

export const createNewsSchema = z.object({
  title: z.string().min(1, "Title is required").max(300, "Max 300 characters"),
  slug: z
    .string()
    .min(1, "Slug is required")
    .max(300)
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Slug must be lowercase letters, numbers, and hyphens only (no leading/trailing hyphens)"
    ),
  content: z.string().min(1, "Content is required"),
  excerpt: z.string().max(500, "Max 500 characters").optional(),
  thumbnailUrl: optionalUrl,
  category: z.string().optional(),
  isFeatured: z.boolean().default(false),
  isPublished: z.boolean().default(false),
});

export type CreateNewsFormValues = z.infer<typeof createNewsSchema>;

export const updateNewsSchema = createNewsSchema;
export type UpdateNewsFormValues = CreateNewsFormValues;
