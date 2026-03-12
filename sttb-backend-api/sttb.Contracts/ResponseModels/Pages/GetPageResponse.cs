namespace sttb.Contracts.ResponseModels.Pages;

public class GetPageResponse
{
    public Guid Id { get; set; }
    public string Slug { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string Section { get; set; } = string.Empty;
    public string? Content { get; set; }
    public bool IsPublished { get; set; }
    public string? MetaDescription { get; set; }
    public string? MetaKeywords { get; set; }
    public DateTime? UpdatedAt { get; set; }
    public string? UpdatedBy { get; set; }
}
