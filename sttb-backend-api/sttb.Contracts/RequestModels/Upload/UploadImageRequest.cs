using MediatR;
using sttb.Contracts.ResponseModels.Upload;

namespace sttb.Contracts.RequestModels.Upload;

public class UploadImageRequest : IRequest<UploadResponse>
{
    public Stream FileStream { get; set; } = Stream.Null;
    public string OriginalFileName { get; set; } = string.Empty;
    public long FileSizeBytes { get; set; }
    public string UploadType { get; set; } = string.Empty; // "news", "events", "media", "pages"
}
