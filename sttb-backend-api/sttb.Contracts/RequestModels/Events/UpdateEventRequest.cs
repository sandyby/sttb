using MediatR;

namespace sttb.Contracts.RequestModels.Events;

public class UpdateEventRequest : IRequest
{
    public Guid Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public DateTime StartDate { get; set; }
    public DateTime? EndDate { get; set; }
    public string? Location { get; set; }
    public string? ImageUrl { get; set; }
    public Guid? CategoryId { get; set; }
    public string? RegistrationUrl { get; set; }
    public bool IsPublished { get; set; }
}
