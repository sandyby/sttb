import { z } from "zod";

const optionalUrl = z
  .string()
  .url("Must be a valid URL")
  .optional()
  .or(z.literal(""))
  .transform((v) => v || undefined);

export const createMediaSchema = z.object({
  title: z.string().min(1, "Title is required").max(300, "Max 300 characters"),
  url: z.url("Must be a valid URL").optional().or(z.literal("")),
  type: z.enum(["image", "video", "article"]),
  thumbnailUrl: z.url("Must be a valid URL").optional().or(z.literal("")),
  categoryId: z.string().optional().nullable(),
  tag: z.string().optional(),
});

export type CreateMediaFormValues = z.infer<typeof createMediaSchema>;
