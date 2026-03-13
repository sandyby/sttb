import { useMutation } from "@tanstack/react-query";
import apiClient from "@/libs/api-client";
import type { UploadResponse } from "@/types/media";

interface UploadArgs {
  file: File;
  /** Hint for the backend storage path. e.g. "events", "news", "media" */
  uploadType: string;
}

/**
 * Upload an image file to the backend — admin only
 * Max file size: 10 MB (enforced server-side)
 *
 * Workflow:
 *   1. Call upload → get { url }
 *   2. Set url into your form field (e.g. form.setValue("imageUrl", url))
 *   3. Submit the main form
 */
export function useUploadImage() {
  return useMutation({
    mutationFn: async ({ file, uploadType }: UploadArgs) => {
      const formData = new FormData();
      formData.append("file", file);

      const res = await apiClient.post<UploadResponse>(
        `/api/upload/image?uploadType=${encodeURIComponent(uploadType)}`,
        formData,
        // Let axios set the correct multipart boundary automatically
        { headers: { "Content-Type": "multipart/form-data" } },
      );
      return res.data;
    },
  });
}

/**
 * Upload a video file to the backend — admin only
 * Max file size: 500 MB (enforced server-side)
 */
export function useUploadVideo() {
  return useMutation({
    mutationFn: async ({ file, uploadType }: UploadArgs) => {
      const formData = new FormData();
      formData.append("file", file);

      const res = await apiClient.post<UploadResponse>(
        `/api/upload/video?uploadType=${encodeURIComponent(uploadType)}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } },
      );
      return res.data;
    },
  });
}
