# Backend Development Standard (.NET / C#) – STTB Redesign

> **Scope**: Mandatory rules for the STTB.ac.id redesign backend. All AI agents and developers MUST follow this document without exception. Adapted from base be-standard to align with PRD.md, fe-standard.md, guidelines.md, and security-standard.md.

---

## 1. Architecture & Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Framework** | .NET 10 | Runtime & SDK |
| **Language** | C# | Primary language |
| **Database** | PostgreSQL | Relational data store |
| **ORM** | Entity Framework Core | Code-first data access |
| **Pattern** | Clean Architecture + CQRS | Separation of concerns |
| **Mediator** | MediatR | Decouples controllers from business logic |
| **Auth** | ASP.NET Identity + JWT Bearer | Token-based auth (aligned with Auth.js on FE) |
| **Password Hashing** | Argon2id | Mandatory per security-standard §2.1 |
| **Validation** | FluentValidation | Request model validation |
| **Logging** | Serilog | Structured logging (JSON format) |
| **File Storage** | wwwroot/uploads/ | Local static file storage (local deployment) |
| **API Docs** | Scalar UI | Dev-only API documentation (replaces Swagger) |

---

## 2. Project Structure

A solution MUST follow Clean Architecture with the following projects:

```
sttb-backend.sln
├── sttb.WebAPI/                        # Entry point — HTTP API, thin controllers
│   ├── Controllers/
│   │   ├── AuthController.cs
│   │   ├── NewsController.cs
│   │   ├── EventsController.cs
│   │   ├── MediaController.cs
│   │   ├── PagesController.cs
│   │   └── UploadController.cs
│   ├── Middleware/
│   │   ├── GlobalExceptionHandler.cs   # IExceptionHandler implementation
│   │   └── SecurityHeadersMiddleware.cs
│   ├── AuthorizationPolicies/
│   │   └── AdminOnlyPolicy.cs
│   ├── Program.cs
│   ├── appsettings.json
│   └── appsettings.Development.json
│
├── sttb.Commons/                       # Application Layer — core logic
│   ├── RequestHandlers/                # CQRS handlers grouped by feature
│   │   ├── Auth/
│   │   ├── News/
│   │   ├── Events/
│   │   ├── Media/
│   │   ├── Pages/
│   │   └── Upload/
│   ├── Validators/                     # FluentValidation validators by feature
│   │   ├── Auth/
│   │   ├── News/
│   │   ├── Events/
│   │   ├── Media/
│   │   └── Pages/
│   ├── Services/
│   │   ├── TokenService.cs             # JWT generate/validate/refresh
│   │   └── FileService.cs              # wwwroot upload logic
│   ├── Constants/
│   │   ├── Roles.cs                    # "Admin", "Staff"
│   │   ├── FileConstants.cs            # Max size, allowed extensions
│   │   └── ApiRoutes.cs
│   └── Extensions/
│       ├── AuthExtensions.cs
│       ├── CorsExtensions.cs
│       ├── RateLimitExtensions.cs
│       └── StorageExtensions.cs
│
├── sttb.Contracts/                     # DTOs — zero logic, zero dependencies
│   ├── RequestModels/
│   │   ├── Auth/
│   │   │   ├── LoginRequest.cs
│   │   │   └── RefreshTokenRequest.cs
│   │   ├── News/
│   │   │   ├── CreateNewsRequest.cs
│   │   │   ├── UpdateNewsRequest.cs
│   │   │   └── GetNewsListRequest.cs
│   │   ├── Events/
│   │   ├── Media/
│   │   └── Pages/
│   └── ResponseModels/
│       ├── Auth/
│       │   ├── LoginResponse.cs        # { accessToken, refreshToken, expiresIn, role }
│       │   └── RefreshTokenResponse.cs
│       ├── News/
│       │   ├── GetNewsListResponse.cs
│       │   └── GetNewsDetailResponse.cs
│       ├── Events/
│       ├── Media/
│       └── Pages/
│
├── sttb.Entities/                      # Domain & Data Access Layer
│   ├── ApplicationDbContext.cs
│   ├── Migrations/
│   ├── Models/
│   │   ├── User.cs                     # Admin/staff accounts (extends IdentityUser)
│   │   ├── News.cs
│   │   ├── NewsCategory.cs
│   │   ├── Event.cs
│   │   ├── Media.cs
│   │   ├── Page.cs                     # Static page content (editable via CMS)
│   │   └── RefreshToken.cs             # JWT refresh token storage + rotation
│   └── Interfaces/
│       └── IHaveCreateAndUpdateAudit.cs
│
└── sttb.Infrastructure/                # Cross-cutting infrastructure services
    ├── FileStorage/
    │   └── LocalFileStorageService.cs  # wwwroot implementation
    ├── Security/
    │   ├── Argon2PasswordHasher.cs     # Replaces default ASP.NET Identity hasher
    │   └── JwtTokenService.cs
    └── Email/
        └── ContactEmailService.cs      # Future: /kontak-kami form
```

### Key Rules
- **Feature folders**: Files in `RequestHandlers`, `Validators`, `RequestModels`, `ResponseModels` MUST be grouped by feature.
- **One class per file**: Strictly enforced.
- Only `sttb.WebAPI` is the runnable project. Others are class libraries.
- `sttb.Hangfire` is **excluded** from Phase 1 — no background jobs needed yet.

---

## 3. Design Patterns

### 3.1 CQRS + Mediator
- **Requests** (Commands/Queries): Simple DTOs in `Contracts/RequestModels`. Implement `IRequest<TResponse>`.
- **Handlers**: In `Commons/RequestHandlers`. Implement `IRequestHandler<TRequest, TResponse>`. One handler per request.
- **Controllers** just call `_mediator.Send(request)` — **no business logic**.

### 3.2 Dependency Injection
- Constructor injection **exclusively**.
- Register services in `Commons/Extensions/` or `Program.cs`.
- Use `IOptions<T>` for configuration injection from `appsettings.json`.

### 3.3 Validation
- Every command that accepts user input MUST have a FluentValidation validator.
- Validators may inject `DbContext` or `UserManager` for complex checks (e.g., duplicate email check).
- Naming: `[RequestName]Validator` (e.g., `CreateNewsRequestValidator`).

---

## 4. Naming Conventions

| Element | Convention | Example |
|---|---|---|
| Classes / Interfaces / Methods / Properties | PascalCase | `CreateNewsRequestHandler`, `Title` |
| Parameters / Local Variables | camelCase | `newsRepository`, `newNews` |
| Private Fields | `_camelCase` | `_mediator`, `_tokenService` |
| Request Models | `[Action][Resource]Request` | `CreateNewsRequest`, `GetNewsListRequest` |
| Response Models | `[Action][Resource]Response` | `LoginResponse`, `GetNewsListResponse` |
| Validators | `[RequestName]Validator` | `CreateNewsRequestValidator` |
| Handlers | `[RequestName]Handler` | `CreateNewsRequestHandler` |
| List Queries | `Get[Entity]ListRequest` | NOT `List[Entity]Request` |

### Async
- All I/O-bound operations MUST use `async/await`.
- Controllers and handlers return `async Task<T>`.

---

## 5. Controller Standards

```csharp
[ApiController]
[Route("api/[controller]")]
[Authorize]
public class NewsController : ControllerBase
{
    private readonly IMediator _mediator;

    public NewsController(IMediator mediator)
    {
        _mediator = mediator;
    }

    // Public endpoint — no [Authorize] needed
    [HttpGet("list")]
    [AllowAnonymous]
    public async Task<ActionResult<GetNewsListResponse>> List(
        [FromQuery] GetNewsListRequest request,
        CancellationToken cancellationToken)
    {
        var result = await _mediator.Send(request, cancellationToken);
        return Ok(result);
    }

    // Admin only
    [HttpPost("create")]
    [Authorize(Roles = Roles.Admin)]
    public async Task<ActionResult<Guid>> Create(
        [FromBody] CreateNewsRequest request,
        CancellationToken cancellationToken)
    {
        var result = await _mediator.Send(request, cancellationToken);
        return Ok(result);
    }
}
```

### Rules
- Inherit from `ControllerBase`.
- Use `[FromQuery]` for GET, `[FromBody]` for POST/PUT/PATCH.
- Always accept `CancellationToken`.
- Apply `[Authorize]` at controller level; use `[AllowAnonymous]` for public endpoints.
- Public-facing GET endpoints (news list, events, media) are `[AllowAnonymous]`.
- Admin CMS endpoints require `[Authorize(Roles = Roles.Admin)]`.
- Follow RESTful conventions. Use standard HTTP status codes (200, 201, 400, 401, 403, 404, 500).

---

## 6. Authentication & Authorization

### 6.1 Flow
```
POST /api/auth/login
  → Validate credentials (Argon2id password check)
  → Return { accessToken (15min), refreshToken (7 days), expiresIn, role }

POST /api/auth/refresh
  → Validate refresh token
  → Rotate refresh token (invalidate old, issue new)
  → Return new { accessToken, refreshToken }

POST /api/auth/logout
  → Revoke refresh token from DB
```

### 6.2 JWT Configuration
```csharp
// appsettings.json — values via dotnet user-secrets in dev, env vars in prod
{
  "Jwt": {
    "Secret": "LOADED_FROM_USER_SECRETS",   // NEVER hardcode
    "Issuer": "sttb-api",
    "Audience": "sttb-frontend",
    "AccessTokenExpiryMinutes": 15,
    "RefreshTokenExpiryDays": 7
  }
}
```

### 6.3 Token Security (per security-standard §2.5)
- Pin algorithm to `HS256` or `RS256`. Reject `"none"` algorithm.
- Validate `iss`, `aud`, `exp`, `iat`, `nbf` on every request.
- Rotate refresh tokens on every use.
- Revoke refresh token on logout (delete from DB).
- Store JWT secret in User Secrets (dev) / Environment Variables (prod). **NEVER** hardcode.

### 6.4 Password Hashing (per security-standard §2.1)
```csharp
// sttb.Infrastructure/Security/Argon2PasswordHasher.cs
// Install: dotnet add package Isopoh.Cryptography.Argon2
// NEVER use MD5, SHA-1, plain SHA-256, or default ASP.NET Identity hasher
// Argon2id: minimum 3 iterations, 64MB memory, unique per-user salt
// Constant-time comparison to prevent timing attacks
```

### 6.5 Roles
```csharp
// sttb.Commons/Constants/Roles.cs
public static class Roles
{
    public const string Admin = "Admin";
    public const string Staff = "Staff";
}
```

---

## 7. Entity Standards

```csharp
public class News : IHaveCreateAndUpdateAudit
{
    [Key]
    public Guid Id { get; set; }

    [StringLength(500)]
    public string Title { get; set; } = string.Empty;

    [StringLength(1000)]
    public string Slug { get; set; } = string.Empty;     // URL-friendly, unique

    public string Content { get; set; } = string.Empty;  // Rich text HTML (from TipTap)

    [StringLength(1000)]
    public string? ThumbnailUrl { get; set; }             // Path to wwwroot file

    [StringLength(100)]
    public string? Category { get; set; }

    public bool IsPublished { get; set; } = false;

    public DateTime? PublishedAt { get; set; }

    // Audit fields (from IHaveCreateAndUpdateAudit)
    public string CreatedBy { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; }
    public string? UpdatedBy { get; set; }
    public DateTime? UpdatedAt { get; set; }
}
```

### Rules
- Use `[StringLength]` on ALL string properties.
- Use Data Annotations for schema definition (`[ForeignKey]`, `[InverseProperty]`).
- Initialize navigation collections to `new List<T>()`.
- Always use `Guid` as primary key (non-enumerable, per security-standard §3.2).
- Any entity change requires an EF Core migration.

### Entity List (Phase 1)
| Entity | Purpose |
|---|---|
| `User` | Extends `IdentityUser` — admin/staff accounts |
| `RefreshToken` | JWT refresh token storage + rotation tracking |
| `News` | Berita — title, slug, content (rich text), thumbnail, category, publish status |
| `NewsCategory` | Kategori berita |
| `Event` | Kegiatan — title, description, start/end date, location, image |
| `Media` | Gallery items — image/video URL, title, type (image/video), thumbnail |
| `Page` | Static page content — slug maps to frontend route, editable body |

---

## 8. File Upload Standard (wwwroot)

### 8.1 Flow
```
[Admin uploads image via react-dropzone on FE]
        ↓
POST /api/upload (multipart/form-data)
        ↓
[Validate: magic numbers + extension allow-list + size limit]
        ↓
[Generate UUID filename — NEVER use original filename]
        ↓
[Save to wwwroot/uploads/{type}/{uuid}.{ext}]
        ↓
[Return: { url: "/uploads/news/uuid.webp" }]
        ↓
[FE stores URL in news.thumbnailUrl via CreateNewsRequest]
```

### 8.2 Validation Rules (per security-standard §9)
```csharp
// sttb.Commons/Constants/FileConstants.cs
public static class FileConstants
{
    public static readonly string[] AllowedImageExtensions = { ".jpg", ".jpeg", ".png", ".webp" };
    public static readonly string[] AllowedVideoExtensions = { ".mp4", ".mov" };
    public const long MaxImageSizeBytes = 10 * 1024 * 1024;   // 10MB
    public const long MaxVideoSizeBytes = 500 * 1024 * 1024;  // 500MB

    // Magic number signatures for validation
    public static readonly Dictionary<string, byte[]> ImageSignatures = new()
    {
        { ".jpg",  new byte[] { 0xFF, 0xD8, 0xFF } },
        { ".png",  new byte[] { 0x89, 0x50, 0x4E, 0x47 } },
        { ".webp", new byte[] { 0x52, 0x49, 0x46, 0x46 } },
    };
}
```

- Allow-list extensions only — **NEVER** deny-list.
- Validate magic numbers (file signature), not just `Content-Type` header.
- Generate UUID filename: `Guid.NewGuid().ToString("N") + ext`.
- Store outside web root logic — serve via `app.UseStaticFiles()`.
- Require `[Authorize]` on all upload endpoints.

### 8.3 Folder Structure in wwwroot
```
wwwroot/
└── uploads/
    ├── news/       # News thumbnails
    ├── events/     # Event banners
    ├── media/      # Gallery images + video thumbnails
    └── pages/      # Static page assets
```

---

## 9. Program.cs Reference

```csharp
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Scalar.AspNetCore;
using Serilog;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Serilog
builder.Host.UseSerilog((ctx, config) =>
    config.ReadFrom.Configuration(ctx.Configuration)
          .WriteTo.Console(new Serilog.Formatting.Json.JsonFormatter())
          .WriteTo.File("logs/sttb-.txt", rollingInterval: RollingInterval.Day)
          .Enrich.FromLogContext());

// CORS — aligned with fe-standard (Next.js frontend)
builder.Services.AddCors(options =>
{
    options.AddPolicy("Frontend", policy => policy
        .WithOrigins(
            "http://localhost:3000",   // dev
            "https://sttb.ac.id"       // prod
        )
        .AllowAnyHeader()
        .AllowAnyMethod()
        .AllowCredentials());
});

// Controllers + OpenAPI
builder.Services.AddControllers();
builder.Services.AddOpenApi();

// JWT Bearer Auth
var jwtSecret = builder.Configuration["Jwt:Secret"]
    ?? throw new InvalidOperationException("JWT Secret is not configured.");

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSecret)),
            ClockSkew = TimeSpan.Zero  // No tolerance — strict expiry
        };
    });

builder.Services.AddAuthorization();

// MediatR
builder.Services.AddMediatR(cfg =>
    cfg.RegisterServicesFromAssembly(typeof(Program).Assembly));

// FluentValidation
builder.Services.AddValidatorsFromAssembly(typeof(Program).Assembly);

// Rate Limiting (per security-standard §6.4)
builder.Services.AddRateLimiter(options =>
{
    options.AddFixedWindowLimiter("auth", opt =>
    {
        opt.PermitLimit = 5;
        opt.Window = TimeSpan.FromMinutes(1);
    });
    options.AddFixedWindowLimiter("upload", opt =>
    {
        opt.PermitLimit = 20;
        opt.Window = TimeSpan.FromMinutes(1);
    });
});

// Global Exception Handler
builder.Services.AddExceptionHandler<GlobalExceptionHandler>();
builder.Services.AddProblemDetails();

var app = builder.Build();

// Security Headers Middleware (per security-standard §5.5)
app.Use(async (context, next) =>
{
    context.Response.Headers.Append("X-Content-Type-Options", "nosniff");
    context.Response.Headers.Append("X-Frame-Options", "DENY");
    context.Response.Headers.Append("Referrer-Policy", "origin-when-cross-origin");
    context.Response.Headers.Append("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
    if (!app.Environment.IsDevelopment())
    {
        context.Response.Headers.Append(
            "Strict-Transport-Security", "max-age=31536000; includeSubDomains");
    }
    await next();
});

app.UseCors("Frontend");
app.UseStaticFiles();          // Serve wwwroot/uploads/
app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();
app.UseRateLimiter();
app.UseExceptionHandler();

// Scalar UI — development only
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapScalarApiReference(options =>
    {
        options.Title = "STTB API";
        options.Theme = ScalarTheme.Purple;
    });
}

app.MapControllers();
app.Run();
```

---

## 10. Database Management

### Strategy
- **Code-first** with Entity Framework Core + PostgreSQL.
- Automatic migration on startup (via `HostedService`).
- Connection string loaded from User Secrets (dev) / Environment Variables (prod). **NEVER** hardcode.

### Creating a Migration
```bash
dotnet ef migrations add <DescriptiveName> \
  --project sttb.Entities \
  --startup-project sttb.WebAPI
```

### Applying Migrations
- **Auto**: Run the application — hosted service applies pending migrations.
- **Manual**: `dotnet ef database update --project sttb.Entities --startup-project sttb.WebAPI`

### appsettings.json Structure
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "LOADED_FROM_USER_SECRETS"
  },
  "Jwt": {
    "Secret": "LOADED_FROM_USER_SECRETS",
    "Issuer": "sttb-api",
    "Audience": "sttb-frontend",
    "AccessTokenExpiryMinutes": 15,
    "RefreshTokenExpiryDays": 7
  },
  "FileStorage": {
    "UploadPath": "wwwroot/uploads",
    "MaxImageSizeMB": 10,
    "MaxVideoSizeMB": 500
  },
  "Serilog": {
    "MinimumLevel": "Information"
  }
}
```

---

## 11. Configuration Management

- Centralize in `appsettings.json`.
- Environment overrides in `appsettings.{Environment}.json`.
- Secrets: `dotnet user-secrets` for local dev; Environment Variables for production.
- **NEVER** hardcode connection strings, JWT secrets, API keys, or credentials.
- Access config via `IOptions<T>` pattern.

```bash
# Local dev setup
dotnet user-secrets set "ConnectionStrings:DefaultConnection" "Host=localhost;Database=sttb;..."
dotnet user-secrets set "Jwt:Secret" "your-super-secret-key-min-32-chars"
```

---

## 12. Error Handling

### Global Exception Handler
```csharp
// sttb.WebAPI/Middleware/GlobalExceptionHandler.cs
public class GlobalExceptionHandler : IExceptionHandler
{
    private readonly ILogger<GlobalExceptionHandler> _logger;

    public GlobalExceptionHandler(ILogger<GlobalExceptionHandler> logger)
    {
        _logger = logger;
    }

    public async ValueTask<bool> TryHandleAsync(
        HttpContext context, Exception exception, CancellationToken ct)
    {
        _logger.LogError(exception, "Unhandled exception: {Message}", exception.Message);

        var statusCode = exception switch
        {
            NotFoundException => StatusCodes.Status404NotFound,
            UnauthorizedAccessException => StatusCodes.Status401Unauthorized,
            ValidationException => StatusCodes.Status400BadRequest,
            _ => StatusCodes.Status500InternalServerError
        };

        var problemDetails = new ProblemDetails
        {
            Status = statusCode,
            Title = statusCode == 500 ? "An unexpected error occurred" : exception.Message,
            // NEVER expose stack trace, inner exception, or sensitive details
        };

        context.Response.StatusCode = statusCode;
        await context.Response.WriteAsJsonAsync(problemDetails, ct);
        return true;
    }
}
```

### Rules
- Do NOT swallow exceptions.
- Return `ProblemDetails` for all error responses (ASP.NET standard).
- **NEVER** expose stack traces, inner exceptions, or DB error details in responses.
- Use standard HTTP status codes consistently.
- Generic error message for auth: `"Invalid username or password"` — prevent user enumeration (security-standard §2.2).

---

## 13. Logging (Serilog)

```csharp
// Correct — parameterized, safe
_logger.LogInformation("News article {NewsId} created by {UserId}", newsId, userId);
_logger.LogWarning("Failed login attempt for email {Email} from IP {IpAddress}", email, ipAddress);
_logger.LogError(exception, "Upload failed for file {FileName}", fileName);
```

### Rules (per security-standard §10)
- Structured logs only — JSON format via Serilog.
- Include: correlation IDs, user IDs (non-PII), source IP, timestamps (UTC).
- **NEVER** log: passwords, tokens, refresh tokens, PII, full file paths with sensitive names.
- Sanitize inputs — strip CR/LF to prevent log injection.
- Log all auth events: login success/failure, token refresh, logout.
- Log all admin CMS actions: create/update/delete news, events, media, pages.

---

## 14. Security Requirements (from security-standard.md)

### Input Validation
- All user input validated via FluentValidation before handler execution.
- Allow-list validation — reject unknown fields via DTOs.
- Parameterized queries only — EF Core handles this; **NEVER** raw SQL string concatenation.
- Reject requests with missing or mismatched `Content-Type`.

### IDOR Prevention (§3.2)
- Use `Guid` as all primary keys — non-enumerable.
- Scope queries to authenticated user where applicable.
- Admin endpoints verify role, not just authentication.

### Mass Assignment Prevention (§3.3)
- **NEVER** bind request bodies directly to Entity classes.
- Always use explicit DTOs in `Contracts/RequestModels`.

### File Upload Security (§9)
- Allow-list extensions: `.jpg`, `.jpeg`, `.png`, `.webp`, `.mp4`, `.mov`.
- Validate magic numbers — never trust `Content-Type` alone.
- UUID filenames — never use original filenames from client.
- `[Authorize]` required on all upload endpoints.

### Rate Limiting (§6.4)
- Auth endpoints: 5 requests/minute per IP.
- Upload endpoints: 20 requests/minute per user.

---

## 15. API Routes Reference

| Method | Route | Auth | Description |
|---|---|---|---|
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
| GET | `/api/media/list` | Public | Media gallery list |
| POST | `/api/media/create` | Admin | Add media item |
| DELETE | `/api/media/delete/{id}` | Admin | Delete media item |
| GET | `/api/pages/{slug}` | Public | Get static page content |
| PUT | `/api/pages/update/{slug}` | Admin | Update static page |
| POST | `/api/upload/image` | Admin | Upload image → wwwroot |
| POST | `/api/upload/video` | Admin | Upload video → wwwroot |

---

## 16. Mandatory Rules for AI Agents

> All AI agents contributing to this codebase MUST follow these rules without exception.

### 16.1 No Hardcoding
- Never hardcode string literals, magic numbers, or configuration values.
- Constants → `sttb.Commons/Constants/`.
- Configuration → `appsettings.json` + `IOptions<T>`.
- Secrets → `dotnet user-secrets` (dev), Environment Variables (prod).

### 16.2 Use Existing Patterns
- Follow Clean Architecture + CQRS/MediatR. Do not invent new patterns.
- Business logic → `RequestHandlers`.
- Validation → `Validators` (FluentValidation).
- DTOs → `Contracts` (NOT in `Commons`, `WebAPI`, or `Entities`).
- Always create a FluentValidation validator for every new command.

### 16.3 Respect Project Structure
- Place files in correct feature folders.
- If a feature folder doesn't exist, create one.
- Do NOT dump files in root directories.
- One class per file — strictly enforced.

### 16.4 Auth & Security
- Always use `[Authorize]` on admin endpoints.
- Always use `[AllowAnonymous]` explicitly on public endpoints.
- Never expose sensitive data in error responses.
- Never log tokens, passwords, or PII.
- Always validate file magic numbers on upload, not just extension.
- Always use UUID filenames for uploaded files.

### 16.5 Never Execute Code
- Never run `dotnet build`, `dotnet run`, `dotnet ef`, or execute the application.
- Only write code; the owner runs it on the appropriate server.

---

## 17. Docker & Deployment

### Dockerfile Best Practices (per security-standard §11.2)
- Multi-stage build: separate build and runtime stages.
- Run as non-root user (`USER app`).
- Use minimal base images (`mcr.microsoft.com/dotnet/aspnet:10.0-alpine`).
- Never expose secrets in image layers.
- Include `HEALTHCHECK`.
- Read-only root filesystem where possible.

### Running the Application
```bash
# Development
dotnet watch --project sttb.WebAPI

# Production
dotnet publish -c Release -o ./publish
dotnet ./publish/sttb.WebAPI.dll
```

---

## 18. Testing Guidelines

- Write unit tests for all `RequestHandlers` and `Validators`.
- Integration tests for API endpoints via `WebApplicationFactory`.
- Test authorization matrix — verify every endpoint requires correct role.
- Use `FluentAssertions` for readable assertions.
- Mock `IFileService`, `ITokenService`, and `IEmailService` in tests.
- Test file upload validation: wrong extension, wrong magic number, oversized file.
