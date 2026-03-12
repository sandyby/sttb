namespace sttb.Contracts.ResponseModels.Scholarships;

public class ScholarshipListItem
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Level { get; set; } = string.Empty;
    public string Color { get; set; } = string.Empty;
    public string? ImageUrl { get; set; }
    public string Description { get; set; } = string.Empty;
    public List<string> Requirements { get; set; } = new();
    public int DisplayOrder { get; set; }
    public bool IsActive { get; set; }
}

public class GetScholarshipListResponse
{
    public List<ScholarshipListItem> Items { get; set; } = new();
}
