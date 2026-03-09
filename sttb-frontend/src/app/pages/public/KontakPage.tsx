"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { MapPin, Phone, Mail, Clock, Send, MessageSquare } from "lucide-react";
import { toast } from "sonner";

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export function KontakPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Contact form submitted:", data);
    toast.success("Pesan Anda telah terkirim! Kami akan merespons dalam 1-2 hari kerja.");
    reset();
  };

  return (
    <>
      {/* Hero */}
      <div className="pt-28 pb-16 bg-gradient-to-r from-[#0A2C74] to-[#0570CD]">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-[#7FB4E5] text-sm font-medium uppercase tracking-wider mb-2">
            Hubungi Kami
          </p>
          <h1
            className="text-white mb-3"
            style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)", fontWeight: 700 }}
          >
            Kontak Kami
          </h1>
          <p className="text-blue-200 max-w-xl">
            Kami siap membantu Anda. Hubungi tim STTB untuk informasi akademik,
            pendaftaran, atau pertanyaan lainnya.
          </p>
        </div>
      </div>

      <section className="py-16 bg-gray-50 dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-10">
            {/* Contact info */}
            <div className="space-y-5">
              <h2 className="text-gray-900 dark:text-white font-bold" style={{ fontSize: "1.25rem" }}>
                Informasi Kontak
              </h2>

              {[
                {
                  icon: MapPin,
                  title: "Alamat",
                  content: "Jl. Sriwijaya No. 20-22\nBandung 40113\nJawa Barat, Indonesia",
                  color: "text-[#E62129] bg-red-50 dark:bg-red-900/20",
                },
                {
                  icon: Phone,
                  title: "Telepon",
                  content: "(022) 201-2010\n(022) 201-2011",
                  color: "text-[#0A2C74] bg-blue-50 dark:bg-blue-900/20",
                },
                {
                  icon: Mail,
                  title: "Email",
                  content: "info@sttb.ac.id\nadmisi@sttb.ac.id",
                  color: "text-[#0570CD] bg-sky-50 dark:bg-sky-900/20",
                },
                {
                  icon: Clock,
                  title: "Jam Operasional",
                  content: "Senin – Jumat: 08.00 – 17.00\nSabtu: 08.00 – 12.00",
                  color: "text-[#E62129] bg-red-50 dark:bg-red-900/20",
                },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="flex gap-4 p-4 bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${item.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-gray-900 dark:text-white font-medium text-sm mb-0.5">
                        {item.title}
                      </p>
                      {item.content.split("\n").map((line, i) => (
                        <p key={i} className="text-gray-500 dark:text-gray-400 text-sm">
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>
                );
              })}

              {/* Map placeholder */}
              <div className="bg-gray-200 dark:bg-gray-700 rounded-xl overflow-hidden h-48 flex items-center justify-center">
                <div className="text-center text-gray-500 dark:text-gray-400">
                  <MapPin className="w-8 h-8 mx-auto mb-2" />
                  <p className="text-sm">Peta Google Maps</p>
                  <a
                    href="https://maps.google.com/?q=Jl+Sriwijaya+No+20-22+Bandung"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#E62129] text-xs hover:underline"
                  >
                    Buka di Google Maps
                  </a>
                </div>
              </div>
            </div>

            {/* Contact form */}
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-[#E62129] flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-gray-900 dark:text-white font-bold">
                      Kirim Pesan
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 text-xs">
                      Isi formulir di bawah ini dan kami akan merespons segera
                    </p>
                  </div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1.5">
                        Nama Lengkap <span className="text-[#E62129]">*</span>
                      </label>
                      <input
                        {...register("name", { required: "Nama wajib diisi" })}
                        type="text"
                        placeholder="Nama Anda"
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:border-[#E62129] focus:ring-1 focus:ring-[#E62129]/30 transition-all"
                      />
                      {errors.name && (
                        <p className="text-[#E62129] text-xs mt-1">{errors.name.message}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1.5">
                        Email <span className="text-[#E62129]">*</span>
                      </label>
                      <input
                        {...register("email", {
                          required: "Email wajib diisi",
                          pattern: { value: /^\S+@\S+\.\S+$/, message: "Email tidak valid" },
                        })}
                        type="email"
                        placeholder="email@contoh.com"
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:border-[#E62129] focus:ring-1 focus:ring-[#E62129]/30 transition-all"
                      />
                      {errors.email && (
                        <p className="text-[#E62129] text-xs mt-1">{errors.email.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1.5">
                        No. Telepon
                      </label>
                      <input
                        {...register("phone")}
                        type="tel"
                        placeholder="0812-xxxx-xxxx"
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:border-[#E62129] focus:ring-1 focus:ring-[#E62129]/30 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1.5">
                        Subjek <span className="text-[#E62129]">*</span>
                      </label>
                      <select
                        {...register("subject", { required: "Subjek wajib dipilih" })}
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:border-[#E62129] focus:ring-1 focus:ring-[#E62129]/30 transition-all"
                      >
                        <option value="">Pilih subjek...</option>
                        <option value="admisi">Informasi Admisi</option>
                        <option value="akademik">Informasi Akademik</option>
                        <option value="beasiswa">Beasiswa</option>
                        <option value="kerjasama">Kerjasama</option>
                        <option value="lainnya">Lainnya</option>
                      </select>
                      {errors.subject && (
                        <p className="text-[#E62129] text-xs mt-1">{errors.subject.message}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1.5">
                      Pesan <span className="text-[#E62129]">*</span>
                    </label>
                    <textarea
                      {...register("message", { required: "Pesan wajib diisi", minLength: { value: 20, message: "Pesan minimal 20 karakter" } })}
                      rows={5}
                      placeholder="Tuliskan pesan atau pertanyaan Anda..."
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:border-[#E62129] focus:ring-1 focus:ring-[#E62129]/30 transition-all resize-none"
                    />
                    {errors.message && (
                      <p className="text-[#E62129] text-xs mt-1">{errors.message.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#E62129] hover:bg-[#c4131a] text-white font-medium transition-all disabled:opacity-60 disabled:cursor-not-allowed hover:-translate-y-0.5 hover:shadow-md"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Mengirim...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" /> Kirim Pesan
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
