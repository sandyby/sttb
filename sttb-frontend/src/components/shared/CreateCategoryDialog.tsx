"use client";

import { useEffect } from "react";
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

/* ─── Schema ─────────────────────────────────────────────── */

const categorySchema = z.object({
  name: z.string().min(2, "Nama kategori minimal 2 karakter"),
  slug: z.string().min(2, "Slug minimal 2 karakter").regex(/^[a-z0-9-]+$/, "Slug hanya boleh berisi huruf kecil, angka, dan tanda hubung"),
});

type CategoryFormValues = z.infer<typeof categorySchema>;

/* ─── Props ──────────────────────────────────────────────── */

interface CreateCategoryDialogProps {
  isOpen: boolean;
  onCloseAction: () => void;
  onSuccessAction: (category: { id: string; name: string }) => void;
  title: string;
  mutationHookAction: () => any; // Use the useMutation hook returned type
}

/* ─── Utilities ──────────────────────────────────────────── */

const slugify = (text: string) => {
  return text
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-") // Remove consecutive hyphens
    .replace(/^-+|-+$/g, ""); // Remove leading/trailing hyphens
};

/* ─── Component ──────────────────────────────────────────── */

export function CreateCategoryDialog({
  isOpen,
  onCloseAction,
  onSuccessAction,
  title,
  mutationHookAction,
}: CreateCategoryDialogProps) {
  const mutation = mutationHookAction();
  
  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
      slug: "",
    },
  });

  const { watch, setValue, reset } = form;
  const nameValue = watch("name");

  // Auto-generate slug when name changes
  useEffect(() => {
    if (nameValue) {
      setValue("slug", slugify(nameValue), { shouldValidate: true });
    }
  }, [nameValue, setValue]);

  // Reset form when dialog closes
  useEffect(() => {
    if (!isOpen) {
      reset();
    }
  }, [isOpen, reset]);

  const onSubmit = (data: CategoryFormValues) => {
    mutation.mutate(data, {
      onSuccess: (id: string) => {
        toast.success("Kategori berhasil dibuat");
        onSuccessAction({ id, name: data.name });
        onCloseAction();
      },
      onError: (error: any) => {
        toast.error("Gagal membuat kategori: " + (error.response?.data?.message || error.message));
      },
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onCloseAction()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            Tambahkan kategori baru yang belum ada di daftar.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama Kategori</FormLabel>
                  <FormControl>
                    <Input placeholder="Contoh: Berita Kampus" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Slug</FormLabel>
                  <FormControl>
                    <Input placeholder="contoh-berita-kampus" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={onCloseAction} 
                disabled={mutation.isPending}
              >
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
        </Form>
      </DialogContent>
    </Dialog>
  );
}
