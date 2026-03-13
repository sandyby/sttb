import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Instagram,
  Youtube,
  Heart,
  ExternalLink,
} from "lucide-react";
import Image from "next/image";

const quickLinks = [
  { label: "Beranda", href: "/" },
  { label: "Tentang STTB", href: "/sejarah" },
  { label: "Visi & Misi", href: "/visi-misi" },
  { label: "Dewan Dosen", href: "/dewan-dosen" },
  { label: "Berita Terkini", href: "/berita" },
  { label: "Kegiatan", href: "/kegiatan" },
  { label: "Kontak Kami", href: "/kontak-kami" },
];

const academicLinks = [
  { label: "Sarjana Teologi", href: "/program-studi/sarjana-teologi" },
  { label: "Sarjana Pendidikan Kristen", href: "/program-studi/sarjana-pendidikan-kristen" },
  {
    label: "Magister Teologi",
    href: "/program-studi/magister-teologi-pelayanan-pastoral-gereja-urban",
  },
  { label: "Magister Ministri", href: "/program-studi/magister-ministri-marketplace" },
  { label: "Prosedur Admisi", href: "/prosedur-admisi" },
  { label: "Biaya Studi", href: "/biaya-studi" },
  { label: "Beasiswa", href: "/beasiswa" },
];

const campusLinks = [
  { label: "Perpustakaan", href: "/perpustakaan" },
  { label: "Fasilitas Kampus", href: "/fasilitas" },
  { label: "Pembinaan", href: "/pembinaan" },
  { label: "LEAD Center", href: "/lead" },
  { label: "Media & Galeri", href: "/media" },
  { label: "Dukung STTB", href: "/dukung-sttb" },
  { label: "FAQ", href: "/faq" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0A2C74] dark:bg-[#061840] text-white overflow-hidden">
      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 pt-14 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand & Contact */}
          <div className="lg:col-span-1">
            <div className="flex justify-center items-center gap-3 mb-5">
              <Image
                src="/sttb-logo-white.png"
                alt="STTB Logo"
                width={150}
                height={75}
                priority
                className="shrink-0"
              />
              <div className="flex flex-col gap-y-0.5">
                <div className="">
                  <p className="w-fit font-bold text-lg leading-tight text-white">
                    STTB
                  </p>
                </div>
                <div className="">
                  <p className="w-fit text-xs leading-tight text-blue-200">
                    Sekolah Tinggi Teologi Bandung
                  </p>
                </div>
              </div>
            </div>
            <p className="text-blue-100 text-sm leading-relaxed mb-5">
              Lembaga pendidikan teologi Kristen yang berdedikasi mencetak
              hamba-hamba Tuhan yang kompeten, berkarakter, dan berhati pelayan
              sejak 1992.
            </p>
            <div className="space-y-2.5">
              <div className="flex items-start gap-2.5 text-sm text-blue-100">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#7FB4E5]" />
                <span>Jl. Dr. Djunjunan No.105 40173 Cicendo Jawa Barat</span>
              </div>
              <a
                href="tel:+6281573360009"
                className="flex items-center gap-2.5 text-sm text-blue-100 hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4 flex-shrink-0 text-[#7FB4E5]" />
                (+62)-815-7336-0009
              </a>
              <a
                href="mailto:info@sttb.ac.id"
                className="flex items-center gap-2.5 text-sm text-blue-100 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4 flex-shrink-0 text-[#7FB4E5]" />
                official@sttb.ac.id
              </a>
            </div>
            <div className="flex items-center gap-3 mt-5">
              <a
                href="https://facebook.com/sttbbandung"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#E62129] flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com/sttb_bandung"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#E62129] flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com/@sttbbandung"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#E62129] flex items-center justify-center transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider border-b border-white/20 pb-2">
              Tautan Cepat
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-blue-100 text-sm hover:text-white hover:translate-x-1 transition-all inline-flex items-center gap-1.5"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#E62129] flex-shrink-0" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Academic */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider border-b border-white/20 pb-2">
              Program Akademik
            </h3>
            <ul className="space-y-2">
              {academicLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-blue-100 text-sm hover:text-white hover:translate-x-1 transition-all inline-flex items-center gap-1.5"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#E62129] flex-shrink-0" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Campus */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider border-b border-white/20 pb-2">
              Kehidupan Kampus
            </h3>
            <ul className="space-y-2">
              {campusLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-blue-100 text-sm hover:text-white hover:translate-x-1 transition-all inline-flex items-center gap-1.5"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#E62129] flex-shrink-0" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Accreditation badge */}
            <div className="mt-5 p-3 bg-white/10 rounded-lg">
              <p className="text-xs text-blue-200 mb-1">Terakreditasi</p>
              <p className="text-white font-semibold text-sm">
                BAN-PT Peringkat B
              </p>
              <a
                href="https://www.ban-pt.kemdikbud.go.id"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[#7FB4E5] hover:text-white flex items-center gap-1 mt-1"
              >
                Lihat Sertifikat <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-blue-200">
          <p>
            © {currentYear} Sekolah Tinggi Teologi Bandung. Hak Cipta
            Dilindungi.
          </p>
          <p className="flex items-center gap-1">
            Dibuat dengan <Heart className="w-3 h-3 text-[#E62129]" /> untuk
            kemuliaan Tuhan
          </p>
        </div>
      </div>
    </footer>
  );
}
