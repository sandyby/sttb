using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using sttb.Commons.Constants;
using sttb.Commons.Services;

namespace sttb.Infrastructure.FileStorage;

/// <summary>
/// Saves uploaded files to wwwroot/uploads/{type}/{uuid}.{ext}.
/// Validates magic numbers before saving — never trusts Content-Type alone.
/// Generates UUID filenames — never uses original client filenames.
/// </summary>
public class LocalFileStorageService : IFileService
{
    private readonly FileStorageSettings _settings;
    private readonly ILogger<LocalFileStorageService> _logger;

    public LocalFileStorageService(
        IOptions<FileStorageSettings> settings,
        ILogger<LocalFileStorageService> logger)
    {
        _settings = settings.Value;
        _logger = logger;
    }

    public async Task<string> SaveImageAsync(
        Stream fileStream,
        string originalFileName,
        string uploadType,
        CancellationToken cancellationToken)
    {
        var extension = Path.GetExtension(originalFileName).ToLowerInvariant();

        if (!FileConstants.AllowedImageExtensions.Contains(extension))
            throw new InvalidOperationException($"File extension '{extension}' is not allowed.");

        if (!FileConstants.AllowedUploadTypes.Contains(uploadType))
            throw new InvalidOperationException($"Upload type '{uploadType}' is not allowed.");

        await ValidateMagicNumberAsync(fileStream, extension, cancellationToken);

        var fileName = Guid.NewGuid().ToString("N") + extension;
        var relativePath = Path.Combine("uploads", uploadType, fileName);
        var fullPath = Path.Combine(_settings.UploadPath, uploadType, fileName);

        Directory.CreateDirectory(Path.GetDirectoryName(fullPath)!);

        fileStream.Seek(0, SeekOrigin.Begin);
        await using var dest = new FileStream(fullPath, FileMode.Create, FileAccess.Write);
        await fileStream.CopyToAsync(dest, cancellationToken);

        _logger.LogInformation("Image saved to {RelativePath}", relativePath);

        return "/" + relativePath.Replace("\\", "/");
    }

    public async Task<string> SaveVideoAsync(
        Stream fileStream,
        string originalFileName,
        string uploadType,
        CancellationToken cancellationToken)
    {
        var extension = Path.GetExtension(originalFileName).ToLowerInvariant();

        if (!FileConstants.AllowedVideoExtensions.Contains(extension))
            throw new InvalidOperationException($"File extension '{extension}' is not allowed.");

        if (!FileConstants.AllowedUploadTypes.Contains(uploadType))
            throw new InvalidOperationException($"Upload type '{uploadType}' is not allowed.");

        var fileName = Guid.NewGuid().ToString("N") + extension;
        var relativePath = Path.Combine("uploads", uploadType, fileName);
        var fullPath = Path.Combine(_settings.UploadPath, uploadType, fileName);

        Directory.CreateDirectory(Path.GetDirectoryName(fullPath)!);

        fileStream.Seek(0, SeekOrigin.Begin);
        await using var dest = new FileStream(fullPath, FileMode.Create, FileAccess.Write);
        await fileStream.CopyToAsync(dest, cancellationToken);

        _logger.LogInformation("Video saved to {RelativePath}", relativePath);

        return "/" + relativePath.Replace("\\", "/");
    }

    public void Delete(string fileUrl)
    {
        if (string.IsNullOrWhiteSpace(fileUrl))
            return;

        // Convert URL path to filesystem path
        var relativePath = fileUrl.TrimStart('/').Replace("/", Path.DirectorySeparatorChar.ToString());
        var fullPath = Path.Combine(_settings.UploadPath, "..", relativePath);
        var normalizedPath = Path.GetFullPath(fullPath);

        // Safety: ensure the path is within the uploads directory
        var uploadsRoot = Path.GetFullPath(_settings.UploadPath);
        if (!normalizedPath.StartsWith(uploadsRoot, StringComparison.OrdinalIgnoreCase))
        {
            _logger.LogWarning("Attempted path traversal during file delete: {Path}", fileUrl);
            return;
        }

        if (File.Exists(normalizedPath))
        {
            File.Delete(normalizedPath);
            _logger.LogInformation("Deleted file: {Path}", normalizedPath);
        }
    }

    private static async Task ValidateMagicNumberAsync(
        Stream stream,
        string extension,
        CancellationToken cancellationToken)
    {
        if (!FileConstants.ImageSignatures.TryGetValue(extension, out var expectedBytes))
            return; // No signature check available for this extension

        var buffer = new byte[expectedBytes.Length];
        var bytesRead = await stream.ReadAsync(buffer.AsMemory(0, buffer.Length), cancellationToken);

        if (bytesRead < expectedBytes.Length || !buffer.Take(bytesRead).SequenceEqual(expectedBytes))
            throw new InvalidOperationException("File content does not match its extension (invalid magic number).");

        stream.Seek(0, SeekOrigin.Begin);
    }
}
