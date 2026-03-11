namespace sttb.Contracts.ResponseModels.Media;

public class GetMediaListResponse
{
    public List<MediaListItem> Items { get; set; } = new();
    public int TotalCount { get; set; }
    public int Page { get; set; }
    public int PageSize { get; set; }
}

public class MediaListItem
{
    public Guid Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Url { get; set; } = string.Empty;
    public string Type { get; set; } = string.Empty;
    public string? ThumbnailUrl { get; set; }
    public string? Category { get; set; }
    public string? Tag { get; set; }
    public DateTime CreatedAt { get; set; }
}
