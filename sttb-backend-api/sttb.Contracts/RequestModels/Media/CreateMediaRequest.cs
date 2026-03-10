using MediatR;

namespace sttb.Contracts.RequestModels.Media;

public class CreateMediaRequest : IRequest<Guid>
{
    public string Title { get; set; } = string.Empty;
    public string Url { get; set; } = string.Empty;
    public string Type { get; set; } = string.Empty; // "image" or "video"
    public string? ThumbnailUrl { get; set; }
}
