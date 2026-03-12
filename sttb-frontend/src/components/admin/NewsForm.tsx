"use client";

import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowLeft, Bold, Italic, Underline, List, ListOrdered, Link2, Eye, EyeOff, Upload, X, AlertCircle, Image as ImageIcon,
  CheckCircle, Heading1, Heading2, Quote, Save, Loader2
} from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";
import { newsFormSchema, type NewsFormValues } from "@/libs/schemas/news-schema";
import type { CategoryResponse } from "@/types/shared";
import { getImageUrl } from "@/lib/api";
import { CreateCategoryDialog } from "@/components/shared/CreateCategoryDialog";
import { useCreateNewsCategory } from "@/hooks/useNews";
import { Plus } from "lucide-react";
import { useUploadImage } from "@/hooks/useUpload";

/* ─── Types ──────────────────────────────────────────────── */

export type NewsFormData = NewsFormValues;

interface NewsFormProps {
  categories?: CategoryResponse[];
  initialData?: Partial<NewsFormValues & { id?: string }>;
  onSave: (data: NewsFormValues, status: "draft" | "published") => Promise<void>;
  backHref?: string;
}

const TAG_SUGGESTIONS = ["STTB", "Teologi", "Reformed", "Akademik", "Pelayanan", "Misi", "Mahasiswa", "Alumni"];

export function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").slice(0, 80);
}

/* ─── Rich Text Editor ───────────────────────────────────── */

const TOOLBAR = [
  { icon: Bold, label: "Bold", action: "**", wrap: true },
  { icon: Italic, label: "Italic", action: "_", wrap: true },
  { icon: Underline, label: "Underline", action: "__", wrap: true },
  { icon: Heading1, label: "H1", action: "\n# ", wrap: false },
  { icon: Heading2, label: "H2", action: "\n## ", wrap: false },
  { icon: Quote, label: "Quote", action: "\n> ", wrap: false },
  { icon: List, label: "List", action: "\n- ", wrap: false },
  { icon: ListOrdered, label: "Numbered", action: "\n1. ", wrap: false },
  { icon: Link2, label: "Link", action: "[Link](url)", wrap: false },
  { icon: ImageIcon, label: "Image", action: "![Alt](url)", wrap: false },
];

function RichTextEditor({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const ref = useRef<HTMLTextAreaElement>(null);
  const [preview, setPreview] = useState(false);

  const apply = (action: string, wrap: boolean) => {
    const ta = ref.current;
    if (!ta) return;
    const s = ta.selectionStart, e = ta.selectionEnd, sel = value.slice(s, e);
    const newVal = wrap
      ? value.slice(0, s) + action + sel + action + value.slice(e)
      : value.slice(0, s) + action + sel + value.slice(e);
    onChange(newVal);
    const cur = wrap ? s + action.length + sel.length + action.length : s + action.length + sel.length;
    setTimeout(() => { ta.selectionStart = cur; ta.selectionEnd = cur; ta.focus(); }, 0);
  };

  const html = (t: string) =>
    t.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/_(.*?)_/g, "<em>$1</em>")
      .replace(/^# (.*?)$/gm, "<h1 class='text-xl font-bold mt-3 mb-1'>$1</h1>")
      .replace(/^## (.*?)$/gm, "<h2 class='text-lg font-bold mt-2 mb-1'>$1</h2>")
      .replace(/^> (.*?)$/gm, "<blockquote class='border-l-4 border-gray-300 pl-3 italic text-gray-500 my-2'>$1</blockquote>")
      .replace(/^- (.*?)$/gm, "<li class='ml-4 list-disc'>$1</li>")
      .replace(/\n/g, "<br/>");

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
      <div className="flex items-center gap-0.5 p-2 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex-wrap">
        {TOOLBAR.map((btn) => {
          const Icon = btn.icon;
          return (
            <button key={btn.label} type="button" title={btn.label} onClick={() => apply(btn.action, btn.wrap)}
              className="px-2 py-1.5 rounded-md text-gray-500 dark:text-gray-400 hover:bg-white dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white transition-colors">
              <Icon className="w-3.5 h-3.5" />
            </button>
          );
        })}
        <div className="flex-1" />
        <button type="button" onClick={() => setPreview(p => !p)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${preview ? "bg-[#0A2C74] text-white" : "bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100"}`}>
          {preview ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
          {preview ? "Edit" : "Preview"}
        </button>
      </div>
      {preview
        ? <div className="min-h-[280px] p-5 text-sm text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-900 prose prose-sm max-w-none"
          dangerouslySetInnerHTML={{ __html: html(value) || "<p class='text-gray-400 italic'>Belum ada konten...</p>" }} />
        : <textarea ref={ref} value={value} onChange={e => onChange(e.target.value)} rows={12}
          placeholder="Tulis konten berita... Gunakan toolbar di atas untuk format teks."
          className="w-full p-4 bg-white dark:bg-gray-900 text-sm text-gray-800 dark:text-gray-200 focus:outline-none resize-none font-mono leading-relaxed placeholder-gray-400" />
      }
      <div className="px-4 py-1.5 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 text-xs text-gray-400">
        {value.length} karakter · {value.split(/\s+/).filter(Boolean).length} kata
      </div>
    </div>
  );
}

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
          placeholder="Tambah tag, Enter" className="flex-1 min-w-20 text-sm bg-transparent text-gray-700 dark:text-gray-300 focus:outline-none placeholder-gray-400" />
      </div>
      <div className="flex flex-wrap gap-1">
        {TAG_SUGGESTIONS.filter(t => !tags.includes(t)).map(t => (
          <button key={t} type="button" onClick={() => add(t)}
            className="px-2 py-0.5 rounded text-xs text-gray-400 bg-gray-100 dark:bg-gray-800 hover:bg-[#E62129]/10 hover:text-[#E62129] transition-colors">+{t}</button>
        ))}
      </div>
    </div>
  );
}

/* ─── Main Form Component ────────────────────────────────── */

export function NewsForm({ categories = [], initialData, onSave, backHref = "/admin/news" }: NewsFormProps) {
  const router = useRouter();
  const isEdit = !!initialData?.id;
  const [saving, setSaving] = useState<"draft" | "publish" | null>(null);
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false);
  const isFirstRender = useRef(true);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { mutateAsync: uploadImage, isPending: isUploading } = useUploadImage();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<NewsFormValues>({
    resolver: zodResolver(newsFormSchema),
    defaultValues: {
      title: initialData?.title ?? "",
      slug: initialData?.slug ?? "",
      excerpt: initialData?.excerpt ?? "",
      content: initialData?.content ?? "",
      categoryId: initialData?.categoryId ?? "",
      author: initialData?.author ?? "Redaksi STTB",
      status: initialData?.status ?? "draft",
      featured: initialData?.featured ?? false,
      coverImageUrl: initialData?.coverImageUrl ?? "",
      tags: initialData?.tags ?? [],
    },
  });

  const titleValue = watch("title");
  const excerptValue = watch("excerpt");
  const contentValue = watch("content");
  const coverImageUrl = watch("coverImageUrl");
  const statusValue = watch("status");

  // Auto-generate slug from title (skip on first render to preserve initialData slug in edit mode)
  useEffect(() => {
    if (isFirstRender.current) { isFirstRender.current = false; return; }
    setValue("slug", slugify(titleValue), { shouldValidate: false });
  }, [titleValue, setValue]);

  const handleSave = (status: "draft" | "published") => {
    setSaving(status === "draft" ? "draft" : "publish");
    handleSubmit(
      async (data) => {
        try { await onSave(data, status); }
        finally { setSaving(null); }
      },
      () => {
        setSaving(null);
        toast.error("Lengkapi semua field yang diperlukan");
      },
    )();
  };

  const handleImageUpload = async (file: File) => {
    try {
      if (!file.type.startsWith("image/")) {
        toast.error("File harus berupa gambar");
        return;
      }
      const res = await uploadImage({ file, uploadType: "news" });
      setValue("coverImageUrl", res.url, { shouldValidate: true });
      toast.success("Gambar berhasil diupload");
    } catch (error) {
      toast.error("Gagal mengupload gambar");
    }
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header bar */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <button onClick={() => router.push(backHref)} className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-gray-900 dark:text-white font-bold text-xl">{isEdit ? "Edit Berita" : "Tambah Berita Baru"}</h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm">{isEdit ? `Mengedit: ${titleValue || "—"}` : "Buat dan terbitkan artikel berita STTB"}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => handleSave("draft")} disabled={!!saving}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors disabled:opacity-50">
            {saving === "draft" ? <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" /> : <Save className="w-4 h-4" />}
            Simpan Draft
          </button>
          <button onClick={() => handleSave("published")} disabled={!!saving}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#E62129] hover:bg-[#c4131a] text-white text-sm font-medium transition-colors disabled:opacity-50">
            {saving === "publish" ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <CheckCircle className="w-4 h-4" />}
            {isEdit ? "Perbarui" : "Terbitkan"}
          </button>
        </div>
      </div>

      {/* Status badge for edit mode */}
      {isEdit && (
        <div className="flex items-center gap-3 p-4 rounded-2xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800">
          <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
          <p className="text-blue-700 dark:text-blue-300 text-sm">
            Mode Edit — perubahan akan langsung menggantikan versi sebelumnya.
          </p>
          <span className={`ml-auto px-2 py-0.5 rounded-full text-xs font-semibold ${statusValue === "published" ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"}`}>
            {statusValue === "published" ? "Terbit" : "Draft"}
          </span>
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main editor */}
        <div className="lg:col-span-2 space-y-5">
          {/* Title */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Judul Berita <span className="text-[#E62129]">*</span>
            </label>
            <input type="text" {...register("title")} placeholder="Tulis judul berita yang menarik..."
              className={`w-full px-4 py-3 rounded-xl border bg-gray-50 dark:bg-gray-800 text-base text-gray-900 dark:text-white focus:outline-none transition-all ${errors.title ? "border-[#E62129]" : "border-gray-200 dark:border-gray-700 focus:border-[#0A2C74]"}`} />
            {errors.title && <p className="flex items-center gap-1 text-[#E62129] text-xs mt-1.5"><AlertCircle className="w-3 h-3" />{errors.title.message}</p>}
            <div className="mt-2 flex items-center gap-2">
              <span className="text-gray-400 text-xs">/berita/</span>
              <Controller name="slug" control={control} render={({ field }) => (
                <input type="text" value={field.value} ref={field.ref} onBlur={field.onBlur}
                  onChange={e => field.onChange(slugify(e.target.value))}
                  className="flex-1 px-2 py-1 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs text-gray-600 dark:text-gray-400 focus:outline-none focus:border-[#0A2C74] font-mono" />
              )} />
            </div>
          </div>

          {/* Content */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              Konten <span className="text-[#E62129]">*</span>
            </label>
            <Controller name="content" control={control} render={({ field }) => (
              <RichTextEditor value={field.value} onChange={field.onChange} />
            )} />
            {errors.content && <p className="flex items-center gap-1 text-[#E62129] text-xs mt-1.5"><AlertCircle className="w-3 h-3" />{errors.content.message}</p>}
          </div>

          {/* Excerpt */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Ringkasan / Excerpt <span className="text-[#E62129]">*</span>
            </label>
            <textarea {...register("excerpt")} rows={3} maxLength={280}
              placeholder="Ringkasan singkat yang muncul di daftar berita (maks. 280 karakter)..."
              className={`w-full px-4 py-3 rounded-xl border bg-gray-50 dark:bg-gray-800 text-sm text-gray-800 dark:text-gray-200 focus:outline-none resize-none transition-all ${errors.excerpt ? "border-[#E62129]" : "border-gray-200 dark:border-gray-700 focus:border-[#0A2C74]"}`} />
            <div className="flex justify-between mt-1">
              {errors.excerpt ? <p className="flex items-center gap-1 text-[#E62129] text-xs"><AlertCircle className="w-3 h-3" />{errors.excerpt.message}</p> : <span />}
              <span className="text-xs text-gray-400">{excerptValue?.length ?? 0}/280</span>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          {/* Publish */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">Pengaturan Publikasi</h3>
            <div className="space-y-4">
              <Controller name="status" control={control} render={({ field }) => (
                <div className="grid grid-cols-2 gap-2">
                  {(["draft", "published"] as const).map(s => (
                    <button key={s} type="button" onClick={() => field.onChange(s)}
                      className={`py-2 rounded-xl text-xs font-medium border transition-all ${field.value === s ? (s === "published" ? "bg-green-500 text-white border-green-500 shadow-sm" : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400 border-yellow-200") : "bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:bg-gray-100"}`}>
                      {s === "draft" ? "📝 Draft" : "✅ Terbitkan"}
                    </button>
                  ))}
                </div>
              )} />
              <Controller name="featured" control={control} render={({ field }) => (
                <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-800">
                  <div>
                    <p className="text-xs font-medium text-gray-700 dark:text-gray-300">Unggulan / Featured</p>
                    <p className="text-xs text-gray-400 mt-0.5">Tampil di homepage</p>
                  </div>
                  <button type="button" onClick={() => field.onChange(!field.value)}
                    className="relative rounded-full transition-colors flex-shrink-0" style={{ width: 40, height: 22, backgroundColor: field.value ? "#E62129" : "#D1D5DB" }}>
                    <span className="absolute top-0.5 rounded-full bg-white shadow transition-transform" style={{ width: 18, height: 18, left: 2, transform: field.value ? "translateX(18px)" : "translateX(0)" }} />
                  </button>
                </div>
              )} />
            </div>
          </div>

          {/* Category */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">Klasifikasi</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-xs text-gray-400 mb-1.5">Kategori <span className="text-[#E62129]">*</span></label>
                <div className="flex gap-2">
                  <select {...register("categoryId")}
                    className={`flex-1 px-3 py-2.5 rounded-xl border bg-gray-50 dark:bg-gray-800 text-sm text-gray-800 dark:text-gray-200 focus:outline-none focus:border-[#0A2C74] ${errors.categoryId ? "border-[#E62129]" : "border-gray-200 dark:border-gray-700"}`}>
                    <option value="">— Pilih Kategori —</option>
                    {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                  <button
                    type="button"
                    onClick={() => setIsCategoryDialogOpen(true)}
                    className="p-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <Plus className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
                {errors.categoryId && <p className="flex items-center gap-1 text-[#E62129] text-xs mt-1"><AlertCircle className="w-3 h-3" />{errors.categoryId.message}</p>}
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1.5">Penulis</label>
                <input type="text" {...register("author")}
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm text-gray-800 dark:text-gray-200 focus:outline-none focus:border-[#0A2C74]" />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1.5">Tags</label>
                <div className="p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                  <Controller name="tags" control={control} render={({ field }) => (
                    <TagInput tags={field.value} onChange={field.onChange} />
                  )} />
                </div>
              </div>
            </div>
          </div>

          <CreateCategoryDialog
            isOpen={isCategoryDialogOpen}
            onCloseAction={() => setIsCategoryDialogOpen(false)}
            onSuccessAction={(category) => {
              setValue("categoryId", category.id);
            }}
            title="Tambah Kategori Berita"
            mutationHookAction={useCreateNewsCategory}
          />


          {/* Cover image */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">Gambar Sampul</h3>
            {coverImageUrl
              ? <div className="relative rounded-xl overflow-hidden mb-3">
                <Image src={getImageUrl(coverImageUrl) ?? coverImageUrl} alt="Cover" height={128} width={400} className="w-full h-32 object-cover" />
                <button type="button" onClick={() => setValue("coverImageUrl", "")} disabled={!!saving || isUploading} className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-black/70 transition-colors">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
              : <div onClick={() => !isUploading && fileInputRef.current?.click()} className={`rounded-xl border-2 border-dashed p-5 text-center cursor-pointer transition-colors ${isUploading ? "border-blue-300 bg-blue-50/50 dark:bg-blue-900/20" : "border-gray-200 dark:border-gray-700 hover:border-[#E62129]"}`}>
                {isUploading ? (
                  <>
                    <Loader2 className="w-6 h-6 text-blue-500 mx-auto mb-1 animate-spin" />
                    <p className="text-xs text-blue-500 font-medium">Mengupload...</p>
                  </>
                ) : (
                  <>
                    <Upload className="w-6 h-6 text-gray-300 hover:text-[#E62129] mx-auto mb-1 transition-colors" />
                    <p className="text-xs text-gray-500 font-medium">Klik untuk upload gambar sampul</p>
                    <p className="text-[10px] text-gray-400 mt-0.5">Mendukung JPG, PNG (Max 10MB)</p>
                  </>
                )}
              </div>
            }
            <input type="file" ref={fileInputRef} accept="image/*" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) handleImageUpload(f); }} />
          </div>

          {/* Checklist */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-5 text-xs space-y-2">
            <p className="font-semibold text-gray-700 dark:text-gray-300 text-sm mb-3">Status Kelengkapan</p>
            {[
              { label: "Judul", ok: !!titleValue },
              { label: "Konten", ok: !!contentValue, extra: contentValue ? `${contentValue.split(/\s+/).filter(Boolean).length} kata` : "" },
              { label: "Ringkasan", ok: !!excerptValue },
              { label: "Gambar Sampul", ok: !!coverImageUrl, optional: true },
            ].map(({ label, ok, extra, optional }) => (
              <div key={label} className="flex items-center justify-between">
                <span className="text-gray-500 dark:text-gray-400">{label}{optional && " (opsional)"}</span>
                <span className={ok ? "text-green-600 font-medium" : optional ? "text-gray-300 dark:text-gray-600" : "text-yellow-500 font-medium"}>
                  {ok ? (extra || "✓") : (optional ? "—" : "Belum diisi")}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}