using MediatR;

namespace sttb.Contracts.RequestModels.Foundation;

public class DeleteFoundationMemberRequest : IRequest<Unit>
{
    public Guid Id { get; set; }

    public DeleteFoundationMemberRequest(Guid id)
    {
        Id = id;
    }
}
