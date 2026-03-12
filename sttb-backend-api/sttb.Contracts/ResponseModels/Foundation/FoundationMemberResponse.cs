namespace sttb.Contracts.ResponseModels.Foundation;

public class FoundationMemberResponse
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Position { get; set; } = string.Empty;
    public string Category { get; set; } = string.Empty;
    public string? Description { get; set; }
    public string? ImageUrl { get; set; }
    public int DisplayOrder { get; set; }
    public bool IsActive { get; set; }
}

public class GetFoundationMemberListResponse
{
    public List<FoundationMemberResponse> Members { get; set; } = new();
}
