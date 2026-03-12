using MediatR;

namespace sttb.Contracts.RequestModels.Pages;

public class DeletePageRequest : IRequest
{
    public Guid Id { get; set; }
}
