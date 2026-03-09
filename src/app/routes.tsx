import { createBrowserRouter, Navigate } from "react-router";
import { PublicLayout } from "./components/layout/PublicLayout";
import { AdminLayout } from "./components/layout/AdminLayout";
import { HomePage } from "./pages/public/HomePage";
import { BeritaPage } from "./pages/public/BeritaPage";
import { BeritaDetailPage } from "./pages/public/BeritaDetailPage";
import { SejarahPage } from "./pages/public/SejarahPage";
import { VisiMisiPage } from "./pages/public/VisiMisiPage";
import { DewanDosenPage } from "./pages/public/DewanDosenPage";
import { ProgramPage } from "./pages/public/ProgramPage";
import { KontakPage } from "./pages/public/KontakPage";
import { AdmisiPage } from "./pages/public/AdmisiPage";
import { GenericPage } from "./pages/public/GenericPage";
import { NotFoundPage } from "./pages/public/NotFoundPage";

// Full content pages
import { MarsSttbPage } from "./pages/public/MarsSttbPage";
import { KegiatanPage } from "./pages/public/KegiatanPage";
import { LeadPage } from "./pages/public/LeadPage";
import { PerpustakaanPage } from "./pages/public/PerpustakaanPage";
import { MediaPage } from "./pages/public/MediaPage";
import { BiayaStudiPage } from "./pages/public/BiayaStudiPage";
import { DukungSttbPage } from "./pages/public/DukungSttbPage";

// New pages
import { PengakuanImanPage } from "./pages/public/PengakuanImanPage";
import { PengurusYayasanPage } from "./pages/public/PengurusYayasanPage";
import { SenatPage } from "./pages/public/SenatPage";
import { JadwalAdmisiPage } from "./pages/public/JadwalAdmisiPage";
import { InfoPersyaratanPage } from "./pages/public/InfoPersyaratanPage";
import { BeasiswaPage } from "./pages/public/BeasiswaPage";
import { FAQPage } from "./pages/public/FAQPage";
import { PembinaanPage } from "./pages/public/PembinaanPage";
import { FasilitasPage } from "./pages/public/FasilitasPage";

// Admin pages
import { AdminLoginPage } from "./pages/admin/AdminLoginPage";
import { AdminDashboardPage } from "./pages/admin/AdminDashboardPage";
import { AdminNewsPage } from "./pages/admin/AdminNewsPage";
import { AdminKegiatanPage } from "./pages/admin/AdminKegiatanPage";
import { AdminMediaPage } from "./pages/admin/AdminMediaPage";
import { AdminHalamanPage } from "./pages/admin/AdminHalamanPage";
import { AdminPenggunaPage } from "./pages/admin/AdminPenggunaPage";
import { AdminPengaturanPage } from "./pages/admin/AdminPengaturanPage";
import { AdminNewsCreatePage } from "./pages/admin/AdminNewsCreatePage";
import { AdminEventCreatePage } from "./pages/admin/AdminEventCreatePage";
import { AdminNewsEditPage } from "./pages/admin/AdminNewsEditPage";
import { AdminEventEditPage } from "./pages/admin/AdminEventEditPage";

// Auth guard
import React from "react";
import { useAuthStore } from "./stores/auth-store";

function RequireAuth({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthStore();
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }
  return <>{children}</>;
}

function AdminLayoutWrapper() {
  return (
    <RequireAuth>
      <AdminLayout />
    </RequireAuth>
  );
}

export const router = createBrowserRouter([
  // Admin routes
  {
    path: "/admin/login",
    element: <AdminLoginPage />,
  },
  {
    path: "/admin",
    element: <AdminLayoutWrapper />,
    children: [
      { index: true, element: <Navigate to="/admin/dashboard" replace /> },
      { path: "dashboard", element: <AdminDashboardPage /> },
      { path: "news", element: <AdminNewsPage /> },
      { path: "news/create", element: <AdminNewsCreatePage /> },
      { path: "news/:id/edit", element: <AdminNewsEditPage /> },
      { path: "events", element: <AdminKegiatanPage /> },
      { path: "events/create", element: <AdminEventCreatePage /> },
      { path: "events/:id/edit", element: <AdminEventEditPage /> },
      { path: "media", element: <AdminMediaPage /> },
      { path: "pages", element: <AdminHalamanPage /> },
      { path: "users", element: <AdminPenggunaPage /> },
      { path: "settings", element: <AdminPengaturanPage /> },
    ],
  },

  // Public routes
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      { index: true, element: <HomePage /> },

      // About
      { path: "sejarah", element: <SejarahPage /> },
      { path: "visi-misi", element: <VisiMisiPage /> },
      { path: "dewan-dosen", element: <DewanDosenPage /> },
      { path: "mars-sttb", element: <MarsSttbPage /> },
      { path: "pengakuan-iman", element: <PengakuanImanPage /> },
      { path: "pengurus-yayasan", element: <PengurusYayasanPage /> },
      { path: "senat", element: <SenatPage /> },

      // Academic programs
      { path: "sarjana-teologi", element: <ProgramPage /> },
      { path: "sarjana-pendidikan-kristen", element: <ProgramPage /> },
      { path: "magister-teologi-pelayanan-pastoral-gereja-urban", element: <ProgramPage /> },
      { path: "magister-teologi-transformasi-budaya-masyarakat", element: <ProgramPage /> },
      { path: "magister-pendidikan-kristen", element: <ProgramPage /> },
      { path: "magister-ministri-marketplace", element: <ProgramPage /> },
      { path: "magister-ministri-kepemimpinan-pastoral", element: <ProgramPage /> },
      { path: "magister-ministri-teologi-pelayanan-gerejawi", element: <ProgramPage /> },

      // News
      { path: "berita", element: <BeritaPage /> },
      { path: "berita/:slug", element: <BeritaDetailPage /> },

      // Events & Campus
      { path: "kegiatan", element: <KegiatanPage /> },
      { path: "media", element: <MediaPage /> },
      { path: "lead", element: <LeadPage /> },
      { path: "perpustakaan", element: <PerpustakaanPage /> },
      { path: "fasilitas", element: <FasilitasPage /> },
      { path: "pembinaan", element: <PembinaanPage /> },

      // Finance
      { path: "biaya-studi", element: <BiayaStudiPage /> },
      { path: "beasiswa", element: <BeasiswaPage /> },
      { path: "dukung-sttb", element: <DukungSttbPage /> },

      // Admission
      { path: "prosedur-admisi", element: <AdmisiPage /> },
      { path: "jadwal-admisi", element: <JadwalAdmisiPage /> },
      { path: "informasi-persyaratan", element: <InfoPersyaratanPage /> },
      { path: "faq", element: <FAQPage /> },

      // Contact
      { path: "kontak-kami", element: <KontakPage /> },

      // 404
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);