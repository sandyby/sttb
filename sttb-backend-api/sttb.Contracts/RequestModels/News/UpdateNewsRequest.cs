using MediatR;

namespace sttb.Contracts.RequestModels.News;

public class UpdateNewsRequest : IRequest
{
    public Guid Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Slug { get; set; } = string.Empty;
    public string Content { get; set; } = string.Empty;
    public string? Excerpt { get; set; }
    public string? ThumbnailUrl { get; set; }
    public Guid? CategoryId { get; set; }
    public bool IsFeatured { get; set; }
    public bool IsPublished { get; set; }
}
