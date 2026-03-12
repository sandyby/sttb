"use client";

import { ReactNode, useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowLeft,
  GraduationCap,
  X,
  Upload,
  AlertCircle,
  CheckCircle,
  Save,
  Loader2,
  Plus,
  BookOpen,
  Target,
  Briefcase,
  FileText,
  Eye,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";
import {
  studyProgramSchema,
  type StudyProgramFormValues,
} from "@/libs/schemas/study-program-schema";
import { getImageUrl } from "@/libs/api";
import { useUploadImage } from "@/hooks/useUpload";
import { slugify } from "@/libs/utils";

interface ProgramStudiFormProps {
  initialData?: Partial<StudyProgramFormValues & { id?: string }>;
  onSave: (data: StudyProgramFormValues) => Promise<void>;
  backHref?: string;
}

/* ─── List Input (for Objectives, Courses, Careers) ──────── */

function ListInput({
  values,
  onChange,
  placeholder,
  icon: Icon,
}: {
  values: string[];
  onChange: (v: string[]) => void;
  placeholder: string;
  icon: any;
}) {
  const [temp, setTemp] = useState("");
  const add = () => {
    if (temp.trim()) {
      onChange([...values, temp.trim()]);
      setTemp("");
    }
  };
  const remove = (idx: number) => onChange(values.filter((_, i) => i !== idx));

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <input
          value={temp}
          onChange={(e) => setTemp(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), add())}
          placeholder={placeholder}
          className="flex-1 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm focus:outline-none focus:border-[#E62129]"
        />
        <button
          type="button"
          onClick={add}
          className="p-2 bg-[#0A2C74] text-white rounded-lg hover:bg-[#081f52] transition-colors"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>
      <div className="space-y-2 max-h-48 overflow-y-auto no-scrollbar">
        {values.map((v, i) => (
          <div
            key={i}
            className="flex items-center gap-2 p-2.5 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-lg group animate-in fade-in slide-in-from-left-2 duration-200"
          >
            <Icon className="w-4 h-4 text-[#E62129] flex-shrink-0" />
            <span className="flex-1 text-sm text-gray-700 dark:text-gray-300 line-clamp-2">
              {v}
            </span>
            <button
              type="button"
              onClick={() => remove(i)}
              className="p-1 text-gray-400 hover:text-red-500 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
        {values.length === 0 && (
          <p className="text-center py-4 text-xs text-gray-400 italic">
            Belum ada data ditambahkan
          </p>
        )}
      </div>
    </div>
  );
}

/* ─── Field Wrapper ───────────────────────────────────────── */

function Field({
  label,
  required,
  error,
  hint,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div className="">
      <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-1.5">
        {label} {required && <span className="text-[#E62129]">*</span>}
      </label>
      {children}
      {error && (
        <p className="flex items-center gap-1 text-[#E62129] text-xs mt-1">
          <AlertCircle className="w-3 h-3 flex-shrink-0" />
          {error}
        </p>
      )}
      {hint && !error && (
        <p className="text-gray-400 text-xs mt-1">{hint}</p>
      )}
    </div>
  );
}

const inputCls = (error?: string) =>
  `w-full px-3 py-2.5 rounded-xl border text-sm text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-800 focus:outline-none transition-all ${error ? "border-[#E62129]" : "border-gray-200 dark:border-gray-700 focus:border-[#0A2C74]"}`;

/* ─── Main Form ──────────────────────────────────────────── */

export default function ProgramStudiForm({
  initialData,
  onSave,
  backHref = "/admin/study-programs",
}: ProgramStudiFormProps) {
  const router = useRouter();
  const isEdit = !!initialData?.id;
  const [saving, setSaving] = useState(false);
  const isFirstRender = useRef(true);
  const [isLoading, setIsLoading] = useState(false);
  const [tab, setTab] = useState<"info" | "curriculum" | "media">("info");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { mutateAsync: uploadImage, isPending: isUploading } = useUploadImage();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<StudyProgramFormValues>({
    resolver: zodResolver(studyProgramSchema) as any,
    defaultValues: {
      name: initialData?.name ?? "",
      slug: initialData?.slug ?? "",
      level: initialData?.level ?? "S1",
      description: initialData?.description ?? "",
      tagline: initialData?.tagline ?? "",
      duration: initialData?.duration ?? "",
      credits: initialData?.credits ?? 0,
      degree: initialData?.degree ?? "",
      vision: initialData?.vision ?? "",
      mission: initialData?.mission ?? "",
      accreditation: initialData?.accreditation ?? "",
      coverImageUrl: initialData?.coverImageUrl ?? "",
      isPublished: initialData?.isPublished ?? false,
      objectives: initialData?.objectives ?? [],
      courses: initialData?.courses ?? [],
      careers: initialData?.careers ?? [],
      tags: initialData?.tags ?? [],
    },
  });

  const coverImageUrl = watch("coverImageUrl");
  const titleValue = watch("name");

    useEffect(() => {
      if (isFirstRender.current) {
        isFirstRender.current = false;
        return;
      }
      if (!isEdit) {
        setValue("slug", slugify(titleValue), { shouldValidate: true });
      }
    }, [titleValue, setValue, isEdit]);

  const handleFormSubmit = async (values: StudyProgramFormValues) => {
    setSaving(true);
    try {
      await onSave(values);
    } finally {
      setSaving(false);
    }
  };

  const handleValidationErrors = (fieldErrors: any) => {
    toast.error("Lengkapi semua field yang diperlukan");
    if (
      fieldErrors.name ||
      fieldErrors.slug ||
      fieldErrors.level ||
      fieldErrors.description ||
      fieldErrors.degree ||
      fieldErrors.credits ||
      fieldErrors.duration ||
      fieldErrors.accreditation
    ) {
      setTab("info");
    } else if (fieldErrors.objectives || fieldErrors.courses) {
      setTab("curriculum");
    } else if (fieldErrors.coverImageUrl) {
      setTab("media");
    }
  };

  const handleImageUpload = async (file: File) => {
    try {
      if (!file.type.startsWith("image/")) {
        toast.error("File harus berupa gambar");
        return;
      }
      const res = await uploadImage({ file, uploadType: "media" });
      setValue("coverImageUrl", res.url, { shouldValidate: true });
      toast.success("Gambar berhasil diupload");
    } catch (error) {
      toast.error("Gagal mengupload gambar");
    }
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const TABS = [
    { id: "info", label: "Informasi Utama", icon: FileText },
    { id: "curriculum", label: "Kurikulum & Tujuan", icon: BookOpen },
    { id: "media", label: "Media & Status", icon: Upload },
  ] as const;

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit, handleValidationErrors)}
      className="max-w-4xl mx-auto space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => router.push(backHref)}
            className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-gray-900 dark:text-white font-bold text-xl">
              {isEdit ? "Edit Program Studi" : "Tambah Program Studi Baru"}
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              {isEdit
                ? `Mengedit: ${titleValue || "—"}`
                : "Buat program studi akademik baru"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#E62129] hover:bg-[#c4131a] text-white text-sm font-medium shadow-lg shadow-red-500/20 transition-all disabled:opacity-50"
          >
            {saving ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            {isEdit ? "Simpan Perubahan" : "Terbitkan Program"}
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-2xl shadow-inner">
        {TABS.map((t) => {
          const Icon = t.icon;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={`flex-1 flex items-center justify-center gap-2 px-3 py-3 rounded-xl text-sm font-medium transition-all ${
                tab === t.id
                  ? "bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm scale-100"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 scale-95"
              }`}
            >
            <Icon className="w-4 h-4" />
            <span className="hidden sm:inline">{t.label}</span>
            {((t.id === "info" &&
              (errors.name ||
                errors.slug ||
                errors.level ||
                errors.description ||
                errors.degree ||
                errors.credits ||
                errors.duration ||
                errors.accreditation)) ||
              (t.id === "curriculum" && (errors.objectives || errors.courses)) ||
              (t.id === "media" && errors.coverImageUrl)) && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#E62129] rounded-full" />
            )}
            </button>
          );
        })}
      </div>

      {/* Tab: Info */}
      {tab === "info" && (
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 space-y-5 shadow-sm animate-in fade-in duration-300">
          <Field
            label="Nama Program Studi"
            required
            error={errors.name?.message}
          >
            <input
              {...register("name")}
              placeholder="Contoh: Sarjana Teologi"
              className={inputCls(errors.name?.message)}
            />
          </Field>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="URL Slug" required error={errors.slug?.message}>
              <input
                {...register("slug")}
                onChange={(e) => {
                  setValue("slug", slugify(e.target.value), {
                    shouldValidate: true,
                  });
                }}
                placeholder="sarjana-teologi"
                className={inputCls(errors.slug?.message)}
              />
            </Field>
            <Field
              label="Jenjang / Level"
              required
              error={errors.level?.message}
            >
              <select
                {...register("level")}
                className={inputCls(errors.level?.message)}
              >
                <option value="S1">Sarjana (S1)</option>
                <option value="S2">Magister (S2)</option>
              </select>
            </Field>
          </div>
          <Field
            label="Tagline Singkat"
            hint="Akan muncul sebagai teks kecil di atas judul"
          >
            <input
              {...register("tagline")}
              placeholder="Membentuk Pemimpin yang Melayani"
              className={inputCls()}
            />
          </Field>
          <Field
            label="Deskripsi Umum"
            required
            error={errors.description?.message}
          >
            <textarea
              {...register("description")}
              rows={4}
              className={inputCls(errors.description?.message) + " resize-none"}
              placeholder="Jelaskan mengenai program studi ini secara singkat..."
            />
          </Field>
          <div className="grid sm:grid-cols-3 gap-4">
            <Field
              label="Gelar Akademik"
              required
              error={errors.degree?.message}
            >
              <input
                {...register("degree")}
                placeholder="S.Th."
                className={inputCls(errors.degree?.message)}
              />
            </Field>
            <Field label="Total SKS" required error={errors.credits?.message}>
              <input
                type="number"
                {...register("credits", { valueAsNumber: true })}
                className={inputCls(errors.credits?.message)}
              />
            </Field>
            <Field
              label="Estimasi Durasi"
              required
              error={errors.duration?.message}
            >
              <input
                {...register("duration")}
                placeholder="4 Tahun (8 Semester)"
                className={inputCls(errors.duration?.message)}
              />
            </Field>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Visi Program">
              <textarea
                {...register("vision")}
                rows={3}
                className={inputCls() + " resize-none text-xs"}
                placeholder="Visi spesifik prodi..."
              />
            </Field>
            <Field label="Misi Program">
              <textarea
                {...register("mission")}
                rows={3}
                className={inputCls() + " resize-none text-xs"}
                placeholder="Misi spesifik prodi..."
              />
            </Field>
          </div>
        </div>
      )}

      {/* Tab: Curriculum */}
      {tab === "curriculum" && (
        <div className="grid sm:grid-cols-2 gap-6 animate-in fade-in duration-300">
          <div className="bg-white h-fit dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 space-y-5 shadow-sm">
            <Field
              label="Tujuan Program (Objectives)"
              hint="Tekan Enter untuk menambah"
            >
              <Controller
                name="objectives"
                control={control}
                render={({ field }) => (
                  <ListInput
                    values={field.value}
                    onChange={field.onChange}
                    placeholder="Contoh: Menguasai teologi sistematik"
                    icon={Target}
                  />
                )}
              />
            </Field>
          </div>
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 space-y-5 shadow-sm">
              <Field
                label="Mata Kuliah Unggulan"
                hint="Tekan Enter untuk menambah"
              >
                <Controller
                  name="courses"
                  control={control}
                  render={({ field }) => (
                    <ListInput
                      values={field.value}
                      onChange={field.onChange}
                      placeholder="Contoh: Teologi Perjanjian Baru"
                      icon={BookOpen}
                    />
                  )}
                />
              </Field>
            </div>
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 space-y-5 shadow-sm">
              <Field label="Tag / Kategori" hint="Tekan Enter untuk menambah">
                <Controller
                  name="tags"
                  control={control}
                  render={({ field }) => (
                    <ListInput
                      values={field.value}
                      onChange={field.onChange}
                      placeholder="Contoh: Teologi, S1, Akademik"
                      icon={Sparkles}
                    />
                  )}
                />
              </Field>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Media */}
      {tab === "media" && (
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 space-y-6 shadow-sm animate-in fade-in duration-300">
          <Field label="Akreditasi" required error={errors.accreditation?.message}>
            <input
              {...register("accreditation")}
              placeholder="Terakreditasi Baik Sekali (BAN-PT)"
              className={inputCls(errors.accreditation?.message)}
            />
          </Field>

          <Field label="Gambar Sampul / Card Image">
            {coverImageUrl ? (
              <div className="relative rounded-2xl overflow-hidden group">
                <Image
                  src={getImageUrl(coverImageUrl) ?? coverImageUrl}
                  alt=""
                  height={300}
                  width={600}
                  className="w-full h-56 object-cover"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button
                    type="button"
                    onClick={() => setValue("coverImageUrl", "")}
                    className="p-3 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-lg"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>
            ) : (
              <div
                onClick={() => !isUploading && fileInputRef.current?.click()}
                className={`rounded-2xl border-2 border-dashed p-12 text-center cursor-pointer transition-all ${
                  isUploading
                    ? "border-blue-300 bg-blue-50/50"
                    : "border-gray-200 dark:border-gray-700 hover:border-[#E62129] hover:bg-gray-50/50"
                }`}
              >
                {isUploading ? (
                  <>
                    <Loader2 className="w-10 h-10 text-blue-500 mx-auto mb-3 animate-spin" />
                    <p className="text-gray-600 font-medium">
                      Mengupload Gambar...
                    </p>
                  </>
                ) : (
                  <>
                    <div className="w-16 h-16 rounded-full bg-red-50 dark:bg-red-900/10 flex items-center justify-center mx-auto mb-4 text-[#E62129]">
                      <Upload className="w-8 h-8" />
                    </div>
                    <p className="text-gray-900 dark:text-white font-bold">
                      Upload Gambar Cover
                    </p>
                    <p className="text-gray-500 text-sm mt-1">
                      Hanya mendukung .jpg/.png
                    </p>
                    <p className="text-gray-500 text-sm mt-1">
                      Rekomendasi ukuran 1200 x 600 px
                    </p>
                  </>
                )}
              </div>
            )}
            <input
              type="file"
              ref={fileInputRef}
              accept=".jpg, .png*"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) handleImageUpload(f);
              }}
            />
          </Field>

          <div className="pt-6 border-t border-gray-100 dark:border-gray-800">
            <Controller
              name="isPublished"
              control={control}
              render={({ field }) => (
                <div className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-lg ${field.value ? "bg-green-100 text-green-600" : "bg-yellow-100 text-yellow-600"}`}
                    >
                      {field.value ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900 dark:text-white">
                        Publikasikan Ke Website
                      </p>
                      <p className="text-xs text-gray-500">
                        Program akan terlihat oleh publik jika opsi ini aktif
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => field.onChange(!field.value)}
                    className={`relative w-12 h-6 rounded-full transition-colors ${field.value ? "bg-green-500" : "bg-gray-300"}`}
                  >
                    <div
                      className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${field.value ? "translate-x-7" : "translate-x-1"}`}
                    />
                  </button>
                </div>
              )}
            />
          </div>
        </div>
      )}
    </form>
  );
}
