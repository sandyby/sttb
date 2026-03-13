# STTB — Sekolah Tinggi Teologi Bandung

Website redesign for STTB. Full-stack monorepo with a Next.js frontend and a .NET 10 backend API.

```
sttb/
├── sttb-frontend/       — Next.js 15 (React 19, TypeScript, Tailwind CSS)
└── sttb-backend-api/    — ASP.NET Core 10, Clean Architecture, SQL Server
```

---

## Prerequisites

| Tool | Version | Notes |
|------|---------|-------|
| Node.js | 20+ | For the frontend |
| .NET SDK | 10 | For the backend |
| SQL Server | 2019+ | Express or Developer edition is fine |
| `dotnet-ef` tool | latest | EF Core CLI |

Install the EF Core CLI tool if you haven't already:

```bash
dotnet tool install -g dotnet-ef
```

---

## 1. Backend Setup (`sttb-backend-api`)

### 1.1 Set User Secrets

The backend uses `dotnet user-secrets` — **never hardcode credentials**.

```bash
cd sttb-backend-api/sttb.WebAPI

dotnet user-secrets init

# SQL Server — Windows Authentication
dotnet user-secrets set "ConnectionStrings:DefaultConnection" \
  "Server=localhost;Database=sttb;Trusted_Connection=True;TrustServerCertificate=True;"

# SQL Server — SQL Authentication (use this if Windows Auth is not available)
dotnet user-secrets set "ConnectionStrings:DefaultConnection" \
  "Server=localhost;Database=sttb;User Id=sa;Password=yourpassword;TrustServerCertificate=True;"

# JWT secret — minimum 32 characters
dotnet user-secrets set "Jwt:Secret" "your-super-secret-key-min-32-chars-here"

# Admin account seeded on first startup
# Password must meet complexity: 8+ chars, uppercase, lowercase, digit, special char
dotnet user-secrets set "AdminSeed:Email" "admin@sttb.ac.id"
dotnet user-secrets set "AdminSeed:Password" "YourStr0ng!Pass"
```

### 1.2 Apply Migrations

Migrations are applied **automatically on startup** via `db.Database.Migrate()`.
You can also run them manually:

```bash
# Run from sttb-backend-api/sttb.WebAPI
dotnet ef database update --project ../sttb.Entities --startup-project .
```

### 1.3 Run the API

```bash
# From sttb-backend-api/sttb.WebAPI
dotnet watch

# Or from the repo root
dotnet watch --project sttb-backend-api/sttb.WebAPI
```

The API will be available at:
- **API base:** `http://localhost:5001`
- **Scalar UI (interactive docs):** `http://localhost:5001/scalar/v1`

> On first startup, the admin account is seeded automatically using the `AdminSeed` secrets you set above.

---

## 2. Frontend Setup (`sttb-frontend`)

### 2.1 Install Dependencies

```bash
cd sttb-frontend
npm install
```

### 2.2 Create Environment File

Create a `.env.local` file inside `sttb-frontend/`:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:5001
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=generate-a-random-secret-here
```

To generate a random `NEXTAUTH_SECRET`:

```bash
# macOS / Linux
openssl rand -base64 32

# Windows (PowerShell)
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Maximum 256 }))
```

### 2.3 Run the Dev Server

```bash
cd sttb-frontend
npm run dev
```

Frontend will be available at: `http://localhost:3000`

---

## 3. Project Structure

### Backend

```
sttb-backend-api/
├── sttb-backend.sln
├── sttb.WebAPI/          — Entry point: controllers, middleware, Program.cs
├── sttb.Commons/         — MediatR handlers, validators, service interfaces
├── sttb.Contracts/       — DTOs: request/response models
├── sttb.Entities/        — EF Core models, DbContext, migrations
└── sttb.Infrastructure/  — Argon2 hasher, JWT service, file storage
```

### Frontend

```
sttb-frontend/src/
├── app/
│   ├── (public)/         — Public-facing pages
│   └── (admin)/admin/    — Admin dashboard (protected)
├── components/           — Shared UI components
├── hooks/                — React Query data-fetching hooks
├── libs/                 — API client (axios), utilities
└── types/                — TypeScript type definitions
```

---
