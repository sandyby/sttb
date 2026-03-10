using MediatR;

namespace sttb.Contracts.RequestModels.News;

public class DeleteNewsRequest : IRequest
{
    public Guid Id { get; set; }
}
