# PRD: STTB.ac.id Redesign

## 1. Overview
Complete modern redesign of https://sttb.ac.id – Sekolah Tinggi Teologi Bandung.  
Transform the outdated site into a beautiful, fast, faith-centered web app with secure admin CMS.

## 2. Goals
- Modern, trustworthy, professional visual identity
- Excellent mobile & SEO experience
- Easy content management for staff (no coding)
- Secure authentication & data protection

## 3. User Personas
- **Public Visitor** – prospective students, pastors, alumni, donors
- **Admin/Staff** – content editors who manage news, events, media

## 4. All Routes & Capabilities

### Public Routes (exact from original site)
- `/` – Home
- About: `/sejarah`, `/visi-misi`, `/mars-sttb`, `/pengakuan-iman`, `/dewan-dosen`, `/pengurus-yayasan`
- Academics: all 8 program pages (Sarjana Teologi, Sarjana Pendidikan Kristen, all Magister programs)
- `/berita` – News list + detail
- `/kegiatan` – Events
- `/media` – Media gallery
- `/lead` – LEAD Center
- `/perpustakaan` – Library
- `/fasilitas`, `/pembinaan`, `/senat` – Campus life
- Finance: `/biaya-studi`, `/beasiswa`, `/dukung-sttb`
- Admission: `/prosedur-admisi`, `/jadwal-admisi`, `/info-persyaratan`, `/faq`
- `/kontak-kami`

### Admin Routes (new secure section)
- `/admin/login`
- `/admin/dashboard`
- `/admin/news` (full CRUD)
- `/admin/events`, `/admin/media`, `/admin/pages`

## 5. Color Palette
- Primary: rgb(230,33,41) → Tailwind `primary`
- Secondary: rgb(10,44,116)
- Accent blue: rgb(5,112,205)
- Heading red: rgb(228,60,60)
- Soft logo blue: rgb(127,180,229)

## 6. Tech Stack
**Frontend:** Next.js 15 App Router + TypeScript + Tailwind + shadcn/ui + lucide-react + react-hook-form + zod + TanStack Query + Zustand + Auth.js  
**Backend:** .NET 8 (see be-standard.md)  
**Deployment:** Vercel (frontend)

## 7. Non-Functional
- Mobile-first, dark mode, WCAG AA, Lighthouse ≥95
- Indonesian + English ready
- Secure (follow security-standard.md)

## 8. Out of Scope (Phase 1)
- Full student portal, payment gateway, e-learning

Use this PRD as single source of truth.