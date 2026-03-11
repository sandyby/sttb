using MediatR;

namespace sttb.Contracts.RequestModels.News;

public class DeleteNewsCategoryRequest : IRequest
{
    public Guid Id { get; set; }
}
