export function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .slice(0, 80);
}

export const getImageUrl = (path?: string) =>
  path
    ? `${process.env.NEXT_PUBLIC_API_BASE_URL}${path}`
    : "https://placehold.co/100/png";
