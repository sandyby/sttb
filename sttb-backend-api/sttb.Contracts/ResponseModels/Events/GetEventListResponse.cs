namespace sttb.Contracts.ResponseModels.Events;

public class GetEventListResponse
{
    public List<EventListItem> Items { get; set; } = new();
    public int TotalCount { get; set; }
    public int Page { get; set; }
    public int PageSize { get; set; }
}

public class EventListItem
{
    public Guid Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public DateTime StartDate { get; set; }
    public DateTime? EndDate { get; set; }
    public bool IsOnGoing { get; set; }
    public string? Location { get; set; }
    public string? LocationDetails { get; set; }
    public string? ImageUrl { get; set; }
    public string? Category { get; set; }
    public string? RegistrationUrl { get; set; }
    public bool IsRegistrationOpen { get; set; }
    public DateTime? RegistrationDeadline { get; set; }
    public string? MaxParticipants { get; set; }
    public string Mode { get; set; } = "offline";
    public bool IsOnline { get; set; }
    public string? StreamingUrl { get; set; }
    public string? Organizer { get; set; }
    public string? ContactEmail { get; set; }
    public List<string> Tags { get; set; } = new();
    public bool IsPublished { get; set; }
    public DateTime CreatedAt { get; set; }
}
