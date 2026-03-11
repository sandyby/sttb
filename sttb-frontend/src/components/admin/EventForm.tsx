import { ReactNode, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowLeft, Calendar, MapPin, Users, X, Upload,
  AlertCircle, CheckCircle, Link2, Tag, Save, Loader2
} from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";
import { createEventSchema, type CreateEventFormValues } from "../../libs/schemas/event-schema";
import { useUploadImage } from "../../hooks/useUpload";

/* ─── Types ──────────────────────────────────────────────── */

interface EventFormProps {
  initialData?: Partial<CreateEventFormValues & { id?: string }>;
  onSave: (data: CreateEventFormValues) => Promise<void>;
  backHref?: string;
  isSaving?: boolean;
}

/* ─── Constants ──────────────────────────────────────────── */

export const EVENT_CATEGORIES = ["Admisi", "Seminar", "Akademik", "Misi", "Konferensi", "Pembinaan", "Ibadah", "Alumni", "LEAD", "Lainnya"];

/* ─── Main Form ──────────────────────────────────────────── */

export function EventForm({ initialData, onSave, backHref = "/admin/events", isSaving = false }: EventFormProps) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const isEdit = !!initialData?.id;
  const [tab, setTab] = useState<"basic" | "registration" | "details">("basic");

  const { mutateAsync: uploadImage, isPending: isUploadingImage } = useUploadImage();

  // The DB schema expects startDate and endDate as ISO strings.
  // Assuming the UI inputs 'YYYY-MM-DDTHH:mm' (datetime-local format), we can use that directly, 
  // or build it from separated date and time inputs. Let's use datetime-local for simpler binding.
  const formatForInput = (isoString?: string) => {
      if (!isoString) return "";
      const d = new Date(isoString);
      if (isNaN(d.getTime())) return "";
      d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
      return d.toISOString().slice(0, 16);
  };

  const form = useForm<CreateEventFormValues>({
    resolver: zodResolver(createEventSchema),
    defaultValues: {
      title: initialData?.title ?? "",
      description: initialData?.description ?? "",
      startDate: formatForInput(initialData?.startDate),
      endDate: formatForInput(initialData?.endDate),
      location: initialData?.location ?? "",
      imageUrl: initialData?.imageUrl ?? "",
      category: initialData?.category ?? "Seminar",
      registrationUrl: initialData?.registrationUrl ?? "",
      isPublished: initialData?.isPublished ?? false,
    },
  });

  const errors = form.formState.errors;

  const handleImageUpload = async (file: File) => {
    try {
      const res = await uploadImage({ file, uploadType: "event" });
      form.setValue("imageUrl", res.url, { shouldValidate: true });
      toast.success("Gambar berhasil diupload!");
    } catch (error) {
       toast.error(error instanceof Error ? error.message : "Gagal mengupload gambar");
    }
  };

  const onSubmit = async (data: CreateEventFormValues, setPublished: boolean) => {
    try {
        await onSave({
            ...data,
            // Convert datetime-local strings back to proper ISO before saving
            startDate: new Date(data.startDate).toISOString(),
            endDate: data.endDate ? new Date(data.endDate).toISOString() : undefined,
            isPublished: setPublished,
        });
    } catch (e) {
        toast.error("Terjadi kesalahan saat menyimpan");
    }
  };

  const TABS = [
    { id: "basic" as const, label: "Informasi Dasar", icon: Calendar },
    { id: "registration" as const, label: "Pendaftaran", icon: Users },
    { id: "details" as const, label: "Detail & Media", icon: Tag },
  ];

  const imageUrl = form.watch("imageUrl");
  const isPublished = form.watch("isPublished");
  const watchStartDate = form.watch("startDate");
  const watchLocation = form.watch("location");
  const watchCategory = form.watch("category");

  // Helper renderer
  const Field = ({ label, required, error, hint, children }: { label: string; required?: boolean; error?: string; hint?: string; children: ReactNode }) => (
    <div>
      <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-1.5">
        {label} {required && <span className="text-[#E62129]">*</span>}
      </label>
      {children}
      {error && <p className="flex items-center gap-1 text-[#E62129] text-xs mt-1.5"><AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />{error}</p>}
      {hint && !error && <p className="text-gray-400 text-xs mt-1">{hint}</p>}
    </div>
  );

  const inputCls = (error?: string) =>
    `w-full px-4 py-3 rounded-xl border text-sm text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-800 focus:outline-none transition-all ${error ? "border-[#E62129] focus:ring-1 focus:ring-[#E62129]" : "border-gray-200 dark:border-gray-700 focus:border-[#0A2C74] focus:ring-1 focus:ring-[#0A2C74]"}`;


  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <button onClick={() => router.push(backHref)} className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-gray-900 dark:text-white font-bold text-xl">{isEdit ? "Edit Kegiatan" : "Tambah Kegiatan Baru"}</h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm">{isEdit ? `Mengedit: ${form.watch("title") || "—"}` : "Buat event dan kegiatan kampus STTB"}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button 
             onClick={form.handleSubmit((d) => onSubmit(d, false))} 
             disabled={isSaving || isUploadingImage}
             className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors disabled:opacity-50"
          >
            {isSaving && !isPublished ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Simpan Draft
          </button>
          <button 
            onClick={form.handleSubmit((d) => onSubmit(d, true))} 
             disabled={isSaving || isUploadingImage}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#E62129] hover:bg-[#c4131a] text-white text-sm font-medium transition-colors disabled:opacity-50"
          >
            {isSaving && isPublished ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle className="w-4 h-4" />}
            {isEdit ? "Perbarui" : "Terbitkan"}
          </button>
        </div>
      </div>

      {/* Live preview */}
      {form.watch("title") && (
        <div className="bg-gradient-to-r from-[#0A2C74] to-[#0570CD] rounded-2xl p-5 text-white shadow-sm">
          <p className="text-blue-200 text-xs uppercase tracking-widest font-semibold mb-2">Preview Card</p>
          <h2 className="font-bold text-xl leading-snug">{form.watch("title")}</h2>
          <div className="flex flex-wrap gap-x-5 gap-y-2 mt-3 text-blue-100 text-sm">
            {watchStartDate && <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" />{new Date(watchStartDate).toLocaleString("id-ID", { dateStyle: "long", timeStyle: "short" })}</span>}
            {watchLocation && <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" />{watchLocation}</span>}
            {watchCategory && <span className="flex items-center gap-1.5"><Tag className="w-4 h-4" />{watchCategory}</span>}
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-1.5 bg-gray-100 dark:bg-gray-800 p-1.5 rounded-2xl">
        {TABS.map(t => {
          const Icon = t.icon;
          const hasError = t.id === "basic" && (errors.title || errors.startDate || errors.location || errors.description) || 
                           t.id === "registration" && (errors.registrationUrl) ||
                           t.id === "details" && (errors.imageUrl);
          return (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium transition-all relative ${tab === t.id ? "bg-white dark:bg-gray-900 text-[#0A2C74] dark:text-white shadow-sm" : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"}`}>
              <Icon className="w-4 h-4" />
              <span className="hidden sm:inline">{t.label}</span>
              {hasError && <span className="absolute top-2 right-2 w-2 h-2 bg-[#E62129] rounded-full" />}
            </button>
          );
        })}
      </div>

      {/* Tab: Basic */}
      {tab === "basic" && (
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 space-y-6 shadow-sm">
          <Field label="Judul Kegiatan" required error={errors.title?.message}>
            <input 
                {...form.register("title")} 
                placeholder="Konser Natal STTB 2026..." 
                className={inputCls(errors.title?.message)} 
            />
          </Field>
          <div className="grid sm:grid-cols-2 gap-6">
            <Field label="Kategori" error={errors.category?.message}>
              <select {...form.register("category")} className={inputCls(errors.category?.message)}>
                <option value="">Pilih Kategori...</option>
                {EVENT_CATEGORIES.map(c => <option value={c} key={c}>{c}</option>)}
              </select>
            </Field>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            <Field label="Waktu Mulai" required error={errors.startDate?.message}>
              <input 
                 {...form.register("startDate")} 
                 type="datetime-local" 
                 className={inputCls(errors.startDate?.message)} 
              />
            </Field>
            <Field label="Waktu Selesai" hint="Opsional, jika ada batas waktu jelas" error={errors.endDate?.message}>
              <input 
                 {...form.register("endDate")} 
                 type="datetime-local" 
                 className={inputCls(errors.endDate?.message)} 
              />
            </Field>
          </div>
          <div>
            <Field label="Lokasi Acara" error={errors.location?.message}>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input 
                    {...form.register("location")}
                    placeholder="Aula Utama STTB, Zoom Meeting, dsb."
                    className={inputCls(errors.location?.message) + " pl-10"} 
                  />
                </div>
            </Field>
          </div>
          <Field label="Deskripsi Kegiatan" required error={errors.description?.message}>
            <textarea 
                {...form.register("description")} 
                rows={5}
                placeholder="Jelaskan kegiatan secara detail — tema, pembicara, agenda..." 
                className={inputCls(errors.description?.message) + " resize-none"} 
            />
          </Field>
        </div>
      )}

      {/* Tab: Registration */}
      {tab === "registration" && (
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 space-y-6 shadow-sm">
           <Field label="Link Formulir Pendaftaran" hint="Isi link ke Google Form atau platform registrasi eksternal" error={errors.registrationUrl?.message}>
             <div className="relative"><Link2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
               <input 
                  {...form.register("registrationUrl")} 
                  type="url" 
                  placeholder="https://forms.google.com/..." 
                  className={inputCls(errors.registrationUrl?.message) + " pl-10"} 
               />
             </div>
           </Field>
        </div>
      )}

      {/* Tab: Details */}
      {tab === "details" && (
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 space-y-6 shadow-sm">
          <Field label="Gambar Sampul / Poster Event" error={errors.imageUrl?.message}>
            {imageUrl ? (
              <div className="relative rounded-xl overflow-hidden mb-4 border border-gray-200 dark:border-gray-700">
                <Image
                  src={imageUrl.startsWith("http") ? imageUrl : `${process.env.NEXT_PUBLIC_API_BASE_URL}${imageUrl}`}
                  alt=""
                  height={176}
                  width={0}
                  sizes="w-full"
                  className="w-full h-44 object-cover" 
                />
                <button 
                  type="button" 
                  onClick={() => form.setValue("imageUrl", "", { shouldValidate: true })} 
                  className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/90 dark:bg-gray-900/90 shadow-sm flex items-center justify-center text-gray-700 dark:text-gray-300 hover:text-[#E62129] transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
                <div 
                    className="rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-700 p-8 text-center mb-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer group"
                    onClick={() => fileInputRef.current?.click()}
                >
                    {isUploadingImage ? (
                        <Loader2 className="w-8 h-8 text-[#0A2C74] animate-spin mx-auto mb-2" />
                    ) : (
                        <Upload className="w-8 h-8 text-gray-300 group-hover:text-[#0A2C74] transition-colors mx-auto mb-2" />
                    )}
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Upload Poster</p>
                    <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 5MB (16:9 disarankan)</p>
                    <input 
                        ref={fileInputRef}
                        type="file" 
                        accept="image/*" 
                        className="hidden" 
                        onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleImageUpload(file);
                        }} 
                    />
                </div>
            )}
            
            <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5 flex justify-between">
                <span>Atau gunakan URL</span>
            </label>
            <input 
                {...form.register("imageUrl")} 
                type="url" 
                placeholder="https://..." 
                className={inputCls(errors.imageUrl?.message)} 
            />
          </Field>
          
          <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
               <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Status Agenda</h3>
               <div className="flex items-center gap-3">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border ${isPublished ? "bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800" : "bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-800"}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${isPublished ? "bg-green-500" : "bg-yellow-500"}`} />
                    {isPublished ? "Dipublikasikan & Hadir di Jadwal" : "Draft (Belum Tampil)"}
                  </span>
               </div>
          </div>
        </div>
      )}

      {/* Wizard nav */}
      <div className="flex items-center justify-between bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-4 shadow-sm">
        <div className="flex gap-1.5">
          {TABS.map(t => (
            <button key={t.id} type="button" onClick={() => setTab(t.id)}
              className="rounded-full transition-all" style={{ width: tab === t.id ? 20 : 8, height: 8, backgroundColor: tab === t.id ? "#0A2C74" : "#D1D5DB" }} />
          ))}
        </div>
        <div className="flex items-center gap-2">
          {tab !== "basic" && (
            <button type="button" onClick={() => setTab(tab === "details" ? "registration" : "basic")}
              className="px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">← Sebelumnya</button>
          )}
          {tab !== "details"
            ? <button type="button" onClick={() => setTab(tab === "basic" ? "registration" : "details")}
              className="px-4 py-2.5 rounded-xl bg-[#0A2C74] text-white text-sm font-medium hover:bg-[#081f52] transition-colors shadow-sm">Selanjutnya →</button>
            : <button type="button" onClick={form.handleSubmit((d) => onSubmit(d, isPublished))} disabled={isSaving || isUploadingImage}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#E62129] hover:bg-[#c4131a] text-white text-sm font-medium transition-colors shadow-sm disabled:opacity-50">
              {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
               Simpan Sekarang
            </button>
          }
        </div>
      </div>
    </div>
  );
}
