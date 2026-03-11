"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

/* ─── Schema ─────────────────────────────────────────────── */

const categorySchema = z.object({
  name: z.string().min(2, "Nama kategori minimal 2 karakter"),
  slug: z.string().min(2, "Slug minimal 2 karakter"),
});

type CategoryFormValues = z.infer<typeof categorySchema>;

/* ─── Props ──────────────────────────────────────────────── */

interface CreateCategoryDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (category: { id: string; name: string }) => void;
  title: string;
  mutationHook: () => any; // Use the useMutation hook returned type
}

/* ─── Component ──────────────────────────────────────────── */

export function CreateCategoryDialog({
  isOpen,
  onClose,
  onSuccess,
  title,
  mutationHook,
}: CreateCategoryDialogProps) {
  const mutation = mutationHook();
  
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
      slug: "",
    },
  });

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setValue("name", name);
    // Auto-generate slug: lowercase, replace spaces with hyphens, remove non-alphanumeric
    const slug = name
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
    setValue("slug", slug);
  };

  const onSubmit = (data: CategoryFormValues) => {
    mutation.mutate(data, {
      onSuccess: (id: string) => {
        toast.success("Kategori berhasil dibuat");
        onSuccess({ id, name: data.name });
        reset();
        onClose();
      },
      onError: (error: any) => {
        toast.error("Gagal membuat kategori: " + (error.response?.data?.message || error.message));
      },
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            Tambahkan kategori baru yang belum ada di daftar.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nama Kategori</Label>
            <Input
              id="name"
              {...register("name")}
              onChange={handleNameChange}
              placeholder="Contoh: Berita Kampus"
            />
            {errors.name && (
              <p className="text-xs text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="slug">Slug</Label>
            <Input
              id="slug"
              {...register("slug")}
              placeholder="contoh-berita-kampus"
            />
            {errors.slug && (
              <p className="text-xs text-red-500">{errors.slug.message}</p>
            )}
          </div>

          <DialogFooter className="pt-4">
            <Button type="button" variant="outline" onClick={onClose} disabled={mutation.isPending}>
              Batal
            </Button>
            <Button type="submit" disabled={mutation.isPending}>
              {mutation.isPending && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Simpan Kategori
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
