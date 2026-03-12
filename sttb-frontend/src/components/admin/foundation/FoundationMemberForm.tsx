"use client";

import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ArrowLeft, Save, Plus, X, Upload, Loader2, Users } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { getImageUrl } from "@/lib/api";
import { useUploadImage } from "@/hooks/useUpload";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import type { FoundationMember, CreateFoundationMemberPayload } from "@/types/foundation";

// ─── Schema ──────────────────────────────────────────────────────────────────

const foundationMemberSchema = z.object({
  name: z.string().min(1, "Nama wajib diisi").max(300),
  position: z.string().min(1, "Jabatan wajib diisi").max(200),
  category: z.enum(["pembina", "pengurus", "anggota"]),
  description: z.string().max(1000).optional().or(z.literal("")),
  imageUrl: z.string().max(1000).optional().or(z.literal("")),
  displayOrder: z.number().int().min(0),
  isActive: z.boolean(),
});

type FoundationMemberFormValues = z.infer<typeof foundationMemberSchema>;

interface FoundationMemberFormProps {
  initialData?: FoundationMember | null;
  onSubmitAction: (data: CreateFoundationMemberPayload) => void;
  isPending: boolean;
  backHref: string;
}

// ─── Reusable field wrapper ───────────────────────────────────────────────────

function Field({
  label,
  required,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
        {label}
        {required && <span className="text-[#E62129] ml-1">*</span>}
      </label>
      {children}
      {error && <p className="mt-1 text-xs text-[#E62129]">{error}</p>}
    </div>
  );
}

const inputCls =
  "w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#E62129]/40 focus:border-[#E62129]";

// ─── Main Form ────────────────────────────────────────────────────────────────

export function FoundationMemberForm({
  initialData,
  onSubmitAction,
  isPending,
  backHref,
}: FoundationMemberFormProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { mutateAsync: uploadImage, isPending: isUploading } = useUploadImage();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FoundationMemberFormValues>({
    resolver: zodResolver(foundationMemberSchema),
    defaultValues: {
      name: initialData?.name ?? "",
      position: initialData?.position ?? "",
      category: (initialData?.category as "pembina" | "pengurus" | "anggota") ?? "pengurus",
      description: initialData?.description ?? "",
      imageUrl: initialData?.imageUrl ?? "",
      displayOrder: initialData?.displayOrder ?? 0,
      isActive: initialData?.isActive ?? true,
    },
  });

  const isActive = watch("isActive");
  const imageUrl = watch("imageUrl");

  const handleImageUpload = async (file: File) => {
    const res = await uploadImage({ file, uploadType: "foundation" });
    setValue("imageUrl", res.url);
  };

  const onSubmit = (values: FoundationMemberFormValues) => {
    onSubmitAction(values as CreateFoundationMemberPayload);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href={backHref}
            className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-gray-600 dark:text-gray-300" />
          </Link>
          <div>
            <h1 className="text-lg font-bold text-gray-900 dark:text-white">
              {initialData ? "Edit Anggota" : "Tambah Anggota Baru"}
            </h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">Pengurus Yayasan STTB</p>
          </div>
        </div>
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#E62129] text-white text-sm font-medium hover:bg-[#c4131a] disabled:opacity-50 transition-colors"
        >
          {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {isPending ? "Menyimpan..." : initialData ? "Perbarui" : "Simpan"}
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left: Main fields */}
        <div className="lg:col-span-2 space-y-5">
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-5 space-y-4">
            <h2 className="text-sm font-semibold text-gray-900 dark:text-white">Identitas Anggota</h2>

            <Field label="Nama Lengkap" required error={errors.name?.message}>
              <input
                {...register("name")}
                className={inputCls}
                placeholder="Pdt. Agus Gunawan, Ph.D."
              />
            </Field>

            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Jabatan" required error={errors.position?.message}>
                <input
                  {...register("position")}
                  className={inputCls}
                  placeholder="Ketua Dewan Pembina"
                />
              </Field>

              <Field label="Kategori" required error={errors.category?.message}>
                <select {...register("category")} className={inputCls}>
                  <option value="pembina">Dewan Pembina</option>
                  <option value="pengurus">Dewan Pengurus</option>
                  <option value="anggota">Anggota Dewan</option>
                </select>
              </Field>
            </div>

            <Field label="Deskripsi Singkat (Khusus Pembina)" error={errors.description?.message}>
              <Textarea
                {...register("description")}
                rows={4}
                className={inputCls}
                placeholder="Keterangan singkat mengenai pengalaman atau peran..."
              />
            </Field>

            <Field label="URL Gambar (Opsional)" error={errors.imageUrl?.message}>
              <div className="flex gap-2">
                <input
                  {...register("imageUrl")}
                  className={inputCls}
                  placeholder="/uploads/foundation/member.jpg"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                  className="px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:border-[#E62129] hover:text-[#E62129] transition-colors disabled:opacity-50 flex-shrink-0"
                >
                  {isUploading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Upload className="w-4 h-4" />
                  )}
                </button>
              </div>
            </Field>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleImageUpload(file);
                e.target.value = "";
              }}
            />
          </div>
        </div>

        {/* Right: Settings */}
        <div className="space-y-5">
          {/* Photo Preview Section - Matching LecturerForm style */}
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-5 space-y-4">
            <h2 className="text-sm font-semibold text-gray-900 dark:text-white">Foto Anggota</h2>

            {imageUrl ? (
              <div className="relative w-full aspect-[3/4] rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700 group">
                <Image
                  src={getImageUrl(imageUrl) ?? imageUrl}
                  alt="Preview"
                  fill
                  className="object-cover object-top"
                />
                <button
                  type="button"
                  onClick={() => setValue("imageUrl", "")}
                  className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/60 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="w-full aspect-[3/4] rounded-lg bg-gray-50 dark:bg-gray-800 flex flex-col items-center justify-center border-2 border-dashed border-gray-200 dark:border-gray-700 hover:border-[#E62129] hover:bg-gray-100 dark:hover:bg-gray-750 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isUploading ? (
                  <>
                    <Loader2 className="w-8 h-8 mb-2 text-[#E62129] animate-spin" />
                    <p className="text-xs text-gray-500">Mengupload...</p>
                  </>
                ) : (
                  <>
                    <Upload className="w-8 h-8 mb-2 text-gray-400" />
                    <p className="text-xs text-gray-500 font-medium">Klik untuk upload foto</p>
                    <p className="text-xs text-gray-400 mt-1">JPG, PNG, WebP</p>
                  </>
                )}
              </button>
            )}

            {imageUrl && (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-sm text-gray-600 dark:text-gray-400 hover:border-[#E62129] hover:text-[#E62129] transition-colors disabled:opacity-50"
              >
                {isUploading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Upload className="w-4 h-4" />
                )}
                Ganti Foto
              </button>
            )}
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-5 space-y-4">
            <h2 className="text-sm font-semibold text-gray-900 dark:text-white">Pengaturan</h2>

            <Field label="Urutan Tampil" error={errors.displayOrder?.message}>
              <input
                {...register("displayOrder", { valueAsNumber: true })}
                type="number"
                min={0}
                className={inputCls}
                placeholder="0"
              />
              <p className="mt-1 text-xs text-gray-400">Angka kecil = tampil lebih awal</p>
            </Field>

            <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
              <div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Status Aktif</p>
                <p className="text-xs text-gray-400">Tampil di halaman publik</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={isActive}
                  onChange={(e) => setValue("isActive", e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-10 h-5 bg-gray-200 dark:bg-gray-600 peer-checked:bg-[#E62129] rounded-full peer peer-focus:ring-2 peer-focus:ring-[#E62129]/30 transition-colors after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:w-4 after:h-4 after:transition-all peer-checked:after:translate-x-5" />
              </label>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
