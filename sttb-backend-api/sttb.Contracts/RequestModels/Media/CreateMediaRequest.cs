using MediatR;

namespace sttb.Contracts.RequestModels.Media;

public class CreateMediaRequest : IRequest<Guid>
{
    public string Title { get; set; } = string.Empty;
    public string Url { get; set; } = string.Empty;
    public string Type { get; set; } = string.Empty; // "video" | "article" | "image"
    public string? ThumbnailUrl { get; set; }
    public string? Category { get; set; }
    public string? Tag { get; set; }
}
