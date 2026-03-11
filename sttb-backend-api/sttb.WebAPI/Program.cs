using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Scalar.AspNetCore;
using Serilog;
using sttb.Commons.Behaviors;
using sttb.Commons.Constants;
using sttb.Commons.Extensions;
using sttb.Commons.RequestHandlers.Auth;
using sttb.Commons.Validators.Auth;
using sttb.Entities;
using sttb.Entities.Models;
using sttb.Infrastructure.FileStorage;
using sttb.Infrastructure.Security;
using sttb.WebAPI.Extensions;
using sttb.WebAPI.Middleware;
using sttb.WebAPI.Seeding;

var builder = WebApplication.CreateBuilder(args);

// ─── Serilog ────────────────────────────────────────────────────────────────
builder.Host.UseSerilog((ctx, config) =>
    config.ReadFrom.Configuration(ctx.Configuration)
          .WriteTo.Console(new Serilog.Formatting.Compact.CompactJsonFormatter())
          .WriteTo.File("logs/sttb-.txt", rollingInterval: RollingInterval.Day)
          .Enrich.FromLogContext());

// ─── CORS ───────────────────────────────────────────────────────────────────
builder.Services.AddSttbCors();

// ─── Controllers + OpenAPI ──────────────────────────────────────────────────
builder.Services.AddControllers();
builder.Services.AddOpenApi();
builder.Services.AddHttpContextAccessor();

// ─── Database ───────────────────────────────────────────────────────────────
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(
        builder.Configuration.GetConnectionString("DefaultConnection"),
        sql => sql.MigrationsAssembly("sttb.Entities")));

// ─── Identity ───────────────────────────────────────────────────────────────
builder.Services.AddIdentityCore<User>(options =>
    {
        options.Password.RequiredLength = 8;
        options.Password.RequireDigit = true;
        options.Password.RequireUppercase = true;
        options.Password.RequireNonAlphanumeric = true;
        options.User.RequireUniqueEmail = true;
    })
    .AddRoles<IdentityRole>()
    .AddEntityFrameworkStores<ApplicationDbContext>()
    .AddDefaultTokenProviders();

// Override default password hasher with Argon2id (security-standard §2.1)
builder.Services.AddScoped<IPasswordHasher<User>, Argon2PasswordHasher>();

// ─── JWT Auth ───────────────────────────────────────────────────────────────
builder.Services.AddSttbJwtAuth(builder.Configuration);

// ─── JWT Settings + Token Service ───────────────────────────────────────────
builder.Services.Configure<JwtSettings>(builder.Configuration.GetSection("Jwt"));
builder.Services.AddScoped<sttb.Commons.Services.ITokenService, JwtTokenService>();

// ─── File Storage ───────────────────────────────────────────────────────────
builder.Services.Configure<FileStorageSettings>(builder.Configuration.GetSection("FileStorage"));
builder.Services.AddScoped<sttb.Commons.Services.IFileService, LocalFileStorageService>();

// ─── MediatR ────────────────────────────────────────────────────────────────
// Register handlers from sttb.Commons assembly
builder.Services.AddMediatR(cfg =>
    cfg.RegisterServicesFromAssemblyContaining<LoginRequestHandler>());

// Validation pipeline behavior — auto-runs validators before every handler
builder.Services.AddTransient(typeof(IPipelineBehavior<,>), typeof(ValidationBehavior<,>));

// ─── FluentValidation ───────────────────────────────────────────────────────
builder.Services.AddValidatorsFromAssemblyContaining<LoginRequestValidator>();

// ─── Rate Limiting ──────────────────────────────────────────────────────────
builder.Services.AddSttbRateLimiting();

// ─── Global Exception Handler ───────────────────────────────────────────────
builder.Services.AddExceptionHandler<GlobalExceptionHandler>();
builder.Services.AddProblemDetails();

// ─── Build ──────────────────────────────────────────────────────────────────
var app = builder.Build();

// ─── Auto-apply EF Migrations on startup ────────────────────────────────────
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
    db.Database.Migrate();
}

// ─── Seed Admin User ─────────────────────────────────────────────────────────
using (var scope = app.Services.CreateScope())
{
    var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>();
    var userManager = scope.ServiceProvider.GetRequiredService<UserManager<User>>();
    var config = scope.ServiceProvider.GetRequiredService<IConfiguration>();

    // Ensure roles exist
    foreach (var role in new[] { Roles.Admin, Roles.Staff })
    {
        if (!await roleManager.RoleExistsAsync(role))
            await roleManager.CreateAsync(new IdentityRole(role));
    }

    // Seed admin user from config (loaded from user-secrets)
    var adminEmail = config["AdminSeed:Email"];
    var adminPassword = config["AdminSeed:Password"];

    if (!string.IsNullOrEmpty(adminEmail) && !string.IsNullOrEmpty(adminPassword)
        && adminEmail != "LOADED_FROM_USER_SECRETS")
    {
        var existing = await userManager.FindByEmailAsync(adminEmail);
        if (existing is null)
        {
            var admin = new User { UserName = adminEmail, Email = adminEmail, EmailConfirmed = true };
            var result = await userManager.CreateAsync(admin, adminPassword);
            if (result.Succeeded)
            {
                await userManager.AddToRoleAsync(admin, Roles.Admin);
                var logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();
                logger.LogInformation("Admin user {Email} seeded successfully.", adminEmail);
            }
            else
            {
                var logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();
                var errors = string.Join("; ", result.Errors.Select(e => e.Description));
                logger.LogError("Failed to seed admin user. Errors: {Errors}", errors);
            }
        }
    }
}

// ─── Seed Content Data ───────────────────────────────────────────────────────
if (app.Environment.IsDevelopment())
{
    using var scope = app.Services.CreateScope();
    var db = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
    var userManager = scope.ServiceProvider.GetRequiredService<UserManager<User>>();
    var config = scope.ServiceProvider.GetRequiredService<IConfiguration>();

    var adminEmail = config["AdminSeed:Email"];
    if (!string.IsNullOrEmpty(adminEmail) && adminEmail != "LOADED_FROM_USER_SECRETS")
    {
        var admin = await userManager.FindByEmailAsync(adminEmail);
        if (admin is not null)
            await DataSeeder.SeedAsync(db, admin.Id);
    }
}

// ─── Security Headers ───────────────────────────────────────────────────────
app.UseSecurityHeaders();

app.UseCors("Frontend");
app.UseStaticFiles();         // Serve wwwroot/uploads/
app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();
app.UseRateLimiter();
app.UseExceptionHandler();

// ─── Scalar UI (dev only) ────────────────────────────────────────────────────
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
