import type { ElementType } from "react";
import { FileText, BookOpen, Users, CheckCircle, Mail, Monitor, Video, User } from "lucide-react";

// ── Registration Steps ───────────────────────────────────────────────────
export const admisiSteps = [
  {
    step: 1,
    title: "Registrasi Online",
    subtitle: "Buka portal & isi formulir",
    desc: "Isi formulir pendaftaran online melalui portal admisi STTB. Siapkan data diri, informasi gereja asal, dan pernyataan motivasi pelayanan Anda.",
    icon: FileText,
    color: "#E62129",
    tip: "Siapkan email aktif yang sering Anda cek untuk notifikasi.",
  },
  {
    step: 2,
    title: "Pengumpulan Berkas",
    subtitle: "Lengkapi & kirim dokumen",
    desc: "Kirimkan berkas persyaratan yang diperlukan ke kantor STTB melalui pos atau upload melalui portal. Pastikan semua berkas lengkap, valid, dan sudah dilegalisir.",
    icon: BookOpen,
    color: "#0570CD",
    tip: "Scan dokumen dengan resolusi minimal 300 DPI agar terbaca jelas.",
  },
  {
    step: 3,
    title: "Tes & Wawancara",
    subtitle: "Psikotes, tertulis, & pastoral",
    desc: "Ikuti rangkaian tes: psikotes online, tes tertulis akademik, dan wawancara pastoral dengan dosen STTB. Tes dapat dilakukan secara online via Zoom.",
    icon: Users,
    color: "#0A2C74",
    tip: "Siapkan Alkitab dan dokumen motivasi untuk sesi wawancara pastoral.",
  },
  {
    step: 4,
    title: "Pengumuman & Registrasi",
    subtitle: "Cek hasil & daftar ulang",
    desc: "Cek pengumuman hasil seleksi via email & WhatsApp. Jika diterima, lakukan registrasi ulang dan pembayaran biaya pendidikan sesuai jadwal yang ditentukan.",
    icon: CheckCircle,
    color: "#E62129",
    tip: "Simpan email penerimaan dan nomor mahasiswa Anda dengan baik.",
  },
];

// ── Requirements ─────────────────────────────────────────────────────────
export const admisiRequirements = {
  s1: [
    "Fotokopi ijazah SMA/sederajat yang telah dilegalisir",
    "Fotokopi raport kelas XII semester 1 & 2",
    "Surat rekomendasi dari pendeta/gembala gereja setempat",
    "Surat keterangan sehat dari dokter",
    "Pas foto terbaru 3×4 sebanyak 4 lembar",
    "Fotokopi KTP/kartu identitas",
    "Pernyataan motivasi (statement of faith & calling)",
    "Surat pernyataan kesediaan mengikuti tata tertib STTB",
  ],
  s2: [
    "Fotokopi ijazah S1 teologi atau bidang terkait yang dilegalisir",
    "Transkrip nilai dengan IPK minimal 2.75",
    "Surat rekomendasi dari dua tokoh gereja atau akademisi",
    "Proposal penelitian atau rencana studi",
    "Curriculum vitae lengkap dengan pengalaman pelayanan",
    "Surat keterangan sehat dari dokter",
    "Pas foto terbaru 3×4 sebanyak 4 lembar",
    "Pernyataan motivasi studi lanjut",
  ],
};

// ── Method Icons ─────────────────────────────────────────────────────────
export const methodIcons: Record<string, ElementType> = {
  "Via Zoom & website": Video,
  "Via Zoom": Video,
  "Via website": Monitor,
  "Via email & WhatsApp": Mail,
  "Via pos atau e-mail": Mail,
  "Onsite": User,
  "Via e-mail & WhatsApp": Mail,
};

// ── Admission Waves (full detail — shared with JadwalAdmisiPage) ──────────
export const admisiWaves = [
  {
    id: "I",
    label: "Gelombang I",
    deadline: "13 Oktober 2025",
    status: "closed" as const,
    color: "#E62129",
    tests: {
      psikotes: "17–18, 20, 27–29 Okt",
      tertulis: "21 Oktober",
      wawancara: "20 November",
    },
    steps: [
      { no: 1, title: "Batas Pengembalian Formulir", when: "Oktober, Senin minggu ketiga", via: "Via pos atau e-mail" },
      { no: 2, title: "Seleksi Dokumen Pendaftaran", when: "Oktober, Selasa minggu ketiga", via: "Onsite" },
      { no: 3, title: "Panggilan Tes", when: "Oktober, Rabu minggu ketiga", via: "Via email & WhatsApp" },
      { no: 4, title: "Psikotes Online Tahap 1 (Pengisian Form)", when: "Oktober, Jumat–Sabtu minggu ketiga", via: "Via website" },
      { no: 5, title: "Psikotes Online Tahap 2 (Tes Bersama)", when: "Oktober, Senin minggu keempat", via: "Via Zoom & website" },
      { no: 6, title: "Tes Tertulis Online (Teologi, Bahasa Indonesia, Bahasa Inggris)", when: "Oktober, Selasa minggu keempat", via: "Via Zoom & website" },
      { no: 7, title: "Psikotes Tahap 3 (Wawancara Psikolog)", when: "Oktober, Senin minggu ketiga", via: "Via Zoom" },
      { no: 8, title: "Wawancara dengan Dosen STTB", when: "November, Senin minggu ketiga", via: "Via Zoom" },
      { no: 9, title: "Pengumuman Hasil Penerimaan", when: "November, Rabu–Jumat minggu keempat", via: "Via e-mail & WhatsApp" },
    ],
  },
  {
    id: "II",
    label: "Gelombang II",
    deadline: "2 Februari 2026",
    status: "closed" as const,
    color: "#0A2C74",
    tests: {
      psikotes: "6–7, 9, 16–18 Februari",
      tertulis: "10 Februari",
      wawancara: "3 Maret",
    },
    steps: [
      { no: 1, title: "Batas Pengembalian Formulir", when: "Maret, Senin minggu ketiga", via: "Via pos atau e-mail" },
      { no: 2, title: "Seleksi Dokumen Pendaftaran", when: "Maret, Selasa minggu ketiga", via: "Onsite" },
      { no: 3, title: "Panggilan Tes", when: "Maret, Rabu minggu ketiga", via: "Via email & WhatsApp" },
      { no: 4, title: "Psikotes Online Tahap 1 (Pengisian Form)", when: "Maret, Jumat–Sabtu minggu ketiga", via: "Via website" },
      { no: 5, title: "Psikotes Online Tahap 2 (Tes Bersama)", when: "Maret, Senin minggu keempat", via: "Via Zoom & website" },
      { no: 6, title: "Tes Tertulis Online (Teologi, Bahasa Indonesia, Bahasa Inggris)", when: "Maret, Selasa minggu keempat", via: "Via Zoom & website" },
      { no: 7, title: "Psikotes Tahap 3 (Wawancara Psikolog)", when: "April, Senin–Kamis minggu pertama", via: "Via Zoom" },
      { no: 8, title: "Wawancara dengan Dosen STTB", when: "April, Senin minggu ketiga", via: "Via Zoom" },
      { no: 9, title: "Pengumuman Hasil Penerimaan", when: "April, Rabu–Jumat minggu keempat", via: "Via e-mail & WhatsApp" },
    ],
  },
  {
    id: "III",
    label: "Gelombang III",
    deadline: "27 April 2026",
    status: "upcoming" as const,
    color: "#0570CD",
    tests: {
      psikotes: "1–2, 4, 11–12 Mei",
      tertulis: "5 Mei",
      wawancara: "26 & 28 Mei",
    },
    steps: [
      { no: 1, title: "Batas Pengembalian Formulir", when: "Mei, Senin minggu ketiga", via: "Via pos atau e-mail" },
      { no: 2, title: "Seleksi Dokumen Pendaftaran", when: "Mei, Selasa minggu ketiga", via: "Onsite" },
      { no: 3, title: "Panggilan Tes", when: "Mei, Rabu minggu ketiga", via: "Via email & WhatsApp" },
      { no: 4, title: "Psikotes Online Tahap 1 (Pengisian Form)", when: "Mei, Jumat–Sabtu minggu ketiga", via: "Via website" },
      { no: 5, title: "Psikotes Online Tahap 2 (Tes Bersama)", when: "Mei, Senin minggu keempat", via: "Via Zoom & website" },
      { no: 6, title: "Tes Tertulis Online (Teologi, Bahasa Indonesia, Bahasa Inggris)", when: "Mei, Selasa minggu keempat", via: "Via Zoom & website" },
      { no: 7, title: "Psikotes Tahap 3 (Wawancara Psikolog)", when: "Juni, Senin–Kamis minggu pertama", via: "Via Zoom" },
      { no: 8, title: "Wawancara dengan Dosen STTB", when: "Juni, Senin minggu ketiga", via: "Via Zoom" },
      { no: 9, title: "Pengumuman Hasil Penerimaan", when: "Juni, Rabu–Jumat minggu keempat", via: "Via e-mail & WhatsApp" },
    ],
  },
];

// ── Contact Info ──────────────────────────────────────────────────────────
export const admisiContact = {
  phone: "0815 7336 0009",
  phoneTel: "tel:081573360009",
  email: "admisi@sttb.ac.id",
  emailBeasiswa: "beasiswa@sttb.ac.id",
  portalUrl: "http://sis.sttb.ac.id/pmb/formulir-pendaftaran.html",
};