"use client";

import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { motion, AnimatePresence } from "motion/react";
import { Upload, X, ImageIcon, Film, Loader2, Plus } from "lucide-react";
import { CreateCategoryDialog } from "@/components/shared/CreateCategoryDialog";
import { useCreateMediaCategory } from "@/hooks/useMedia";
import {
    createMediaSchema,
    type CreateMediaFormValues,
} from "@/libs/schemas/media-schema";
import { useCreateMedia, useMediaCategories } from "@/hooks/useMedia";
import { useUploadImage } from "@/hooks/useUpload";

interface UploadMediaDialogProps {
    isOpen: boolean;
    onClose: () => void;
}

export function UploadMediaDialog({ isOpen, onClose }: UploadMediaDialogProps) {
    const [file, setFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [dragOver, setDragOver] = useState(false);
    const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const { mutateAsync: uploadImage, isPending: isUploadingImage } = useUploadImage();
    const { mutateAsync: createMedia, isPending: isCreating } = useCreateMedia();

    const isUploadingAny = isUploadingImage;

    const form = useForm<CreateMediaFormValues>({
        resolver: zodResolver(createMediaSchema),
        defaultValues: {
            title: "",
            url: "",
            type: "video",
            categoryId: "", // Default empty string
            tag: "",
        },
    });

    const { data: categories } = useMediaCategories();

    const handleFileSelect = (selectedFile: File | null) => {
        if (!selectedFile) return;

        // Only allow image for thumbnails
        const isImage = selectedFile.type.startsWith("image/");

        if (!isImage) {
            toast.error("Format file tidak didukung. Mohon upload gambar untuk thumbnail.");
            return;
        }

        setFile(selectedFile);

        // Set title to filename without extension if empty
        if (!form.getValues("title")) {
            form.setValue("title", selectedFile.name.replace(/\.[^/.]+$/, ""));
        }

        // Create local preview URL
        if (previewUrl) URL.revokeObjectURL(previewUrl);
        setPreviewUrl(URL.createObjectURL(selectedFile));
    };

    const onSubmit = async (data: CreateMediaFormValues) => {
        if (!data.url) {
            toast.error("Mohon isi URL/Link Media");
            return;
        }

        try {
            // 1. Upload file (thumbnail) first if selected
            let uploadedThumbnail = "";
            if (file) {
                const res = await uploadImage({ file, uploadType: "media" });
                uploadedThumbnail = res.url;
            }

            // 2. Submit the created media
            await createMedia({
                ...data,
                url: data.url!,
                categoryId: data.categoryId === "" ? null : data.categoryId,
                thumbnailUrl: uploadedThumbnail || undefined,
            });

            toast.success("Media berhasil ditambahkan");
            handleClose();
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Gagal menambahkan media");
        }
    };

    const handleClose = () => {
        if (previewUrl) URL.revokeObjectURL(previewUrl);
        setFile(null);
        setPreviewUrl(null);
        form.reset();
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={isUploadingAny || isCreating ? undefined : handleClose}
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        className="relative w-full max-w-2xl bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-full"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-800">
                            <div>
                                <h2 className="text-lg font-bold text-gray-900 dark:text-white">Upload Media Baru</h2>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Tambahkan gambar atau video ke galeri</p>
                            </div>
                            <button
                                onClick={handleClose}
                                disabled={isUploadingAny || isCreating}
                                className="p-2 -mr-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors disabled:opacity-50"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Form */}
                        <div className="flex-1 overflow-y-auto p-6">
                            <form id="media-upload-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                                {/* File Dropzone */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Cover / Thumbnail (Opsional)
                                    </label>

                                    {!file ? (
                                        <div
                                            className={`border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer ${dragOver ? "border-[#E62129] bg-red-50 dark:bg-red-900/10" : "border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-500"}`}
                                            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                                            onDragLeave={() => setDragOver(false)}
                                            onDrop={(e) => { e.preventDefault(); setDragOver(false); handleFileSelect(e.dataTransfer.files?.[0] || null); }}
                                            onClick={() => fileInputRef.current?.click()}
                                        >
                                            <ImageIcon className="w-8 h-8 text-gray-400 mx-auto mb-3" />
                                            <p className="text-sm font-medium text-gray-900 dark:text-gray-200">Klik untuk upload atau seret gambar kesini</p>
                                            <p className="text-xs text-gray-500 mt-1">Mendukung Gambar (Max 10MB)</p>
                                        </div>
                                    ) : (
                                        <div className="relative border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden bg-gray-50 dark:bg-gray-800/50">
                                            {previewUrl ? (
                                                <div className="aspect-video relative bg-black/5">
                                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                                    <img src={previewUrl} alt="Preview" className="w-full h-full object-contain" />
                                                </div>
                                            ) : (
                                                <div className="aspect-video flex flex-col items-center justify-center gap-3">
                                                    <Film className="w-12 h-12 text-gray-400" />
                                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-300">{file.name}</p>
                                                </div>
                                            )}

                                            <button
                                                type="button"
                                                onClick={() => { setFile(null); setPreviewUrl(null); }}
                                                className="absolute top-2 right-2 p-1.5 bg-white/90 dark:bg-gray-900/90 hover:bg-white dark:hover:bg-gray-900 text-gray-700 dark:text-gray-300 rounded-lg shadow-sm backdrop-blur-sm transition-all"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>
                                    )}

                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={(e) => handleFileSelect(e.target.files?.[0] || null)}
                                    />
                                </div>

                                {/* Metadata fields */}
                                <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                                                Judul Media <span className="text-[#E62129]">*</span>
                                            </label>
                                            <input
                                                {...form.register("title")}
                                                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#E62129]/30 focus:border-[#E62129] transition-all"
                                                placeholder="Contoh: Ibadah Chapel 2026"
                                            />
                                            {form.formState.errors.title && (
                                                <p className="text-[#E62129] text-xs mt-1">{form.formState.errors.title.message}</p>
                                            )}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                                                Tipe Media <span className="text-[#E62129]">*</span>
                                            </label>
                                            <select
                                                {...form.register("type")}
                                                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#E62129]/30 focus:border-[#E62129] transition-all capitalize"
                                            >
                                                <option value="video">Video</option>
                                                <option value="article">Article</option>
                                            </select>
                                            {form.formState.errors.type && (
                                                <p className="text-[#E62129] text-xs mt-1">{form.formState.errors.type.message}</p>
                                            )}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                                            Link URL <span className="text-[#E62129]">*</span>
                                        </label>
                                        <input
                                            {...form.register("url")}
                                            type="url"
                                            className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#E62129]/30 focus:border-[#E62129] transition-all"
                                            placeholder="https://youtube.com/... atau https://..."
                                        />
                                        {form.formState.errors.url && (
                                            <p className="text-[#E62129] text-xs mt-1">{form.formState.errors.url.message}</p>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                                                Kategori (Opsional)
                                            </label>
                                            <div className="flex gap-2">
                                                <select
                                                    {...form.register("categoryId")}
                                                    className="flex-1 px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#E62129]/30 focus:border-[#E62129] transition-all"
                                                >
                                                    <option value="">-- Tidak dikategorikan --</option>
                                                    {categories?.map((c) => (
                                                        <option key={c.id} value={c.id}>{c.name}</option>
                                                    ))}
                                                </select>
                                                <button
                                                    type="button"
                                                    onClick={() => setIsCategoryDialogOpen(true)}
                                                    className="p-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                                                >
                                                    <Plus className="w-5 h-5 text-gray-500" />
                                                </button>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                                                Tag (Opsional)
                                            </label>
                                            <input
                                                {...form.register("tag")}
                                                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#E62129]/30 focus:border-[#E62129] transition-all"
                                                placeholder="Contoh: banner, featured"
                                            />
                                        </div>
                                    </div>

                                </div>
                            </form>
                        </div>

                        {/* Footer */}
                        <div className="px-6 py-4 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={handleClose}
                                disabled={isUploadingAny || isCreating}
                                className="px-5 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
                            >
                                Batal
                            </button>
                            <button
                                type="submit"
                                form="media-upload-form"
                                disabled={isUploadingAny || isCreating}
                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#E62129] text-white text-sm font-medium hover:bg-[#c4131a] transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-sm shadow-[#E62129]/20"
                            >
                                {isUploadingAny ? (
                                    <><Loader2 className="w-4 h-4 animate-spin" /> Mengupload...</>
                                ) : isCreating ? (
                                    <><Loader2 className="w-4 h-4 animate-spin" /> Menyimpan...</>
                                ) : (
                                    <><Upload className="w-4 h-4" /> Simpan Media</>
                                )}
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
            
            <CreateCategoryDialog
                isOpen={isCategoryDialogOpen}
                onCloseAction={() => setIsCategoryDialogOpen(false)}
                onSuccessAction={(category) => {
                    form.setValue("categoryId", category.id);
                }}
                title="Tambah Kategori Media"
                mutationHookAction={useCreateMediaCategory}
            />
        </AnimatePresence>
    );
}
