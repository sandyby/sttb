"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowLeft, Save, Plus, X, GripVertical, Loader2 } from "lucide-react";
import Link from "next/link";
import type { AdmissionWave, AdmissionWaveStep, CreateAdmissionWavePayload } from "@/types/admission";

// ─── Schema ──────────────────────────────────────────────────────────────────

const admissionWaveSchema = z.object({
  waveNumber: z.string().min(1, "Wajib diisi").max(20),
  label: z.string().min(1, "Wajib diisi").max(100),
  deadline: z.string().min(1, "Wajib diisi").max(200),
  status: z.enum(["open", "closed", "upcoming"]),
  color: z.string().min(1, "Wajib diisi").max(20),
  psikotesSchedule: z.string().max(300).optional().or(z.literal("")),
  tertulisSchedule: z.string().max(300).optional().or(z.literal("")),
  wawancaraSchedule: z.string().max(300).optional().or(z.literal("")),
  displayOrder: z.number().int().min(0),
  isActive: z.boolean(),
});

type WaveFormValues = z.infer<typeof admissionWaveSchema>;

interface AdmissionWaveFormProps {
  initialData?: AdmissionWave | null;
  onSaveAction: (data: CreateAdmissionWavePayload) => Promise<void>;
  backHref: string;
  isEditing?: boolean;
}

// ─── Field wrapper ────────────────────────────────────────────────────────────

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

// ─── Steps editor ─────────────────────────────────────────────────────────────

function StepsEditor({
  steps,
  onChange,
}: {
  steps: AdmissionWaveStep[];
  onChange: (steps: AdmissionWaveStep[]) => void;
}) {
  const [newTitle, setNewTitle] = useState("");
  const [newWhen, setNewWhen] = useState("");
  const [newVia, setNewVia] = useState("");

  const addStep = () => {
    if (!newTitle.trim()) return;
    const step: AdmissionWaveStep = {
      stepNumber: steps.length + 1,
      title: newTitle.trim(),
      whenText: newWhen.trim(),
      via: newVia.trim(),
    };
    onChange([...steps, step]);
    setNewTitle("");
    setNewWhen("");
    setNewVia("");
  };

  const removeStep = (idx: number) => {
    const updated = steps
      .filter((_, i) => i !== idx)
      .map((s, i) => ({ ...s, stepNumber: i + 1 }));
    onChange(updated);
  };

  const updateStep = (idx: number, field: keyof AdmissionWaveStep, value: string | number) => {
    const updated = steps.map((s, i) => (i === idx ? { ...s, [field]: value } : s));
    onChange(updated);
  };

  return (
    <div className="space-y-3">
      {steps.map((step, idx) => (
        <div
          key={idx}
          className="flex gap-2 items-start bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3 border border-gray-100 dark:border-gray-700"
        >
          <div className="flex items-center gap-1.5 flex-shrink-0 mt-2">
            <GripVertical className="w-3.5 h-3.5 text-gray-300" />
            <span className="w-6 h-6 rounded-full bg-[#E62129] text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
              {step.stepNumber}
            </span>
          </div>
          <div className="flex-1 grid sm:grid-cols-3 gap-2">
            <input
              value={step.title}
              onChange={(e) => updateStep(idx, "title", e.target.value)}
              placeholder="Judul aktivitas"
              className={inputCls + " sm:col-span-3"}
            />
            <input
              value={step.whenText}
              onChange={(e) => updateStep(idx, "whenText", e.target.value)}
              placeholder="Jadwal (mis. Oktober, minggu ketiga)"
              className={inputCls + " sm:col-span-2"}
            />
            <input
              value={step.via}
              onChange={(e) => updateStep(idx, "via", e.target.value)}
              placeholder="Metode (mis. Via Zoom)"
              className={inputCls}
            />
          </div>
          <button
            type="button"
            onClick={() => removeStep(idx)}
            className="mt-2 p-1 rounded text-gray-400 hover:text-[#E62129] hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors flex-shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}

      {/* Add new step */}
      <div className="border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-lg p-3 space-y-2">
        <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Tambah Aktivitas Baru</p>
        <input
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addStep(); } }}
          placeholder="Judul aktivitas *"
          className={inputCls}
        />
        <div className="grid sm:grid-cols-2 gap-2">
          <input
            value={newWhen}
            onChange={(e) => setNewWhen(e.target.value)}
            placeholder="Jadwal (mis. Oktober, minggu ketiga)"
            className={inputCls}
          />
          <input
            value={newVia}
            onChange={(e) => setNewVia(e.target.value)}
            placeholder="Metode (mis. Via Zoom)"
            className={inputCls}
          />
        </div>
        <button
          type="button"
          onClick={addStep}
          disabled={!newTitle.trim()}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#E62129] text-white text-xs font-medium hover:bg-[#c4131a] disabled:opacity-40 transition-colors"
        >
          <Plus className="w-3.5 h-3.5" /> Tambah
        </button>
      </div>
    </div>
  );
}

// ─── Main Form ────────────────────────────────────────────────────────────────

export function AdmissionWaveForm({
  initialData,
  onSaveAction,
  backHref,
  isEditing,
}: AdmissionWaveFormProps) {
  const [steps, setSteps] = useState<AdmissionWaveStep[]>(initialData?.steps ?? []);
  const [isSaving, setIsSaving] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<WaveFormValues>({
    resolver: zodResolver(admissionWaveSchema),
    defaultValues: {
      waveNumber: initialData?.waveNumber ?? "",
      label: initialData?.label ?? "",
      deadline: initialData?.deadline ?? "",
      status: (initialData?.status as "open" | "closed" | "upcoming") ?? "upcoming",
      color: initialData?.color ?? "#0A2C74",
      psikotesSchedule: initialData?.psikotesSchedule ?? "",
      tertulisSchedule: initialData?.tertulisSchedule ?? "",
      wawancaraSchedule: initialData?.wawancaraSchedule ?? "",
      displayOrder: initialData?.displayOrder ?? 0,
      isActive: initialData?.isActive ?? true,
    },
  });

  const isActive = watch("isActive");

  const onSubmit = async (values: WaveFormValues) => {
    setIsSaving(true);
    try {
      await onSaveAction({ ...values, steps });
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
              {isEditing ? "Edit Gelombang" : "Tambah Gelombang Baru"}
            </h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">Jadwal Admisi STTB</p>
          </div>
        </div>
        <button
          type="submit"
          disabled={isSaving}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#E62129] text-white text-sm font-medium hover:bg-[#c4131a] disabled:opacity-50 transition-colors"
        >
          {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {isSaving ? "Menyimpan..." : isEditing ? "Perbarui" : "Simpan"}
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left: main fields */}
        <div className="lg:col-span-2 space-y-5">
          {/* Wave info */}
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-5 space-y-4">
            <h2 className="text-sm font-semibold text-gray-900 dark:text-white">Info Gelombang</h2>

            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Nomor Gelombang" required error={errors.waveNumber?.message}>
                <input
                  {...register("waveNumber")}
                  className={inputCls}
                  placeholder="I"
                />
              </Field>
              <Field label="Label" required error={errors.label?.message}>
                <input
                  {...register("label")}
                  className={inputCls}
                  placeholder="Gelombang I"
                />
              </Field>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Batas Pendaftaran" required error={errors.deadline?.message}>
                <input
                  {...register("deadline")}
                  className={inputCls}
                  placeholder="13 Oktober 2025"
                />
              </Field>
              <Field label="Status" required error={errors.status?.message}>
                <select {...register("status")} className={inputCls}>
                  <option value="upcoming">Akan Datang (Terbuka)</option>
                  <option value="open">Sedang Berjalan</option>
                  <option value="closed">Ditutup</option>
                </select>
              </Field>
            </div>

            <Field label="Warna Aksen (Hex)" required error={errors.color?.message}>
              <div className="flex gap-2 items-center">
                <input
                  {...register("color")}
                  className={inputCls}
                  placeholder="#0A2C74"
                />
                <input
                  type="color"
                  value={watch("color")}
                  onChange={(e) => {
                    const input = document.querySelector<HTMLInputElement>('input[name="color"]');
                    if (input) { input.value = e.target.value; input.dispatchEvent(new Event("input", { bubbles: true })); }
                  }}
                  className="w-10 h-10 rounded-lg border border-gray-200 dark:border-gray-700 cursor-pointer flex-shrink-0"
                />
              </div>
            </Field>
          </div>

          {/* Test schedules */}
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-5 space-y-4">
            <h2 className="text-sm font-semibold text-gray-900 dark:text-white">Jadwal Tes</h2>
            <Field label="Jadwal Psikotes" error={errors.psikotesSchedule?.message}>
              <input
                {...register("psikotesSchedule")}
                className={inputCls}
                placeholder="17–18, 20, 27–29 Okt"
              />
            </Field>
            <Field label="Jadwal Tes Tertulis" error={errors.tertulisSchedule?.message}>
              <input
                {...register("tertulisSchedule")}
                className={inputCls}
                placeholder="21 Oktober"
              />
            </Field>
            <Field label="Jadwal Wawancara" error={errors.wawancaraSchedule?.message}>
              <input
                {...register("wawancaraSchedule")}
                className={inputCls}
                placeholder="20 November"
              />
            </Field>
          </div>

          {/* Steps editor */}
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-gray-900 dark:text-white">Aktivitas Penerimaan</h2>
              <span className="text-xs text-gray-400">{steps.length} aktivitas</span>
            </div>
            <StepsEditor steps={steps} onChange={setSteps} />
          </div>
        </div>

        {/* Right: settings */}
        <div className="space-y-5">
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

          {/* Preview card */}
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-5 space-y-3">
            <h2 className="text-sm font-semibold text-gray-900 dark:text-white">Preview Kartu</h2>
            <div
              className="rounded-xl border-2 p-4"
              style={{ borderColor: watch("color") || "#0A2C74" }}
            >
              <span
                className="text-xs font-bold uppercase tracking-widest px-2.5 py-1 rounded-full inline-block mb-2"
                style={{
                  backgroundColor: `${watch("color") || "#0A2C74"}20`,
                  color: watch("color") || "#0A2C74",
                }}
              >
                {watch("label") || "Gelombang ?"}
              </span>
              <p className="text-xs text-gray-500 mb-0.5">Batas pendaftaran</p>
              <p className="text-sm font-bold text-gray-900 dark:text-white">
                {watch("deadline") || "—"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
