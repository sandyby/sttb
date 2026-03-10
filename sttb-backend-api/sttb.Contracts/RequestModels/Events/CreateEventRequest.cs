using MediatR;

namespace sttb.Contracts.RequestModels.Events;

public class CreateEventRequest : IRequest<Guid>
{
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public DateTime StartDate { get; set; }
    public DateTime? EndDate { get; set; }
    public string? Location { get; set; }
    public string? ImageUrl { get; set; }
    public bool IsPublished { get; set; } = false;
}
