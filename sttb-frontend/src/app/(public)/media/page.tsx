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

import PageHeader from "@/components/shared/PageHeader";

export default function MediaPage() {
  return (
    <>
      <PageHeader
        title="Media STTB"
        category="Format · Media"
        description="Artikel, video, dan konten multimedia dari Sekolah Tinggi Teologi Bandung — memperlengkapi umat Allah dengan sumber daya pembelajaran berkualitas."
        breadcrumb={[{ label: "Media", href: "/media" }]}
      />

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
