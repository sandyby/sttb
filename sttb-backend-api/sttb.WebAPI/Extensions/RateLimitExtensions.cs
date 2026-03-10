using Microsoft.AspNetCore.RateLimiting;

namespace sttb.WebAPI.Extensions;

public static class RateLimitExtensions
{
    public static IServiceCollection AddSttbRateLimiting(this IServiceCollection services)
    {
        services.AddRateLimiter(options =>
        {
            // Auth endpoints: 5 requests/minute per IP
            options.AddFixedWindowLimiter("auth", opt =>
            {
                opt.PermitLimit = 5;
                opt.Window = TimeSpan.FromMinutes(1);
            });

            // Upload endpoints: 20 requests/minute per user
            options.AddFixedWindowLimiter("upload", opt =>
            {
                opt.PermitLimit = 20;
                opt.Window = TimeSpan.FromMinutes(1);
            });
        });

        return services;
    }
}
