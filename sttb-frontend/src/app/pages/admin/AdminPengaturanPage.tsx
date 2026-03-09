import React, { useState } from "react";
import { Save, Globe, Mail, Phone, MapPin, Facebook, Instagram, Youtube, Twitter, Bell, Shield, Database, Palette, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

const tabs = [
  { id: "umum", label: "Umum", icon: Globe },
  { id: "kontak", label: "Kontak", icon: Phone },
  { id: "sosmed", label: "Media Sosial", icon: Facebook },
  { id: "notifikasi", label: "Notifikasi", icon: Bell },
  { id: "keamanan", label: "Keamanan", icon: Shield },
];

export function AdminPengaturanPage() {
  const [activeTab, setActiveTab] = useState("umum");
  const [showPassword, setShowPassword] = useState(false);

  const [umum, setUmum] = useState({
    siteName: "Sekolah Tinggi Teologi Bandung",
    siteTagline: "Domino Optimo Maximo",
    description: "Institusi pendidikan teologi yang mempersiapkan pastor-scholar yang transformatif.",
    logoUrl: "",
    faviconUrl: "",
    primaryColor: "#E62129",
    secondaryColor: "#0A2C74",
    accentColor: "#0570CD",
    maintenanceMode: false,
    analyticsId: "",
  });

  const [kontak, setKontak] = useState({
    address: "Jl. Bogor No. 21, Bandung, Jawa Barat 40272",
    phone: "+62 22 7300-XXX",
    admisiPhone: "0815 7336 0009",
    email: "info@sttb.ac.id",
    admisiEmail: "admisi@sttb.ac.id",
    beasiswaEmail: "beasiswa@sttb.ac.id",
    mapEmbedUrl: "https://maps.google.com/?q=Sekolah+Tinggi+Teologi+Bandung",
  });

  const [sosmed, setSosmed] = useState({
    facebook: "https://facebook.com/sttbandung",
    instagram: "https://instagram.com/sttbandung",
    youtube: "https://youtube.com/@sttbandung",
    twitter: "",
  });

  const [notifikasi, setNotifikasi] = useState({
    emailNewSubmission: true,
    emailNewComment: false,
    emailNewUser: true,
    admisiReminderDays: 7,
    digestFrequency: "weekly",
  });

  const [keamanan, setKeamanan] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    twoFactorEnabled: false,
    sessionTimeout: 60,
    loginAttempts: 5,
  });

  const handleSave = (section: string) => {
    toast.success(`Pengaturan ${section} berhasil disimpan`);
  };

  const inputClass = "w-full border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#E62129]";
  const labelClass = "block text-gray-700 dark:text-gray-300 text-sm font-medium mb-1";

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-gray-900 dark:text-white font-bold text-2xl">Pengaturan</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-0.5">Konfigurasi website dan sistem STTB</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-5">
        {/* Sidebar */}
        <div className="lg:w-48 flex-shrink-0">
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-2 space-y-0.5">
            {tabs.map((t) => {
              const Icon = t.icon;
              return (
                <button key={t.id} onClick={() => setActiveTab(t.id)} className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm transition-colors text-left ${activeTab === t.id ? "bg-[#E62129] text-white" : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"}`}>
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  {t.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-6">
          {/* UMUM */}
          {activeTab === "umum" && (
            <div className="space-y-5">
              <h2 className="text-gray-900 dark:text-white font-bold text-lg border-b border-gray-100 dark:border-gray-800 pb-3">Pengaturan Umum</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Nama Situs</label>
                  <input className={inputClass} value={umum.siteName} onChange={(e) => setUmum((u) => ({ ...u, siteName: e.target.value }))} />
                </div>
                <div>
                  <label className={labelClass}>Tagline</label>
                  <input className={inputClass} value={umum.siteTagline} onChange={(e) => setUmum((u) => ({ ...u, siteTagline: e.target.value }))} />
                </div>
              </div>
              <div>
                <label className={labelClass}>Deskripsi Situs</label>
                <textarea rows={3} className={`${inputClass} resize-none`} value={umum.description} onChange={(e) => setUmum((u) => ({ ...u, description: e.target.value }))} />
              </div>
              <div>
                <label className={labelClass}>Palet Warna</label>
                <div className="flex items-center gap-4 flex-wrap">
                  {[
                    { label: "Primary (Merah)", key: "primaryColor" },
                    { label: "Secondary (Navy)", key: "secondaryColor" },
                    { label: "Accent (Biru)", key: "accentColor" },
                  ].map((c) => (
                    <div key={c.key} className="flex items-center gap-2">
                      <input type="color" value={(umum as Record<string, string>)[c.key]} onChange={(e) => setUmum((u) => ({ ...u, [c.key]: e.target.value }))} className="w-8 h-8 rounded cursor-pointer border border-gray-200" />
                      <span className="text-gray-600 dark:text-gray-400 text-xs">{c.label}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <label className={labelClass}>Google Analytics ID</label>
                <input className={inputClass} placeholder="G-XXXXXXXXXX" value={umum.analyticsId} onChange={(e) => setUmum((u) => ({ ...u, analyticsId: e.target.value }))} />
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div>
                  <p className="text-gray-900 dark:text-white font-medium text-sm">Mode Pemeliharaan</p>
                  <p className="text-gray-500 dark:text-gray-400 text-xs mt-0.5">Website tidak dapat diakses oleh pengunjung</p>
                </div>
                <button
                  onClick={() => setUmum((u) => ({ ...u, maintenanceMode: !u.maintenanceMode }))}
                  className={`relative w-11 h-6 rounded-full transition-colors ${umum.maintenanceMode ? "bg-[#E62129]" : "bg-gray-300 dark:bg-gray-600"}`}
                >
                  <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-all ${umum.maintenanceMode ? "left-5" : "left-0.5"}`} />
                </button>
              </div>
              <div className="flex justify-end">
                <button onClick={() => handleSave("umum")} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#E62129] hover:bg-[#c4131a] text-white text-sm font-medium transition-colors">
                  <Save className="w-4 h-4" /> Simpan
                </button>
              </div>
            </div>
          )}

          {/* KONTAK */}
          {activeTab === "kontak" && (
            <div className="space-y-5">
              <h2 className="text-gray-900 dark:text-white font-bold text-lg border-b border-gray-100 dark:border-gray-800 pb-3">Informasi Kontak</h2>
              <div>
                <label className={labelClass}><MapPin className="w-3.5 h-3.5 inline-block mr-1" />Alamat Kampus</label>
                <textarea rows={2} className={`${inputClass} resize-none`} value={kontak.address} onChange={(e) => setKontak((k) => ({ ...k, address: e.target.value }))} />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>No. Telepon Utama</label>
                  <input className={inputClass} value={kontak.phone} onChange={(e) => setKontak((k) => ({ ...k, phone: e.target.value }))} />
                </div>
                <div>
                  <label className={labelClass}>No. Telepon Admisi</label>
                  <input className={inputClass} value={kontak.admisiPhone} onChange={(e) => setKontak((k) => ({ ...k, admisiPhone: e.target.value }))} />
                </div>
                <div>
                  <label className={labelClass}>Email Utama</label>
                  <input type="email" className={inputClass} value={kontak.email} onChange={(e) => setKontak((k) => ({ ...k, email: e.target.value }))} />
                </div>
                <div>
                  <label className={labelClass}>Email Admisi</label>
                  <input type="email" className={inputClass} value={kontak.admisiEmail} onChange={(e) => setKontak((k) => ({ ...k, admisiEmail: e.target.value }))} />
                </div>
                <div>
                  <label className={labelClass}>Email Beasiswa</label>
                  <input type="email" className={inputClass} value={kontak.beasiswaEmail} onChange={(e) => setKontak((k) => ({ ...k, beasiswaEmail: e.target.value }))} />
                </div>
                <div>
                  <label className={labelClass}>Google Maps URL</label>
                  <input className={inputClass} value={kontak.mapEmbedUrl} onChange={(e) => setKontak((k) => ({ ...k, mapEmbedUrl: e.target.value }))} />
                </div>
              </div>
              <div className="flex justify-end">
                <button onClick={() => handleSave("kontak")} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#E62129] hover:bg-[#c4131a] text-white text-sm font-medium transition-colors">
                  <Save className="w-4 h-4" /> Simpan
                </button>
              </div>
            </div>
          )}

          {/* SOSMED */}
          {activeTab === "sosmed" && (
            <div className="space-y-5">
              <h2 className="text-gray-900 dark:text-white font-bold text-lg border-b border-gray-100 dark:border-gray-800 pb-3">Media Sosial</h2>
              <div className="space-y-4">
                {[
                  { icon: Facebook, label: "Facebook", key: "facebook", color: "#1877F2" },
                  { icon: Instagram, label: "Instagram", key: "instagram", color: "#E4405F" },
                  { icon: Youtube, label: "YouTube", key: "youtube", color: "#FF0000" },
                  { icon: Twitter, label: "X (Twitter)", key: "twitter", color: "#000000" },
                ].map((s) => {
                  const Icon = s.icon;
                  return (
                    <div key={s.key} className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${s.color}15` }}>
                        <Icon className="w-4 h-4" style={{ color: s.color }} />
                      </div>
                      <div className="flex-1">
                        <label className={labelClass}>{s.label}</label>
                        <input className={inputClass} placeholder={`URL ${s.label}`} value={(sosmed as Record<string, string>)[s.key]} onChange={(e) => setSosmed((sm) => ({ ...sm, [s.key]: e.target.value }))} />
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="flex justify-end">
                <button onClick={() => handleSave("media sosial")} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#E62129] hover:bg-[#c4131a] text-white text-sm font-medium transition-colors">
                  <Save className="w-4 h-4" /> Simpan
                </button>
              </div>
            </div>
          )}

          {/* NOTIFIKASI */}
          {activeTab === "notifikasi" && (
            <div className="space-y-5">
              <h2 className="text-gray-900 dark:text-white font-bold text-lg border-b border-gray-100 dark:border-gray-800 pb-3">Notifikasi Email</h2>
              <div className="space-y-3">
                {[
                  { key: "emailNewSubmission", label: "Form baru diterima", desc: "Notifikasi saat ada formulir admisi atau kontak masuk" },
                  { key: "emailNewComment", label: "Komentar baru", desc: "Notifikasi saat ada komentar pada berita" },
                  { key: "emailNewUser", label: "Pengguna baru", desc: "Notifikasi saat ada pengguna baru ditambahkan" },
                ].map((n) => (
                  <div key={n.key} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div>
                      <p className="text-gray-900 dark:text-white font-medium text-sm">{n.label}</p>
                      <p className="text-gray-500 dark:text-gray-400 text-xs mt-0.5">{n.desc}</p>
                    </div>
                    <button
                      onClick={() => setNotifikasi((x) => ({ ...x, [n.key]: !(x as Record<string, unknown>)[n.key] }))}
                      className={`relative w-11 h-6 rounded-full transition-colors ${(notifikasi as Record<string, unknown>)[n.key] ? "bg-[#E62129]" : "bg-gray-300 dark:bg-gray-600"}`}
                    >
                      <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-all ${(notifikasi as Record<string, unknown>)[n.key] ? "left-5" : "left-0.5"}`} />
                    </button>
                  </div>
                ))}
              </div>
              <div>
                <label className={labelClass}>Pengingat Batas Pendaftaran (hari sebelumnya)</label>
                <input type="number" className={`${inputClass} max-w-xs`} value={notifikasi.admisiReminderDays} onChange={(e) => setNotifikasi((n) => ({ ...n, admisiReminderDays: Number(e.target.value) }))} min={1} max={30} />
              </div>
              <div className="flex justify-end">
                <button onClick={() => handleSave("notifikasi")} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#E62129] hover:bg-[#c4131a] text-white text-sm font-medium transition-colors">
                  <Save className="w-4 h-4" /> Simpan
                </button>
              </div>
            </div>
          )}

          {/* KEAMANAN */}
          {activeTab === "keamanan" && (
            <div className="space-y-5">
              <h2 className="text-gray-900 dark:text-white font-bold text-lg border-b border-gray-100 dark:border-gray-800 pb-3">Keamanan Akun</h2>
              <div className="space-y-4">
                <div>
                  <label className={labelClass}>Kata Sandi Saat Ini</label>
                  <div className="relative">
                    <input type={showPassword ? "text" : "password"} className={inputClass} value={keamanan.currentPassword} onChange={(e) => setKeamanan((k) => ({ ...k, currentPassword: e.target.value }))} placeholder="Masukkan kata sandi saat ini" />
                    <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600" onClick={() => setShowPassword((s) => !s)}>
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Kata Sandi Baru</label>
                    <input type="password" className={inputClass} value={keamanan.newPassword} onChange={(e) => setKeamanan((k) => ({ ...k, newPassword: e.target.value }))} placeholder="Kata sandi baru" />
                  </div>
                  <div>
                    <label className={labelClass}>Konfirmasi Kata Sandi Baru</label>
                    <input type="password" className={inputClass} value={keamanan.confirmPassword} onChange={(e) => setKeamanan((k) => ({ ...k, confirmPassword: e.target.value }))} placeholder="Ulangi kata sandi baru" />
                  </div>
                </div>
              </div>
              <div className="border-t border-gray-100 dark:border-gray-800 pt-4 space-y-3">
                <h3 className="text-gray-900 dark:text-white font-semibold text-sm">Kebijakan Keamanan</h3>
                <div>
                  <label className={labelClass}>Timeout Sesi (menit)</label>
                  <input type="number" className={`${inputClass} max-w-xs`} value={keamanan.sessionTimeout} onChange={(e) => setKeamanan((k) => ({ ...k, sessionTimeout: Number(e.target.value) }))} min={10} max={480} />
                </div>
                <div>
                  <label className={labelClass}>Maks. Percobaan Login Sebelum Dikunci</label>
                  <input type="number" className={`${inputClass} max-w-xs`} value={keamanan.loginAttempts} onChange={(e) => setKeamanan((k) => ({ ...k, loginAttempts: Number(e.target.value) }))} min={3} max={10} />
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div>
                    <p className="text-gray-900 dark:text-white font-medium text-sm">Autentikasi Dua Faktor (2FA)</p>
                    <p className="text-gray-500 dark:text-gray-400 text-xs mt-0.5">Tambah lapisan keamanan ekstra saat login</p>
                  </div>
                  <button
                    onClick={() => setKeamanan((k) => ({ ...k, twoFactorEnabled: !k.twoFactorEnabled }))}
                    className={`relative w-11 h-6 rounded-full transition-colors ${keamanan.twoFactorEnabled ? "bg-[#E62129]" : "bg-gray-300 dark:bg-gray-600"}`}
                  >
                    <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-all ${keamanan.twoFactorEnabled ? "left-5" : "left-0.5"}`} />
                  </button>
                </div>
              </div>
              <div className="flex justify-end">
                <button onClick={() => {
                  if (keamanan.newPassword && keamanan.newPassword !== keamanan.confirmPassword) { toast.error("Konfirmasi kata sandi tidak cocok"); return; }
                  handleSave("keamanan");
                  setKeamanan((k) => ({ ...k, currentPassword: "", newPassword: "", confirmPassword: "" }));
                }} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#E62129] hover:bg-[#c4131a] text-white text-sm font-medium transition-colors">
                  <Save className="w-4 h-4" /> Simpan
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
