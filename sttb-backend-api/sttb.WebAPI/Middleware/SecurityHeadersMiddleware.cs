using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;

namespace sttb.WebAPI.Middleware;

public static class SecurityHeadersMiddleware
{
    public static IApplicationBuilder UseSecurityHeaders(this IApplicationBuilder app)
    {
        return app.Use(async (context, next) =>
        {
            context.Response.Headers.Append("X-Content-Type-Options", "nosniff");
            context.Response.Headers.Append("X-Frame-Options", "DENY");
            context.Response.Headers.Append("Referrer-Policy", "origin-when-cross-origin");
            context.Response.Headers.Append(
                "Permissions-Policy",
                "camera=(), microphone=(), geolocation=()");

            // HSTS only over HTTPS in production
            if (!context.Request.IsHttps)
            {
                await next();
                return;
            }

            var env = context.RequestServices
                .GetService(typeof(Microsoft.AspNetCore.Hosting.IWebHostEnvironment))
                as Microsoft.AspNetCore.Hosting.IWebHostEnvironment;

            if (env is not null && !env.EnvironmentName.Equals(
                    "Development", StringComparison.OrdinalIgnoreCase))
            {
                context.Response.Headers.Append(
                    "Strict-Transport-Security",
                    "max-age=31536000; includeSubDomains");
            }

            await next();
        });
    }
}
