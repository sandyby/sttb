using Microsoft.Extensions.DependencyInjection;
using sttb.Commons.Services;

namespace sttb.Commons.Extensions;

public static class StorageExtensions
{
    /// <summary>
    /// Registers the file storage service implementation.
    /// Call this in WebAPI after registering sttb.Infrastructure services.
    /// </summary>
    public static IServiceCollection AddFileService<TImplementation>(this IServiceCollection services)
        where TImplementation : class, IFileService
    {
        services.AddScoped<IFileService, TImplementation>();
        return services;
    }
}
