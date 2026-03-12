"use client";

import { useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ArrowLeft, Save, Plus, X, Upload, Loader2, Trash2, Award } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { getImageUrl } from "@/libs/api";
import { useUploadImage } from "@/hooks/useUpload";
import { Textarea } from "@/components/ui/textarea";
import {
    Scholarship,
    CreateScholarshipRequest
} from "@/types/scholarship";

// ─── Schema ──────────────────────────────────────────────────────────────────

const scholarshipSchema = z.object({
    name: z.string().min(1, "Nama beasiswa wajib diisi"),
    level: z.string().min(1, "Jenjang wajib diisi"),
    color: z.string().regex(/^#[0-9A-Fa-f]{6}$/, "Warna harus format hex (misal: #E62129)"),
    imageUrl: z.string().optional().nullable(),
    description: z.string().min(1, "Deskripsi wajib diisi"),
    requirements: z.array(z.string().min(1)).min(1, "Minimal satu persyaratan"),
    displayOrder: z.number().int().min(0),
    isActive: z.boolean(),
});

type ScholarshipFormValues = z.infer<typeof scholarshipSchema>;

interface ScholarshipFormProps {
    initialData?: Scholarship | null;
    onSubmitAction: (data: CreateScholarshipRequest) => Promise<void>;
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

export default function ScholarshipForm({
    initialData,
    onSubmitAction,
    isPending,
    backHref
}: ScholarshipFormProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { mutateAsync: uploadImage, isPending: isUploading } = useUploadImage();

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<ScholarshipFormValues>({
        resolver: zodResolver(scholarshipSchema),
        defaultValues: initialData ? {
            name: initialData.name,
            level: initialData.level,
            color: initialData.color,
            imageUrl: initialData.imageUrl ?? "",
            description: initialData.description,
            requirements: initialData.requirements,
            displayOrder: initialData.displayOrder,
            isActive: initialData.isActive,
        } : {
            name: "",
            level: "S1",
            color: "#E62129",
            imageUrl: "",
            description: "",
            requirements: ["", ""],
            displayOrder: 0,
            isActive: true,
        },
    });

    const requirements = watch("requirements");
    const addReq = () => setValue("requirements", [...requirements, ""]);
    const removeReq = (i: number) => setValue("requirements", requirements.filter((_, idx) => idx !== i));
    const updateReq = (i: number, val: string) => {
        const next = [...requirements];
        next[i] = val;
        setValue("requirements", next);
    };

    const isActive = watch("isActive");
    const imageUrl = watch("imageUrl");

    const handleImageUpload = async (file: File) => {
        const res = await uploadImage({ file, uploadType: "scholarships" });
        setValue("imageUrl", res.url);
    };

    const onSubmit = (values: ScholarshipFormValues) => {
        onSubmitAction({
            ...values,
            imageUrl: values.imageUrl || undefined,
        });
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
                            {initialData ? "Edit Beasiswa" : "Tambah Beasiswa Baru"}
                        </h1>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Pengaturan Beasiswa STTB</p>
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
                    {/* Basic Info */}
                    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-5 space-y-4">
                        <h2 className="text-sm font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                            <Award className="w-4 h-4 text-[#E62129]" />
                            Informasi Dasar
                        </h2>

                        <Field label="Nama Beasiswa" required error={errors.name?.message}>
                            <input
                                {...register("name")}
                                className={inputCls}
                                placeholder="E.g. Beasiswa Pastor Scholar"
                            />
                        </Field>

                        <div className="grid sm:grid-cols-2 gap-4">
                            <Field label="Jenjang" required error={errors.level?.message}>
                                <input
                                    {...register("level")}
                                    className={inputCls}
                                    placeholder="E.g. S1, S1 – S2"
                                />
                            </Field>

                            <Field label="Warna Branding (Hex)" required error={errors.color?.message}>
                                <div className="flex gap-2">
                                    <input
                                        type="color"
                                        {...register("color")}
                                        className="h-9 w-12 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-0.5 cursor-pointer flex-shrink-0"
                                    />
                                    <input
                                        {...register("color")}
                                        className={inputCls}
                                        placeholder="#E62129"
                                    />
                                </div>
                            </Field>
                        </div>

                        <Field label="Deskripsi Singkat" required error={errors.description?.message}>
                            <Textarea
                                {...register("description")}
                                rows={4}
                                className={inputCls}
                                placeholder="Jelaskan tentang beasiswa ini..."
                            />
                        </Field>
                    </div>

                    {/* Requirements */}
                    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-5 space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-sm font-semibold text-gray-900 dark:text-white">Persyaratan</h2>
                            <button
                                type="button"
                                onClick={addReq}
                                className="inline-flex items-center gap-1.5 text-[#E62129] text-xs font-bold hover:underline"
                            >
                                <Plus className="w-3.5 h-3.5" /> TAMBAH
                            </button>
                        </div>

                        <div className="space-y-3">
                            {requirements.map((req, index) => (
                                <div key={index} className="flex gap-2">
                                    <div className="bg-gray-50 dark:bg-gray-800 text-gray-500 font-medium text-xs rounded-lg flex items-center justify-center px-3 border border-gray-200 dark:border-gray-700 flex-shrink-0">
                                        {index + 1}
                                    </div>
                                    <input
                                        value={req}
                                        onChange={(e) => updateReq(index, e.target.value)}
                                        className={inputCls}
                                        placeholder="Masukkan persyaratan..."
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeReq(index)}
                                        disabled={requirements.length <= 1}
                                        className="p-2.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors flex-shrink-0 border border-transparent disabled:opacity-50 disabled:hover:bg-transparent"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                            {errors.requirements && (
                                <p className="text-xs text-red-500">{errors.requirements.message}</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right: Photo + Settings */}
                <div className="space-y-5">
                    {/* Photo */}
                    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-5 space-y-4">
                        <h2 className="text-sm font-semibold text-gray-900 dark:text-white">Gambar Beasiswa</h2>

                        {imageUrl ? (
                            <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 group">
                                <Image
                                    src={getImageUrl(imageUrl) ?? imageUrl}
                                    alt="Preview"
                                    fill
                                    className="object-cover"
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
                                className="w-full aspect-video rounded-lg bg-gray-50 dark:bg-gray-800 flex flex-col items-center justify-center border-2 border-dashed border-gray-200 dark:border-gray-700 hover:border-[#E62129] hover:bg-gray-100 dark:hover:bg-gray-750 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isUploading ? (
                                    <>
                                        <Loader2 className="w-8 h-8 mb-2 text-[#E62129] animate-spin" />
                                        <p className="text-xs text-gray-500">Mengupload...</p>
                                    </>
                                ) : (
                                    <>
                                        <Upload className="w-8 h-8 mb-2 text-gray-400" />
                                        <p className="text-xs text-gray-500 font-medium">Klik untuk upload gambar</p>
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
                                Ganti Gambar
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

                    {/* Settings */}
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
