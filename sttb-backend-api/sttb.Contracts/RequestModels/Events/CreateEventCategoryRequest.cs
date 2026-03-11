using MediatR;

namespace sttb.Contracts.RequestModels.Events;

public class CreateEventCategoryRequest : IRequest<Guid>
{
    public string Name { get; set; } = string.Empty;
    public string Slug { get; set; } = string.Empty;
}
