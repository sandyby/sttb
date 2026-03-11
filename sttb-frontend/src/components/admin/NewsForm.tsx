import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowLeft, Bold, Italic, Underline, List, ListOrdered, Link2, Eye, EyeOff, Upload, X, AlertCircle,
  CheckCircle, Heading1, Heading2, Quote, Save, Loader2
} from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";
import { createNewsSchema, type CreateNewsFormValues } from "../../libs/schemas/news-schema";
import { useUploadImage } from "../../hooks/useUpload";

/* ─── Types ──────────────────────────────────────────────── */

interface NewsFormProps {
  /** If provided, form is in "edit" mode */
  initialData?: Partial<CreateNewsFormValues & { id?: string }>;
  onSave: (data: CreateNewsFormValues) => Promise<void>;
  backHref?: string;
  isSaving?: boolean;
}

/* ─── Constants ──────────────────────────────────────────── */

export const NEWS_CATEGORIES = ["Konferensi", "Akademik", "Beasiswa", "Kerjasama", "Seminar", "Fasilitas", "Misi", "Alumni"];
// Removed TAG suggestions as the new db schema doesn't array tags directly, or we can comma separate them. I'll keep them out for simplicity matching the API unless added later.

export function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/^-+|-+$/g, "").slice(0, 80);
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
  { icon: Image, label: "Image", action: "![Alt](url)", wrap: false },
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
    <div className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden focus-within:border-[#0A2C74] transition-colors">
      <div className="flex items-center gap-0.5 p-2 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex-wrap">
        {TOOLBAR.map((btn) => {
          const Icon = btn.icon;
          return (
            <button key={btn.label} type="button" title={btn.label} onClick={() => apply(btn.action, btn.wrap)}
              className="px-2 py-1.5 rounded-md text-gray-500 dark:text-gray-400 hover:bg-white dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white transition-colors">
              <Icon className="w-3.5 h-3.5" src={""} alt={""} />
            </button>
          );
        })}
        <div className="flex-1" />
        <button type="button" onClick={() => setPreview(p => !p)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${preview ? "bg-[#0A2C74] text-white" : "bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"}`}>
          {preview ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
          {preview ? "Edit" : "Preview"}
        </button>
      </div>
      {preview
        ? <div className="min-h-[280px] p-5 text-sm text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-900 prose prose-sm max-w-none break-words"
          dangerouslySetInnerHTML={{ __html: html(value) || "<p class='text-gray-400 italic'>Belum ada konten...</p>" }} />
        : <textarea ref={ref} value={value} onChange={e => onChange(e.target.value)} rows={12}
          placeholder="Tulis konten berita... Gunakan toolbar di atas untuk format teks."
          className="w-full p-4 bg-white dark:bg-gray-900 text-sm text-gray-800 dark:text-gray-200 focus:outline-none resize-none font-mono leading-relaxed placeholder-gray-400" />
      }
      <div className="px-4 py-1.5 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 text-xs text-gray-400 flex justify-between">
        <span>{value.length} karakter · {value.split(/\s+/).filter(Boolean).length} kata</span>
      </div>
    </div>
  );
}

/* ─── Main Form Component ────────────────────────────────── */

export function NewsForm({ initialData, onSave, backHref = "/admin/news", isSaving = false }: NewsFormProps) {
  const router = useRouter();
  const isEdit = !!initialData?.id;
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { mutateAsync: uploadImage, isPending: isUploadingImage } = useUploadImage();

  const form = useForm<CreateNewsFormValues>({
    resolver: zodResolver(createNewsSchema),
    defaultValues: {
      title: initialData?.title ?? "",
      slug: initialData?.slug ?? "",
      excerpt: initialData?.excerpt ?? "",
      content: initialData?.content ?? "",
      category: initialData?.category ?? "Akademik",
      thumbnailUrl: initialData?.thumbnailUrl ?? "",
      isFeatured: initialData?.isFeatured ?? false,
      isPublished: initialData?.isPublished ?? false,
    },
  });

  // Auto-generate slug when title changes IF manually untouched
  const watchTitle = form.watch("title");
  const formSlugState = form.getFieldState("slug");
  
  useEffect(() => {
    if (!formSlugState.isDirty && !isEdit) {
      form.setValue("slug", slugify(watchTitle), { shouldValidate: true });
    }
  }, [watchTitle, formSlugState.isDirty, isEdit, form]);

  const handleImageUpload = async (file: File) => {
    try {
      const res = await uploadImage({ file, uploadType: "news" });
      form.setValue("thumbnailUrl", res.url, { shouldValidate: true });
      toast.success("Gambar berhasil diupload!");
    } catch (error) {
       toast.error(error instanceof Error ? error.message : "Gagal mengupload gambar");
    }
  };

  const onSubmit = async (data: CreateNewsFormValues, setPublished: boolean) => {
    try {
        await onSave({
            ...data,
            isPublished: setPublished,
        });
    } catch (e) {
        toast.error("Terjadi kesalahan saat menyimpan");
    }
  };

  const thumbnailUrl = form.watch("thumbnailUrl");
  const isPublished = form.watch("isPublished");
  const isFeatured = form.watch("isFeatured");

  const errors = form.formState.errors;

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
            <p className="text-gray-500 dark:text-gray-400 text-sm">{isEdit ? `Mengedit: ${form.watch("title") || "—"}` : "Buat dan terbitkan artikel berita STTB"}</p>
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
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0A2C74] hover:bg-[#072054] text-white text-sm font-medium transition-colors shadow-sm disabled:opacity-50"
          >
            {isSaving && isPublished ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle className="w-4 h-4" />}
            {isEdit ? "Perbarui & Terbitkan" : "Terbitkan"}
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main editor */}
        <div className="lg:col-span-2 space-y-5">
          {/* Title & Slug */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 shadow-sm">
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Judul Berita <span className="text-[#E62129]">*</span>
                    </label>
                    <input 
                        {...form.register("title")} 
                        placeholder="Tulis judul berita yang menarik..."
                        className={`w-full px-4 py-3.5 rounded-xl border bg-gray-50 dark:bg-gray-800 text-base text-gray-900 dark:text-white focus:outline-none transition-all ${errors.title ? "border-[#E62129] focus:ring-1 focus:ring-[#E62129]" : "border-gray-200 dark:border-gray-700 focus:border-[#0A2C74] focus:ring-1 focus:ring-[#0A2C74]"}`} 
                    />
                    {errors.title && <p className="flex items-center gap-1.5 text-[#E62129] text-xs mt-2"><AlertCircle className="w-3.5 h-3.5" />{errors.title.message}</p>}
                </div>

                <div>
                    <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5">
                    URL Slug <span className="text-[#E62129]">*</span>
                    </label>
                    <div className="flex items-center bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden focus-within:border-[#0A2C74] transition-colors">
                        <span className="px-3 text-gray-400 text-sm border-r border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800/80">/berita/</span>
                        <input 
                            {...form.register("slug")}
                            className="flex-1 px-3 py-2 bg-transparent text-sm text-gray-700 dark:text-gray-300 focus:outline-none font-mono" 
                        />
                    </div>
                    {errors.slug && <p className="flex items-center gap-1.5 text-[#E62129] text-xs mt-1.5"><AlertCircle className="w-3.5 h-3.5" />{errors.slug.message}</p>}
                </div>
            </div>
          </div>

          {/* Content */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 shadow-sm">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              Konten <span className="text-[#E62129]">*</span>
            </label>
            <Controller
              name="content"
              control={form.control}
              render={({ field }) => (
                <RichTextEditor value={field.value} onChange={field.onChange} />
              )}
            />
            {errors.content && <p className="flex items-center gap-1.5 text-[#E62129] text-xs mt-2"><AlertCircle className="w-3.5 h-3.5" />{errors.content.message}</p>}
          </div>

          {/* Excerpt */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 shadow-sm">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Ringkasan / Excerpt <span className="text-gray-400 font-normal text-xs ml-1">(Bila dikosongkan akan diambil dari konten)</span>
            </label>
            <textarea 
                {...form.register("excerpt")}
                rows={3} 
                maxLength={500}
                placeholder="Ringkasan singkat yang muncul di daftar berita (maks. 500 karakter)..."
                className={`w-full px-4 py-3 rounded-xl border bg-gray-50 dark:bg-gray-800 text-sm text-gray-800 dark:text-gray-200 focus:outline-none resize-none transition-all ${errors.excerpt ? "border-[#E62129]" : "border-gray-200 dark:border-gray-700 focus:border-[#0A2C74]"}`} 
            />
            <div className="flex justify-between mt-1.5">
              {errors.excerpt ? <p className="flex items-center gap-1.5 text-[#E62129] text-xs"><AlertCircle className="w-3.5 h-3.5" />{errors.excerpt.message}</p> : <span />}
              <span className="text-xs text-gray-400">{form.watch("excerpt")?.length || 0}/500</span>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          
          {/* Cover image */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Thumbnail Berita</h3>
            
            {thumbnailUrl ? (
                <div className="relative rounded-xl overflow-hidden mb-4 border border-gray-200 dark:border-gray-700">
                    <Image
                        src={thumbnailUrl.startsWith("http") ? thumbnailUrl : `${process.env.NEXT_PUBLIC_API_BASE_URL}${thumbnailUrl}`}
                        alt="Thumbnail"
                        height={200}
                        width={300}
                        sizes="w-full"
                        className="w-full h-auto object-cover aspect-video bg-gray-100 dark:bg-gray-800" 
                    />
                    <button 
                        type="button" 
                        onClick={() => form.setValue("thumbnailUrl", "", { shouldValidate: true })} 
                        className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/90 dark:bg-gray-900/90 shadow-sm flex items-center justify-center text-gray-700 dark:text-gray-300 hover:text-[#E62129] dark:hover:text-[#E62129] transition-colors"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>
              ) : (
                <div 
                    className="rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-700 p-6 text-center mb-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer group"
                    onClick={() => fileInputRef.current?.click()}
                >
                    {isUploadingImage ? (
                        <Loader2 className="w-8 h-8 text-[#0A2C74] animate-spin mx-auto mb-2" />
                    ) : (
                        <Upload className="w-8 h-8 text-gray-300 group-hover:text-[#0A2C74] transition-colors mx-auto mb-2" />
                    )}
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Upload Gambar</p>
                    <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 5MB</p>
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

            <div>
                 <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5 flex justify-between">
                    <span>Atau gunakan URL</span>
                </label>
                <input 
                    {...form.register("thumbnailUrl")}
                    type="url" 
                    placeholder="https://..."
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-300 focus:outline-none focus:border-[#0A2C74] focus:ring-1 focus:ring-[#0A2C74] transition-all" 
                />
                 {errors.thumbnailUrl && <p className="text-[#E62129] text-xs mt-1.5">{errors.thumbnailUrl.message}</p>}
            </div>
          </div>

          {/* Publish Settings */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 shadow-sm space-y-5">
            <div>
               <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Status Konten</h3>
               <div className="flex items-center gap-3">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border ${isPublished ? "bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800" : "bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-800"}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${isPublished ? "bg-green-500" : "bg-yellow-500"}`} />
                    {isPublished ? "Dipublikasikan" : "Draft"}
                  </span>
               </div>
            </div>

            <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
                <label className="flex items-center justify-between cursor-pointer group">
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-[#0A2C74] transition-colors">Jadikan Unggulan (Featured)</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Tampilkan di slider utama Beranda</p>
                  </div>
                  <div className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${isFeatured ? 'bg-[#E62129]' : 'bg-gray-200 dark:bg-gray-700'}`}>
                    <input type="checkbox" className="sr-only" {...form.register("isFeatured")} />
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isFeatured ? 'translate-x-6' : 'translate-x-1'}`} />
                  </div>
                </label>
            </div>
          </div>

          {/* Category */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Klasifikasi</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5">Kategori / Topik</label>
                <select 
                  {...form.register("category")}
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm text-gray-800 dark:text-gray-200 focus:outline-none focus:border-[#0A2C74] focus:ring-1 focus:ring-[#0A2C74]"
                >
                  <option value="">Pilih Kategori...</option>
                  {NEWS_CATEGORIES.map(c => <option value={c} key={c}>{c}</option>)}
                </select>
                {errors.category && <p className="text-[#E62129] text-xs mt-1.5">{errors.category.message}</p>}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
