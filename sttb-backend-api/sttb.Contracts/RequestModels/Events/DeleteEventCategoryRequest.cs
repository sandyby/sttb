using MediatR;

namespace sttb.Contracts.RequestModels.Events;

public class DeleteEventCategoryRequest : IRequest
{
    public Guid Id { get; set; }
}
