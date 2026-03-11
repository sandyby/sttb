import { z } from "zod";

const optionalUrl = z
  .string()
  .url("Must be a valid URL")
  .optional()
  .or(z.literal(""))
  .transform((v) => v || undefined);

export const createMediaSchema = z.object({
  title: z.string().min(1, "Title is required").max(300, "Max 300 characters"),
  url: z.string().min(1, "URL is required").url("Must be a valid URL"),
  type: z.enum(["image", "video"], {
    error: "Type must be either 'image' or 'video'",
  }),
  thumbnailUrl: optionalUrl,
  category: z.string().optional(),
  tag: z.string().optional(),
});

export type CreateMediaFormValues = z.infer<typeof createMediaSchema>;
