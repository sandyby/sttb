# STTB Backend — Setup Guide

## Prerequisites
- .NET 10 SDK
- PostgreSQL running locally
- `dotnet-ef` tool: `dotnet tool install -g dotnet-ef`

## Local Development Setup

### 1. Set User Secrets (never hardcode)
```bash
cd sttb.WebAPI

dotnet user-secrets init

# SQL Server connection (Windows Auth)
dotnet user-secrets set "ConnectionStrings:DefaultConnection" \
  "Server=localhost;Database=sttb;Trusted_Connection=True;TrustServerCertificate=True;"

# SQL Server connection (SQL Auth)
# dotnet user-secrets set "ConnectionStrings:DefaultConnection" \
#   "Server=localhost;Database=sttb;User Id=sa;Password=yourpassword;TrustServerCertificate=True;"

# JWT secret — minimum 32 characters
dotnet user-secrets set "Jwt:Secret" "your-super-secret-key-min-32-chars-here"
```

### 2. Run Migrations
```bash
dotnet ef migrations add InitialCreate \
  --project ../sttb.Entities \
  --startup-project .

dotnet ef database update \
  --project ../sttb.Entities \
  --startup-project .
```

> Migrations also apply automatically on startup via `db.Database.Migrate()` in Program.cs.

### 3. Seed Admin User (one-time)
After running migrations, create the Admin role and user via a seed script or directly:
```sql
-- Run after first migration to create admin user
-- Use the API or write a quick seed script using UserManager<User>
```

### 4. Start the API
```bash
dotnet watch --project sttb.WebAPI
```

API will be available at:
- http://localhost:5001
- Scalar UI: http://localhost:5001/scalar/v1

## Project Structure
```
sttb-backend.sln
├── sttb.WebAPI/          — Entry point, controllers, middleware
├── sttb.Commons/         — Handlers, validators, services, constants
├── sttb.Contracts/       — DTOs (request/response models)
├── sttb.Entities/        — EF Core models, DbContext, migrations
└── sttb.Infrastructure/  — Argon2, JWT, file storage implementations
```

## API Routes Summary
| Method | Route | Auth | Description |
|--------|-------|------|-------------|
| POST | `/api/auth/login` | Public | Login, returns JWT |
| POST | `/api/auth/refresh` | Public | Rotate refresh token |
| POST | `/api/auth/logout` | Bearer | Revoke refresh token |
| GET | `/api/news/list` | Public | News list + pagination |
| GET | `/api/news/{slug}` | Public | News detail |
| POST | `/api/news/create` | Admin | Create news |
| PUT | `/api/news/update/{id}` | Admin | Update news |
| DELETE | `/api/news/delete/{id}` | Admin | Delete news |
| GET | `/api/events/list` | Public | Events list |
| POST | `/api/events/create` | Admin | Create event |
| PUT | `/api/events/update/{id}` | Admin | Update event |
| DELETE | `/api/events/delete/{id}` | Admin | Delete event |
| GET | `/api/media/list` | Public | Media gallery |
| POST | `/api/media/create` | Admin | Add media item |
| DELETE | `/api/media/delete/{id}` | Admin | Delete media item |
| GET | `/api/pages/{slug}` | Public | Static page content |
| PUT | `/api/pages/update/{slug}` | Admin | Update static page |
| POST | `/api/upload/image` | Admin | Upload image |
| POST | `/api/upload/video` | Admin | Upload video |
