using MediatR;

namespace sttb.Contracts.RequestModels.Events;

public class DeleteEventRequest : IRequest
{
    public Guid Id { get; set; }
}
