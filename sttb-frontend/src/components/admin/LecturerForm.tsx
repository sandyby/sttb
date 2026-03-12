"use client";

import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowLeft, Save, Plus, X, Upload, Loader2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { getImageUrl } from "@/libs/api";
import { useUploadImage } from "@/hooks/useUpload";

// ─── Schema ──────────────────────────────────────────────────────────────────

const lecturerFormSchema = z.object({
  name: z.string().min(1, "Nama wajib diisi"),
  title: z.string().min(1, "Jabatan wajib diisi"),
  rank: z.enum(["pimpinan", "tetap", "tidak-tetap"]),
  degree: z.string().min(1, "Gelar/Pendidikan wajib diisi"),
  specialization: z.string().min(1, "Bidang keahlian wajib diisi"),
  imageUrl: z.string().optional(),
  email: z.string().email("Format email tidak valid").optional().or(z.literal("")),
  bio: z.string().min(1, "Bio wajib diisi"),
  almaMater: z.string().min(1, "Alma mater wajib diisi"),
  origin: z.string().min(1, "Asal institusi wajib diisi"),
  displayOrder: z.number().int().min(0),
  isActive: z.boolean(),
});

export type LecturerFormValues = z.infer<typeof lecturerFormSchema>;

export interface LecturerFormData extends LecturerFormValues {
  courses: string[];
}

interface LecturerFormProps {
  initialData?: LecturerFormData;
  onSaveAction: (data: LecturerFormData) => Promise<void>;
  backHref: string;
  isEditing?: boolean;
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

// ─── Courses tag input ────────────────────────────────────────────────────────

function CoursesInput({
  courses,
  onChange,
}: {
  courses: string[];
  onChange: (v: string[]) => void;
}) {
  const [input, setInput] = useState("");

  const add = () => {
    const val = input.trim();
    if (val && !courses.includes(val)) {
      onChange([...courses, val]);
    }
    setInput("");
  };

  const remove = (idx: number) => onChange(courses.filter((_, i) => i !== idx));

  return (
    <div>
      <div className="flex gap-2 mb-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              add();
            }
          }}
          placeholder="Tambah mata kuliah, tekan Enter"
          className={inputCls}
        />
        <button
          type="button"
          onClick={add}
          className="px-3 py-2 rounded-lg bg-[#E62129] text-white text-sm hover:bg-[#c4131a] transition-colors flex-shrink-0"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
      {courses.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {courses.map((c, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs"
            >
              {c}
              <button type="button" onClick={() => remove(i)}>
                <X className="w-3 h-3 hover:text-[#E62129]" />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Main Form ────────────────────────────────────────────────────────────────

export function LecturerForm({ initialData, onSaveAction: onSave, backHref, isEditing }: LecturerFormProps) {
  const [courses, setCourses] = useState<string[]>(initialData?.courses ?? []);
  const [isSaving, setIsSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { mutateAsync: uploadImage, isPending: isUploading } = useUploadImage();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<LecturerFormValues>({
    resolver: zodResolver(lecturerFormSchema),
    defaultValues: {
      name: initialData?.name ?? "",
      title: initialData?.title ?? "",
      rank: initialData?.rank ?? "tetap",
      degree: initialData?.degree ?? "",
      specialization: initialData?.specialization ?? "",
      imageUrl: initialData?.imageUrl ?? "",
      email: initialData?.email ?? "",
      bio: initialData?.bio ?? "",
      almaMater: initialData?.almaMater ?? "",
      origin: initialData?.origin ?? "",
      displayOrder: initialData?.displayOrder ?? 0,
      isActive: initialData?.isActive ?? true,
    },
  });

  const imageUrl = watch("imageUrl");

  const handleImageUpload = async (file: File) => {
    const res = await uploadImage({ file, uploadType: "lecturers" });
    setValue("imageUrl", res.url);
  };

  const onSubmit = async (values: LecturerFormValues) => {
    setIsSaving(true);
    try {
      await onSave({
        ...values,
        email: values.email || undefined,
        imageUrl: values.imageUrl || undefined,
        courses,
      });
    } finally {
      setIsSaving(false);
    }
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
              {isEditing ? "Edit Dosen" : "Tambah Dosen Baru"}
            </h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">Dewan Dosen STTB</p>
          </div>
        </div>
        <button
          type="submit"
          disabled={isSaving}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#E62129] text-white text-sm font-medium hover:bg-[#c4131a] disabled:opacity-50 transition-colors"
        >
          <Save className="w-4 h-4" />
          {isSaving ? "Menyimpan..." : isEditing ? "Perbarui" : "Simpan"}
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left: Main fields */}
        <div className="lg:col-span-2 space-y-5">
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-5 space-y-4">
            <h2 className="text-sm font-semibold text-gray-900 dark:text-white">Identitas</h2>

            <Field label="Nama Lengkap" required error={errors.name?.message}>
              <input {...register("name")} className={inputCls} placeholder="Prof. Dr. ..." />
            </Field>

            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Jabatan" required error={errors.title?.message}>
                <input
                  {...register("title")}
                  className={inputCls}
                  placeholder="Ketua STTB / Dosen Tetap"
                />
              </Field>

              <Field label="Rank" required error={errors.rank?.message}>
                <select {...register("rank")} className={inputCls}>
                  <option value="pimpinan">Pimpinan Akademik</option>
                  <option value="tetap">Dosen Tetap</option>
                  <option value="tidak-tetap">Dosen Tidak Tetap</option>
                </select>
              </Field>
            </div>

            <Field label="Gelar / Pendidikan" required error={errors.degree?.message}>
              <input
                {...register("degree")}
                className={inputCls}
                placeholder="Ph.D. in Systematic Theology, Calvin Theological Seminary"
              />
            </Field>

            <Field label="Bidang Keahlian" required error={errors.specialization?.message}>
              <input
                {...register("specialization")}
                className={inputCls}
                placeholder="Teologi Sistematik, Filsafat Agama"
              />
            </Field>

            <Field label="Email" error={errors.email?.message}>
              <input
                {...register("email")}
                type="email"
                className={inputCls}
                placeholder="dosen@sttb.ac.id"
              />
            </Field>
          </div>

          {/* Academic info */}
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-5 space-y-4">
            <h2 className="text-sm font-semibold text-gray-900 dark:text-white">Akademik</h2>

            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Alma Mater" required error={errors.almaMater?.message}>
                <input
                  {...register("almaMater")}
                  className={inputCls}
                  placeholder="Calvin Theological Seminary, USA"
                />
              </Field>

              <Field label="Asal Kota/Negara" required error={errors.origin?.message}>
                <input
                  {...register("origin")}
                  className={inputCls}
                  placeholder="Grand Rapids, Michigan — USA"
                />
              </Field>
            </div>

            <Field label="Bio / Profil" required error={errors.bio?.message}>
              <textarea
                {...register("bio")}
                rows={4}
                className={inputCls}
                placeholder="Deskripsi singkat tentang dosen..."
              />
            </Field>

            <Field label="Mata Kuliah yang Diajarkan">
              <CoursesInput courses={courses} onChange={setCourses} />
            </Field>
          </div>
        </div>

        {/* Right: Settings + Photo */}
        <div className="space-y-5">
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-5 space-y-4">
            <h2 className="text-sm font-semibold text-gray-900 dark:text-white">Foto</h2>

            {/* Upload zone / preview */}
            {imageUrl ? (
              <div className="relative w-full aspect-[3/4] rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 group">
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

            {/* Change photo button when image exists */}
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
                <input type="checkbox" {...register("isActive")} className="sr-only peer" />
                <div className="w-10 h-5 bg-gray-200 dark:bg-gray-600 peer-checked:bg-[#E62129] rounded-full peer peer-focus:ring-2 peer-focus:ring-[#E62129]/30 transition-colors after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:w-4 after:h-4 after:transition-all peer-checked:after:translate-x-5" />
              </label>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
