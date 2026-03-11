import { ExternalLink } from "lucide-react";
import { MediaClient } from "./_components/MediaClient";

const externalLinks = [
  { label: "Jurnal STULOS", href: "#" },
  { label: "OJS", href: "http://e-journal.sttb.ac.id/" },
  { label: "Buletin STTB", href: "#" },
  { label: "Monograf", href: "#" },
  { label: "Katalog Fisik", href: "http://library.sttb.ac.id" },
  { label: "EBSCO Host", href: "https://search.ebscohost.com/Login.aspx" },
  { label: "Jurnal ATLA", href: "#" },
];

export default function MediaPage() {
  return (
    <>
      {/* Hero */}
      <div className="pt-28 pb-20 bg-gradient-to-br from-[#0A2C74] to-[#0570CD] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-5">
          <div className="absolute top-1/4 right-1/4 w-72 h-72 rounded-full border-4 border-white" />
          <div className="absolute top-1/2 right-1/3 w-40 h-40 rounded-full border-4 border-white" />
        </div>
        <div className="max-w-7xl mx-auto px-4 relative">
          <p className="text-[#7FB4E5] text-sm font-medium uppercase tracking-wider mb-2">
            Format · Media
          </p>
          <h1
            className="text-white mb-4"
            style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)", fontWeight: 700 }}
          >
            Media STTB
          </h1>
          <p className="text-blue-200 max-w-2xl leading-relaxed">
            Artikel, video, dan konten multimedia dari Sekolah Tinggi Teologi Bandung —
            memperlengkapi umat Allah dengan sumber daya pembelajaran berkualitas.
          </p>
        </div>
      </div>

      {/* External links bar */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap gap-2">
          {externalLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs hover:bg-[#E62129] hover:text-white transition-colors"
            >
              {l.label}
              <ExternalLink className="w-3 h-3" />
            </a>
          ))}
        </div>
      </div>

      <MediaClient />
    </>
  );
}
