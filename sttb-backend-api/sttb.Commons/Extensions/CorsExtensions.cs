using Microsoft.Extensions.DependencyInjection;

namespace sttb.Commons.Extensions;

public static class CorsExtensions
{
    public static IServiceCollection AddSttbCors(this IServiceCollection services)
    {
        services.AddCors(options =>
        {
            options.AddPolicy("Frontend", policy => policy
                .WithOrigins(
                    "http://localhost:3000",  // dev
                    "https://sttb.ac.id"      // prod
                )
                .AllowAnyHeader()
                .AllowAnyMethod()
                .AllowCredentials());
        });

        return services;
    }
}
