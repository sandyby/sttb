using MediatR;

namespace sttb.Contracts.RequestModels.News;

public class UpdateNewsRequest : IRequest
{
    public Guid Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Slug { get; set; } = string.Empty;
    public string Content { get; set; } = string.Empty;
    public string? ThumbnailUrl { get; set; }
    public string? Category { get; set; }
    public bool IsPublished { get; set; }
}
