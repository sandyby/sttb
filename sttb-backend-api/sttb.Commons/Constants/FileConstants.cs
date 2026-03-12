namespace sttb.Commons.Constants;

public static class FileConstants
{
    public static readonly string[] AllowedImageExtensions = { ".jpg", ".jpeg", ".png", ".webp" };
    public static readonly string[] AllowedVideoExtensions = { ".mp4", ".mov" };

    public const long MaxImageSizeBytes = 10L * 1024 * 1024;   // 10 MB
    public const long MaxVideoSizeBytes = 500L * 1024 * 1024;  // 500 MB

    public static readonly string[] AllowedUploadTypes = { "news", "events", "media", "pages", "lecturers" };

    // Magic number signatures (file headers) — never trust Content-Type alone
    public static readonly Dictionary<string, byte[]> ImageSignatures = new()
    {
        { ".jpg",  new byte[] { 0xFF, 0xD8, 0xFF } },
        { ".jpeg", new byte[] { 0xFF, 0xD8, 0xFF } },
        { ".png",  new byte[] { 0x89, 0x50, 0x4E, 0x47 } },
        { ".webp", new byte[] { 0x52, 0x49, 0x46, 0x46 } }, // RIFF header
    };
}
