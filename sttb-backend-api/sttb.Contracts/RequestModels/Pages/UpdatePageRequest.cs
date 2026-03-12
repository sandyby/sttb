using MediatR;

namespace sttb.Contracts.RequestModels.Pages;

public class UpdatePageRequest : IRequest
{
    public string Slug { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string Section { get; set; } = string.Empty;
    public string? Content { get; set; }
    public bool IsPublished { get; set; }
    public string? MetaDescription { get; set; }
    public string? MetaKeywords { get; set; }
}
