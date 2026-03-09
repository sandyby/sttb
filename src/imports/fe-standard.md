# Frontend Development Standard (Next.js App Router / TypeScript) – STTB Redesign

> **Scope**: Mandatory rules for the STTB.ac.id redesign frontend. All AI agents and developers MUST follow this document without exception.

## 1. Architecture & Stack

| Layer              | Technology                          | Purpose |
|--------------------|-------------------------------------|---------|
| Framework          | Next.js 15 (App Router)             | SSR/SSG + Server Components |
| Language           | TypeScript (strict)                 | Type safety |
| Styling            | Tailwind CSS + shadcn/ui            | Utility-first + accessible primitives |
| Icons              | lucide-react                        | Icons |
| Forms              | react-hook-form + zod               | Validation |
| Data Fetching      | @tanstack/react-query               | Caching, mutations, server-state |
| Global State       | Zustand                             | Lightweight client state |
| Auth               | Auth.js (next-auth)                 | Login & protected routes |
| UI Components      | shadcn/ui (Radix)                   | Accessible components |
| Testing            | Vitest + Playwright                 | Unit + E2E |

---

## 2. Project Structure
src/
├── app/                          # App Router
│   ├── (public)/                 # Public layout group
│   │   ├── layout.tsx
│   │   ├── page.tsx              # Home
│   │   ├── berita/...
│   │   ├── akademik/...
│   │   └── ...
│   ├── (admin)/                  # Protected admin layout group
│   │   ├── layout.tsx
│   │   ├── dashboard/page.tsx
│   │   ├── news/...
│   │   └── ...
│   ├── globals.css
│   └── layout.tsx                # Root layout
├── components/
│   ├── [feature]/                # e.g. news/, academics/, auth/, dashboard/
│   │   ├── index.tsx
│   │   ├── [Component].tsx
│   │   ├── hooks/
│   │   └── form/
│   ├── ui/                       # shadcn/ui primitives
│   ├── shared/                   # Reusable business-agnostic components
│   └── layouts/                  # MainLayout, AdminLayout, etc.
├── lib/
│   ├── utils.ts                  # cn(), query-client
│   ├── auth.ts
│   └── api.ts                    # TanStack Query functions
├── hooks/                        # Global hooks
├── stores/                       # Zustand stores
├── types/                        # Global TypeScript types
├── constants/                    # App constants
├── utils/                        # Generic utilities
└── ...


**Key Rules**
- Feature folders only (e.g. `components/news/`, `components/admin/`).
- Colocation: hooks, forms, and sub-components stay inside their feature folder.
- UI primitives → `components/ui/`
- Shared components → `components/shared/`

## 3. Component Patterns (App Router Style)

### 3.1 Server Component (Public Pages)
```tsx
// app/(public)/berita/page.tsx
import { NewsList } from "@/components/news";
import { getNews } from "@/lib/api";

export default async function NewsPage() {
  const news = await getNews();
  return <NewsList initialData={news} />;
}
```

3.2 Client Component + TanStack Query Hook
```tsx// components/news/hooks/useNews.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const useNews = () => {
  const queryClient = useQueryClient();

  const listQuery = useQuery({
    queryKey: ["news"],
    queryFn: () => fetch("/api/news").then(res => res.json()),
  });

  const createMutation = useMutation({
    mutationFn: (newNews: any) => fetch("/api/news", { method: "POST", body: JSON.stringify(newNews) }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["news"] }),
  });

  return { listQuery, createMutation };
};
```

### 3.3 Page Layout Pattern

```
// app/(admin)/news/page.tsx
import { NewsManager } from "@/components/news";
import { requireAuth } from "@/lib/auth";

export default async function AdminNewsPage() {
  await requireAuth(); // middleware + server check
  return <NewsManager />;
}
```

---

## 4. API Communication (TanStack Query + .NET)
All calls go through TanStack Query.
Base URL from process.env.NEXT_PUBLIC_API_URL.
Auth token automatically attached via query client interceptor (see lib/api.ts).
Use useMutation + invalidateQueries for cache updates.

---

## 5. Authentication & Authorization
Auth.js (next-auth) with credentials provider.
Protected routes via middleware + server component requireAuth().
Admin-only routes under (admin) group.
Role/permission checks via Zustand store + server validation.
---

## 6. Form Handling
Always react-hook-form + zod.
Reusable schemas in types/schemas.ts.
Server-side validation mandatory (Zod on backend too).
---

## 7. Naming Conventions

| Element | Convention | Example |
|---|---|---|
| Component files | PascalCase `.tsx` | `DataConnectionForm.tsx` |
| Hook files | camelCase with `use` prefix | `useDataConnections.ts` |
| Utility files | camelCase `.ts` | `tryFetchJson.ts` |
| Type/Interface files | PascalCase `.ts` | `DataConnection.ts` |
| CSS modules | camelCase `.module.css` | `layout.module.css` |
| Feature folders | kebab-case | `data-connection/`, `ropa-list/` |
| Component names | PascalCase | `DataConnectionsTable` |
| Hook names | `use[Feature][Action]` | `useDataConnections`, `useFetchWithAccessToken` |
| API URL constants | camelCase with get/create/update/delete prefix | `getUserList`, `createUser` |
| URL builder functions | PascalCase | `GetUserList(page, search)` |

---

## 8. Styling
Tailwind + cn() utility (clsx + tailwind-merge).
Component variants with class-variance-authority (CVA).
Color palette (from guidelines.md) already extended in tailwind.config.ts.

---

## 9. Security Headers

Follow security-standard.md strictly.
Server Components for public pages.
TanStack Query for data.
next/image for all images.
Lighthouse target ≥ 95.

---

## 10. Mandatory Rules for AI Agents
Never hardcode URLs or secrets.
Always respect feature-folder structure.
Use TanStack Query (never SWR).
Server Components by default, Client Components only when needed ("use client").
Every form uses react-hook-form + zod.
Protected admin routes under (admin) group.
Never run npm run dev or execute code.

---

## 11. Testing & Storybook
Vitest for hooks/components.
Playwright for E2E.
shadcn/ui components should have .stories.tsx.

---

## 12. Performance

- Use `React.memo`, `useCallback`, `useMemo` for expensive computations.
- Lazy load heavy components with `dynamic()` from Next.js.
- Minimize re-renders — keep state as close to where it's used as possible.
- Use SWR's built-in deduplication and caching.
- Optimize images via `next/image`.

---