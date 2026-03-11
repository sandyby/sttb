import { ReactNode, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowLeft, Calendar, MapPin, Users, X, Upload,
  AlertCircle, CheckCircle, Link2, Tag, Save, Loader2
} from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";
import { eventFormSchema, type EventFormValues } from "@/libs/schemas/event-schema";
import { useEventCategories } from "@/hooks/useEvents";
import { getImageUrl } from "@/lib/api";

/* ─── Types ──────────────────────────────────────────────── */

export type EventFormData = EventFormValues;

interface EventFormProps {
  initialData?: Partial<EventFormValues & { id?: string }>;
  onSave: (data: EventFormValues, status: "draft" | "published") => Promise<void>;
  backHref?: string;
  isSaving?: boolean;
}

/* ─── Constants ──────────────────────────────────────────── */

const TAG_SUGGESTIONS = ["STTB", "Reformed", "Pelayanan", "Akademik", "Misi", "Kepemimpinan", "Online"];

/* ─── Tag Input ──────────────────────────────────────────── */

function TagInput({ tags, onChange }: { tags: string[]; onChange: (t: string[]) => void }) {
  const [input, setInput] = useState("");
  const add = (t: string) => { const v = t.trim(); if (v && !tags.includes(v) && tags.length < 8) { onChange([...tags, v]); setInput(""); } };
  const remove = (t: string) => onChange(tags.filter(x => x !== t));
  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-1.5 min-h-[28px]">
        {tags.map(t => (
          <span key={t} className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#0A2C74]/10 text-[#0A2C74] dark:bg-blue-900/30 dark:text-blue-300">
            #{t}<button type="button" onClick={() => remove(t)} className="hover:text-[#E62129] ml-0.5"><X className="w-2.5 h-2.5" /></button>
          </span>
        ))}
        <input value={input} onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === "Enter" || e.key === ",") { e.preventDefault(); add(input); } else if (e.key === "Backspace" && !input && tags.length) remove(tags[tags.length - 1]); }}
          placeholder="Tambah tag..." className="flex-1 min-w-16 text-sm bg-transparent text-gray-700 dark:text-gray-300 focus:outline-none placeholder-gray-400" />
      </div>
      <div className="flex flex-wrap gap-1">
        {TAG_SUGGESTIONS.filter(t => !tags.includes(t)).map(t => (
          <button key={t} type="button" onClick={() => add(t)} className="px-2 py-0.5 rounded text-xs text-gray-400 bg-gray-100 dark:bg-gray-800 hover:bg-[#E62129]/10 hover:text-[#E62129] transition-colors">+{t}</button>
        ))}
      </div>
    </div>
  );
}

/* ─── Field ──────────────────────────────────────────────── */

function Field({ label, required, error, hint, children }: { label: string; required?: boolean; error?: string; hint?: string; children: ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-1.5">
        {label} {required && <span className="text-[#E62129]">*</span>}
      </label>
      {children}
      {error && <p className="flex items-center gap-1 text-[#E62129] text-xs mt-1"><AlertCircle className="w-3 h-3 flex-shrink-0" />{error}</p>}
      {hint && !error && <p className="text-gray-400 text-xs mt-1">{hint}</p>}
    </div>
  );
}

const inputCls = (error?: string) =>
  `w-full px-3 py-2.5 rounded-xl border text-sm text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-800 focus:outline-none transition-all ${error ? "border-[#E62129]" : "border-gray-200 dark:border-gray-700 focus:border-[#0A2C74]"}`;

/* ─── Main Form ──────────────────────────────────────────── */

export function EventForm({ initialData, onSave, backHref = "/admin/events", isSaving = false }: EventFormProps) {
  const router = useRouter();
  const isEdit = !!initialData?.id;
  const { data: categoriesData } = useEventCategories();
  const [saving, setSaving] = useState<"draft" | "publish" | null>(null);
  const [tab, setTab] = useState<"basic" | "registration" | "details">("basic");

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<EventFormValues>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: {
      title: initialData?.title ?? "",
      category: initialData?.category ?? "Seminar",
      date: initialData?.date ?? "",
      endDate: initialData?.endDate ?? "",
      time: initialData?.time ?? "08:00",
      endTime: initialData?.endTime ?? "17:00",
      location: initialData?.location ?? "",
      locationDetail: initialData?.locationDetail ?? "",
      description: initialData?.description ?? "",
      coverImageUrl: initialData?.coverImageUrl ?? "",
      registrationUrl: initialData?.registrationUrl ?? "",
      registrationOpen: initialData?.registrationOpen ?? false,
      registrationDeadline: initialData?.registrationDeadline ?? "",
      maxParticipants: initialData?.maxParticipants ?? "",
      status: initialData?.status ?? "draft",
      isOnline: initialData?.isOnline ?? false,
      streamingUrl: initialData?.streamingUrl ?? "",
      organizer: initialData?.organizer ?? "STTB Bandung",
      contactEmail: initialData?.contactEmail ?? "info@sttb.ac.id",
      tags: initialData?.tags ?? [],
    },
  });

  const titleValue = watch("title");
  const dateValue = watch("date");
  const timeValue = watch("time");
  const locationValue = watch("location");
  const categoryValue = watch("category");
  const coverImageUrl = watch("coverImageUrl");
  const registrationOpen = watch("registrationOpen");
  const statusValue = watch("status");
  const isOnline = watch("isOnline");
  const descriptionValue = watch("description");

  const handleSave = (status: "draft" | "published") => {
    setSaving(status === "draft" ? "draft" : "publish");
    handleSubmit(
      async (data) => {
        try { await onSave({ ...data, status }, status); }
        finally { setSaving(null); }
      },
      (fieldErrors) => {
        setSaving(null);
        toast.error("Lengkapi semua field yang diperlukan");
        if (fieldErrors.title || fieldErrors.date || fieldErrors.location || fieldErrors.description || fieldErrors.category) {
          setTab("basic");
        }
      },
    )();
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
            <p className="text-gray-500 dark:text-gray-400 text-sm">{isEdit ? `Mengedit: ${titleValue || "—"}` : "Buat event dan kegiatan kampus STTB"}</p>
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

      {/* Edit mode banner */}
      {isEdit && (
        <div className="flex items-center gap-3 p-4 rounded-2xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800">
          <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
          <p className="text-blue-700 dark:text-blue-300 text-sm">Mode Edit — perubahan akan menggantikan data kegiatan ini.</p>
          <span className={`ml-auto px-2 py-0.5 rounded-full text-xs font-semibold ${statusValue === "published" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
            {statusValue === "published" ? "Terbit" : "Draft"}
          </span>
        </div>
      )}

      {/* Live preview */}
      {titleValue && (
        <div className="bg-gradient-to-r from-[#0A2C74] to-[#0570CD] rounded-2xl p-4 text-white">
          <p className="text-blue-200 text-xs uppercase tracking-wider mb-1">Preview</p>
          <h2 className="font-bold text-lg leading-snug">{titleValue}</h2>
          <div className="flex flex-wrap gap-4 mt-2 text-blue-200 text-sm">
            {dateValue && <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{new Date(dateValue).toLocaleDateString("id-ID", { dateStyle: "long" })}{timeValue && ` · ${timeValue}`}</span>}
            {locationValue && <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{locationValue}</span>}
            {categoryValue && <span className="flex items-center gap-1"><Tag className="w-3.5 h-3.5" />{categoryValue}</span>}
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-1.5 bg-gray-100 dark:bg-gray-800 p-1.5 rounded-2xl">
        {TABS.map(t => {
          const Icon = t.icon;
          const hasError = t.id === "basic" && (errors.title || errors.date || errors.location || errors.description || errors.category);
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
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 space-y-5">
          <Field label="Judul Kegiatan" required error={errors.title?.message}>
            <input type="text" {...register("title")} placeholder="Masukkan judul kegiatan..." className={inputCls(errors.title?.message)} />
          </Field>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Kategori" required error={errors.category?.message}>
              <select {...register("category")} className={inputCls(errors.category?.message)}>
                <option value="">— Pilih Kategori —</option>
                {(categoriesData ?? []).map(c => (
                  <option key={c.id} value={c.name}>{c.name}</option>
                ))}
              </select>
            </Field>
            <Field label="Penyelenggara">
              <input type="text" {...register("organizer")} className={inputCls()} />
            </Field>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Tanggal Mulai" required error={errors.date?.message}>
              <div className="flex gap-2">
                <input type="date" {...register("date")} className={inputCls(errors.date?.message) + " flex-1"} />
                <input type="time" {...register("time")} className={inputCls() + " w-28"} />
              </div>
            </Field>
            <Field label="Tanggal Selesai" hint="Opsional untuk acara multi-hari">
              <div className="flex gap-2">
                <input type="date" {...register("endDate")} className={inputCls() + " flex-1"} />
                <input type="time" {...register("endTime")} className={inputCls() + " w-28"} />
              </div>
            </Field>
          </div>
          <div>
            <div className="flex items-center gap-3 mb-3">
              <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Mode Acara</p>
              <Controller name="isOnline" control={control} render={({ field }) => (
                <>
                  {["Offline", "Online", "Hybrid"].map((mode, mi) => (
                    <button key={mode} type="button" onClick={() => field.onChange(mi === 1)}
                      className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${(mi === 1 ? field.value : !field.value) ? "bg-[#0A2C74] text-white" : "bg-gray-100 dark:bg-gray-800 text-gray-500"}`}>
                      {mode}
                    </button>
                  ))}
                </>
              )} />
            </div>
            <div className="space-y-3">
              <Field label={isOnline ? "Platform / Link" : "Nama Venue"} required error={errors.location?.message}>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input type="text" {...register("location")}
                    placeholder={isOnline ? "Zoom, Google Meet, YouTube Live..." : "Nama gedung / aula / tempat"}
                    className={inputCls(errors.location?.message) + " pl-9"} />
                </div>
              </Field>
              <Field label="Detail Lokasi" hint="Alamat lengkap, nomor ruangan, petunjuk jalan">
                <textarea {...register("locationDetail")} rows={2} placeholder="Jl. Contoh No. 123, Bandung..." className={inputCls() + " resize-none"} />
              </Field>
              {isOnline && (
                <Field label="Link Streaming">
                  <div className="relative"><Link2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input type="url" {...register("streamingUrl")} placeholder="https://zoom.us/j/..." className={inputCls() + " pl-9"} />
                  </div>
                </Field>
              )}
            </div>
          </div>
          <Field label="Deskripsi Kegiatan" required error={errors.description?.message}>
            <textarea {...register("description")} rows={5}
              placeholder="Jelaskan kegiatan secara lengkap — tema, tujuan, pembicara, agenda..." className={inputCls(errors.description?.message) + " resize-none"} />
          </Field>
        </div>
      )}

      {/* Tab: Registration */}
      {tab === "registration" && (
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 space-y-5">
          <Controller name="registrationOpen" control={control} render={({ field }) => (
            <div className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <div>
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Buka Pendaftaran</p>
                <p className="text-xs text-gray-400 mt-0.5">Aktifkan jika kegiatan memerlukan registrasi peserta</p>
              </div>
              <button type="button" onClick={() => field.onChange(!field.value)}
                className="relative rounded-full transition-colors flex-shrink-0" style={{ width: 44, height: 24, backgroundColor: field.value ? "#22C55E" : "#D1D5DB" }}>
                <span className="absolute top-0.5 rounded-full bg-white shadow transition-transform" style={{ width: 20, height: 20, left: 2, transform: field.value ? "translateX(20px)" : "translateX(0)" }} />
              </button>
            </div>
          )} />
          {registrationOpen && (
            <div className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Link Formulir Pendaftaran">
                  <div className="relative"><Link2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input type="url" {...register("registrationUrl")} placeholder="https://forms.google.com/..." className={inputCls() + " pl-9"} />
                  </div>
                </Field>
                <Field label="Batas Pendaftaran">
                  <input type="date" {...register("registrationDeadline")} className={inputCls()} />
                </Field>
              </div>
              <Field label="Kapasitas Peserta" hint="Kosongkan jika tidak ada batas maksimum">
                <div className="relative"><Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input type="number" min={1} {...register("maxParticipants")} placeholder="Contoh: 100" className={inputCls() + " pl-9"} />
                </div>
              </Field>
            </div>
          )}
          <div className="border-t border-gray-100 dark:border-gray-800 pt-5">
            <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-4">Kontak Panitia</p>
            <Field label="Email Kontak">
              <input type="email" {...register("contactEmail")} placeholder="panitia@sttb.ac.id" className={inputCls()} />
            </Field>
          </div>
        </div>
      )}

      {/* Tab: Details */}
      {tab === "details" && (
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 space-y-5">
          <Field label="Status Publikasi">
            <Controller name="status" control={control} render={({ field }) => (
              <div className="grid grid-cols-2 gap-3">
                {(["draft", "published"] as const).map(s => (
                  <button key={s} type="button" onClick={() => field.onChange(s)}
                    className={`py-3 rounded-xl text-sm font-medium border transition-all ${field.value === s ? (s === "published" ? "bg-green-500 text-white border-green-500 shadow-md" : "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 border-yellow-300") : "bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:bg-gray-100"}`}>
                    {s === "draft" ? "📝 Draft" : "✅ Terbitkan"}
                  </button>
                ))}
              </div>
            )} />
          </Field>
          <Field label="Gambar Sampul / Cover">
            {coverImageUrl
              ? <div className="relative rounded-xl overflow-hidden mb-3">
                <Image src={getImageUrl(coverImageUrl) ?? coverImageUrl} alt="" height={176} width={400} className="w-full h-44 object-cover" />
                <button type="button" onClick={() => setValue("coverImageUrl", "")} className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-black/70"><X className="w-4 h-4" /></button>
              </div>
              : <div className="rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-700 p-8 text-center mb-3">
                <Upload className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                <p className="text-sm text-gray-400">Masukkan URL gambar di bawah ini</p>
                <p className="text-xs text-gray-300 mt-1">Rekomendasi: 1200×630px</p>
              </div>
            }
            <input type="url" {...register("coverImageUrl")} placeholder="https://images.unsplash.com/..." className={inputCls()} />
          </Field>
          <Field label="Tags">
            <div className="p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
              <Controller name="tags" control={control} render={({ field }) => (
                <TagInput tags={field.value} onChange={field.onChange} />
              )} />
            </div>
          </Field>
          {/* Checklist */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-4 text-xs space-y-2">
            <p className="font-semibold text-gray-700 dark:text-gray-300 text-sm mb-3">Status Kelengkapan</p>
            {[
              { label: "Judul", ok: !!titleValue },
              { label: "Kategori", ok: !!categoryValue },
              { label: "Tanggal Mulai", ok: !!dateValue },
              { label: "Lokasi", ok: !!locationValue },
              { label: "Deskripsi", ok: !!descriptionValue, extra: descriptionValue ? `${descriptionValue.split(/\s+/).filter(Boolean).length} kata` : "" },
              { label: "Pendaftaran", ok: registrationOpen, optional: true },
              { label: "Gambar", ok: !!coverImageUrl, optional: true },
            ].map(({ label, ok, extra, optional }) => (
              <div key={label} className="flex items-center justify-between">
                <span className="text-gray-500 dark:text-gray-400">{label}</span>
                <span className={ok ? "text-green-600 font-medium" : optional ? "text-gray-300 dark:text-gray-600" : "text-yellow-500"}>
                  {ok ? (extra || "✓") : (optional ? "—" : "Belum diisi")}
                </span>
              </div>
            ))}
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
              className="px-4 py-2 rounded-xl bg-[#0A2C74] text-white text-sm font-medium hover:bg-[#081f52] transition-colors">Selanjutnya →</button>
            : <button type="button" onClick={() => handleSave(statusValue)} disabled={!!saving}
              className="flex items-center gap-2 px-5 py-2 rounded-xl bg-[#E62129] hover:bg-[#c4131a] text-white text-sm font-medium transition-colors disabled:opacity-50">
              {saving ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <CheckCircle className="w-4 h-4" />}
              {statusValue === "draft" ? "Simpan Draft" : "Terbitkan"}
            </button>
          }
        </div>
      </div>
    </div>
  );
}
