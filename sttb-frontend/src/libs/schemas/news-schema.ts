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

// ─── Internal form schema (used by NewsForm component) ────────────────────────

export const newsFormSchema = z.object({
  title: z.string().min(1, "Judul wajib diisi"),
  slug: z
    .string()
    .min(1, "Slug wajib diisi")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug: huruf kecil, angka, dan tanda hubung saja"),
  excerpt: z.string().min(1, "Ringkasan wajib diisi").max(280, "Maks. 280 karakter"),
  content: z.string().min(1, "Konten wajib diisi"),
  categoryId: z.string().min(1, "Kategori wajib dipilih"),
  author: z.string(),
  status: z.enum(["draft", "published"]),
  featured: z.boolean(),
  coverImageUrl: z.string(),
  tags: z.array(z.string()),
});

export type NewsFormValues = z.infer<typeof newsFormSchema>;
