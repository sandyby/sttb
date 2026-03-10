using MediatR;

namespace sttb.Contracts.RequestModels.News;

public class CreateNewsRequest : IRequest<Guid>
{
    public string Title { get; set; } = string.Empty;
    public string Slug { get; set; } = string.Empty;
    public string Content { get; set; } = string.Empty;
    public string? ThumbnailUrl { get; set; }
    public string? Category { get; set; }
    public bool IsPublished { get; set; } = false;
}
