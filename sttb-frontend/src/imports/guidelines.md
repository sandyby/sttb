**Project Name:** STTB Redesign (Sekolah Tinggi Teologi Bandung)  
**Current site:** https://sttb.ac.id (outdated 2010s design)  
**Goal:** Modern, faith-centered, professional, desktop-first institutional web app with secure login + full News/Events/Media CMS.

## Core Rules (MUST follow strictly)
1. Generate **only** Next.js 15 App Router + TypeScript + Tailwind + shadcn/ui code.
5. Use **PRD.md** as single source of truth for every page and feature.

## Tech Stack (locked)
- Next.js 15 (App Router + Server Components)
- TypeScript (strict)
- Tailwind CSS + shadcn/ui + class-variance-authority + cn()
- Icons: lucide-react
- Forms: react-hook-form + zod
- Data: @tanstack/react-query + Zustand
- Auth: Auth.js (next-auth) with credentials + middleware protection
- Toast: sonner
- Rich text: TipTap (or mock in dev tab)
- Deployment: Vercel (frontend) + .NET backend

## Exact Routes & Capabilities

### Public Routes (no login)
- `/` – Home (hero + vision + latest news carousel + quick links)
- `/sejarah`, `/visi-misi`, `/mars-sttb`, `/pengakuan-iman`, `/dewan-dosen`, `/pengurus-yayasan` – About sections
- `/sarjana-teologi`, `/sarjana-pendidikan-kristen`, `/magister-teologi-pelayanan-pastoral-gereja-urban`, `/magister-teologi-transformasi-budaya-masyarakat`, `/magister-pendidikan-kristen`, `/magister-ministri-marketplace`, `/magister-ministri-kepemimpinan-pastoral`, `/magister-ministri-teologi-pelayanan-gerejawi` – Academics (detailed curriculum)
- `/berita` – News list + search + pagination + detail page
- `/kegiatan` – Events calendar
- `/media` – Media gallery & articles
- `/lead` – LEAD Center programs
- `/perpustakaan` – Library info + catalog link
- `/fasilitas`, `/pembinaan`, `/senat` – Campus life
- `/biaya-studi`, `/beasiswa`, `/dukung-sttb` – Finance & donation
- `/prosedur-admisi`, `/jadwal-admisi`, `/info-persyaratan`, `/faq` – Admission
- `/kontak-kami` – Contact

**Public user can:** browse all content, read news/events, view programs, download forms, watch videos.

### Admin Routes (protected)
- `/admin/login`
- `/admin/dashboard`
- `/admin/news` (CRUD + rich text + image upload + category + publish)
- `/admin/events` (CRUD + calendar)
- `/admin/media` (gallery + video management)
- `/admin/pages` (edit static pages)
- `/admin/users` (future)

**Admin can:** full content management via forms, image upload (saved to backend), preview changes instantly.

## Design & UX Rules
- Modern, clean, minimalist with subtle Christian/theological elegance (soft blues, whites, warm accents).
- Mobile-first, accessible (WCAG AA), fast (Lighthouse ≥95).
- Hero with vision/mission, smooth scrolling sections, news carousel on home.
- Admin CMS: clean dashboard, rich text editor (use TipTap or mock with contenteditable), image upload preview.
- Login page: simple, secure, with "Remember me" and forgot password.

## Color Palette (exact Tailwind config)
```ts
theme: {
  colors: {
    primary: { DEFAULT: "hsl(0, 75%, 55%)" },      // rgb(230,33,41)
    secondary: { DEFAULT: "hsl(217, 84%, 24%)" }, // rgb(10,44,116)
    accent: { DEFAULT: "hsl(203, 70%, 55%)" },    // rgb(5,112,205)
    redAccent: { DEFAULT: "hsl(4, 75%, 55%)" },   // rgb(228,60,60)
    logoBlue: { DEFAULT: "hsl(203, 70%, 70%)" },  // rgb(127,180,229)
    neutral: { 50: "#f8f9fa", 900: "#111827" }
  }
}

## Figma Make Behavior
- Always generate production-ready, type-safe code.
- Use Server Components for public pages, Client Components only when needed (forms, auth, CMS).
- Mock all backend calls with TanStack Query (fake data or local JSON). Later we will replace with real .NET API.
- Never use Pages Router, never use SWR, never use antd.
- Every component must be in feature folder or shadcn/ui.
- Add proper loading states, error handling, and toast notifications (use sonner).